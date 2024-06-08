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

export default function Library() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [lastFilter, setLastFilter] = useState(null);
  const navigation = useNavigation();

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
    navigation.navigate("PlayerPlaylist");
  };

  const handleAddToQueue = (music) => {
    console.log("Added to queue:", music);
  };

  const sortMusics = (musics, filter) => {
    return musics.sort((a, b) => {
      const aVal = a[filter].toLowerCase();
      const bVal = b[filter].toLowerCase();
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortedMusics = sortMusics(musics, filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossa Biblioteca</Text>

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
          </Picker>
        </View>
        <TouchableOpacity onPress={toggleSortDirection} style={styles.sortButton}>
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
          <MaterialCommunityIcons name="play" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.musicList}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff0000" />
        ) : (
          sortedMusics.map((music, index) => (
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
                <TouchableOpacity
                  onPress={handleAddToQueue.bind(this, music)}
                  style={styles.addToQueueButton}
                >
                  <MaterialCommunityIcons
                    name="playlist-plus"
                    size={24}
                    color="#ff0000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
