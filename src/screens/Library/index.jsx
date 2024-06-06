import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { fetchApiMusics } from "../../data/Musics/Music";
import MusicCardSearch from "../../components/Musics/MusicCardSearch";
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossa Biblioteca</Text>
      <TouchableOpacity onPress={handlePlayPlaylist} style={styles.playPlaylistButton}>
        <Text style={styles.playPlaylistButtonText}>Tocar Playlist</Text>
      </TouchableOpacity>
      <ScrollView style={styles.musicList}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          musics.map((music) => (
            <TouchableOpacity
              key={music.id}
              style={styles.musicItem}
              onPress={() => navigation.navigate("Player", { musicId: music.id })}
            >
              <MusicCardSearch
                id={music.id}
                songname={music.name}
                image={music.image}
                artist={music.artist}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
