import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Title from "../../components/Title";
import MusicCardSearch from "../../components/Musics/MusicCardSearch";
import {
  fetchApiPlaylists,
  fetchApiPlaylistById,
} from "../../data/Playlists/Playlist";

export default function Playlists() {
  const [playlistData, setPlaylistData] = useState({});
  const [allPlaylists, setAllPlaylists] = useState([]);
  const route = useRoute();
  const { playlistId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistDataResponse = await fetchApiPlaylistById(playlistId);
        const allPlaylistsResponse = await fetchApiPlaylists();
        console.log(playlistDataResponse);
        console.log(allPlaylistsResponse);
        setPlaylistData(playlistDataResponse);
        setAllPlaylists(allPlaylistsResponse.playlists);
      } catch (error) {
        console.error("Erro ao buscar dados da playlist: ", error);
      }
    };
    fetchData();
  }, [playlistId]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Title title={playlistData.name} />
        <Text style={styles.playlistDescription}>
          {playlistData.description}
        </Text>
        <Text style={styles.playlistDuration}>
          Duração: {playlistData.duration}
        </Text>
        <View style={styles.musicListContainer}>
          {playlistData.musics && playlistData.musics.length > 0 ? (
            playlistData.musics.map((music) => (
              <MusicCardSearch
                key={music.id}
                songname={music.name}
                image={music.image}
                artist={music.artist}
              />
            ))
          ) : (
            <Text style={styles.noMusicText}>Nenhuma música encontrada.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
