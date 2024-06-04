import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Title from "../../components/Title";
import MusicCardSearch from "../../components/Musics/MusicCardSearch";
import {
  fetchApiPlaylists,
  fetchApiPlaylistById,
} from "../../data/Playlists/Playlist";

export default function PlaylistTest() {
  const [playlistData, setPlaylistData] = useState({});
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [musics, setMusics] = useState([]);
  const route = useRoute();
  const { playlistId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistDataResponse = await fetchApiPlaylistById(playlistId);
        const allPlaylistsResponse = await fetchApiPlaylists();
        setPlaylistData(playlistDataResponse);
        setMusics(playlistDataResponse.musics || []);
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
      id={music.id}
      songname={music.name}
      image={music.image}
      artist={music.artist}
    />
  );

  const handlePlayPlaylist = () => {
    if (playlistData.id) {
      navigation.navigate("PlayerPlaylist", {
        playlistId: playlistData.id,
        playlist: playlistData,
      });
    }
  };

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
          onPress={handlePlayPlaylist}
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
