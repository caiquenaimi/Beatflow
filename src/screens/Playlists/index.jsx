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
  const [musics, setMusics] = useState([]); // Adicione o estado para armazenar as músicas
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
        setMusics(playlistDataResponse.musics || []); // Defina as músicas do estado
        setAllPlaylists(allPlaylistsResponse.playlists || []);
      } catch (error) {
        console.error("Erro ao buscar dados da playlist: ", error);
      }
    };
    fetchData();
  }, [playlistId]);

  const renderMusicItem = ({ music }) => (
    <MusicCardSearch
      key={music.id}
      songname={music.name}
      image={music.image}
      artist={music.artist}
    />
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Title title={playlistData.name || ""} />
        <Text style={styles.playlistDescription}>
          {playlistData.description || ""}
        </Text>
        <Text style={styles.playlistDuration}>
          Duração: {playlistData.duration || ""}
        </Text>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            if (musics.length > 0) {
              navigation.navigate("PlayerPlaylist", { musicId: musics[0].id });
            }
          }}
        >
          <Text style={styles.playButtonText}>Tocar Playlist</Text>
        </TouchableOpacity>
        <View style={styles.musicListContainer}>
          {musics.length > 0 ? (
            musics.map((music) => renderMusicItem({ music }))
          ) : (
            <Text style={styles.noMusicText}>Nenhuma música encontrada.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
