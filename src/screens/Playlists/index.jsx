import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Title from "../../components/Title";
import { fetchApiPlaylistById } from "../../data/Playlists/Playlist";
import MusicCardSearch from "../../components/Musics/MusicCardSearch";
import { useRoute } from "@react-navigation/native";

export default function Playlists() {
  const [playlistData, setPlaylistData] = useState([]);
  const route = useRoute();
  const { playlistId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { musics } = await fetchApiPlaylistById(playlistId);
        console.log(musics);
        setPlaylistData(musics);
      } catch (error) {
        console.error("Erro ao buscar dados da playlist: ", error);
      }
    };
    fetchData();
  }, [playlistId]); 

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title title={"Músicas da Playlist"} />
        {playlistData.map((music) => (
          <MusicCardSearch
            key={music.id}
            songname={music.name}
            image={music.image}
            artist={music.artist}
          />
        ))}
      </View>
    </ScrollView>
  );
}
