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
import styles from "./styles";
import { fetchApiMusics } from "../../data/Musics/Music";
import { useNavigation } from "@react-navigation/native";

export default function Library() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossa Biblioteca</Text>
      <View style={styles.playBtn}>
        <TouchableOpacity
          onPress={handlePlayPlaylist}
          style={styles.playPlaylistButton}
        >
          <MaterialCommunityIcons name="play" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.musicList}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff0000" />
        ) : (
          musics.map((music, index) => (
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
