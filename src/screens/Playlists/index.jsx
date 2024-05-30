import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Title from "../../components/Title";
import { fetchApiPlaylistById } from "../../data/Playlists/Playlist";
import MusicCard from "../../components/Musics/MusicCard";

export default function Playlists() {
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { musics } = await fetchApiPlaylistById(1); // Destructuring the response
        console.log(musics);
        setPlaylistData(musics); // Setting playlistData to musics directly
      } catch (error) {
        console.error("Erro ao buscar dados da playlist: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title title={"Músicas da Playlist"} />
        {playlistData.map((music) => (
          <MusicCard
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
