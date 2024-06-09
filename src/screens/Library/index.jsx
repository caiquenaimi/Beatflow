import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import { fetchApiMusics } from "../../data/Musics/Music";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";

export default function Library() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [lastFilter, setLastFilter] = useState(null);
  const navigation = useNavigation();
  const { favorites, updateFavorites } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchMusics() {
      setLoading(true);
      try {
        const response = await fetchApiMusics();
        if (response && response.musics) {
          setMusics(response.musics);
        } else {
          console.error("Error fetching musics: No music data found");
        }
      } catch (error) {
        console.error("Error fetching musics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMusics();
  }, []);

  const handlePlayPlaylist = () => {
    const sortedMusics = sortMusics(musics, filter, sortDirection);
    navigation.navigate("PlayerPlaylist", { sortedPlaylist: sortedMusics });
  };

  const sortMusics = (musics, filter, direction) => {
    let sorted;

    if (filter === "favorites") {
      sorted = musics.filter((music) => music.favorite);
    } else {
      sorted = musics.sort((a, b) => {
        const aVal = a[filter];
        const bVal = b[filter];
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    return sorted;
  };

  const toggleSortDirection = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
  };

  const toggleFavorite = async (musicId, currentFavoriteStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/musics/${musicId}/favorite`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorite: !currentFavoriteStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar status favorito");
      }

      const updatedMusics = musics.map((music) =>
        music.id === musicId
          ? { ...music, favorite: !currentFavoriteStatus }
          : music
      );

      setMusics(updatedMusics);

      const updatedFavorites = updatedMusics.filter((music) => music.favorite);
      updateFavorites(updatedFavorites);
    } catch (error) {
      console.error(error.message);
    }
  };

  const sortedMusics = sortMusics(musics, filter, sortDirection);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biblioteca</Text>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={filter}
            onValueChange={(itemValue) => {
              if (itemValue === filter && lastFilter === filter) {
                toggleSortDirection();
              } else {
                setFilter(itemValue);
                setSortDirection("asc");
              }
              setLastFilter(itemValue);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Título" value="name" />
            <Picker.Item label="Artista" value="artist" />
            <Picker.Item label="Álbum" value="album" />
            {favorites.some((music) => music.favorite) && (
              <Picker.Item label="Favoritas" value="favorites" />
            )}
          </Picker>
        </View>
        <TouchableOpacity
          onPress={toggleSortDirection}
          style={styles.sortButton}
        >
          <Text style={{ color: "#fff" }}>
            {sortDirection === "asc" ? "A-Z" : "Z-A"}
          </Text>
          <MaterialCommunityIcons
            name={sortDirection === "asc" ? "chevron-up" : "chevron-down"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.playBtn}>
        <TouchableOpacity
          onPress={handlePlayPlaylist}
          style={styles.playPlaylistButton}
        >
          <Text style={styles.playButtonText}>Tocar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.musicList}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff0000" />
        ) : (
          sortedMusics.map((music) => (
            <View key={music.id} style={styles.musicItem}>
              <View style={styles.cardContainer}>
                <Image source={{ uri: music.image }} style={styles.cardImage} />
                <View style={styles.cardTextContainer}>
                  <TouchableOpacity
                    style={styles.musicPlayButton}
                    onPress={() =>
                      navigation.navigate("Player", { musicId: music.id })
                    }
                  >
                    <Text style={styles.cardText}>{music.name}</Text>
                    <Text style={styles.artistText}>{music.artist}</Text>
                  </TouchableOpacity>
                </View>
                {user ? (
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(music.id, music.favorite)}
                  >
                    <MaterialCommunityIcons
                      name={music.favorite ? "heart" : "heart-outline"}
                      size={24}
                      color={music.favorite ? "#ff0000" : "#fff"}
                    />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
