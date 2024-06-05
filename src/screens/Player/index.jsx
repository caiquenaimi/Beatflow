import { View, Text, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import fetchApiMusics from "../../data/Musics/Music";
import styles from "./styles";
import Title from "../../components/Title";
import MusicCard from "../../components/Musics/MusicCard";

export default function Player() {
  const [music, setMusic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await fetchApiMusics();
        const music = dados.musics.find(music => music.id === 1);
        setMusic(music);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Title title="Player" />
        <Text style={styles.text}>Player</Text>
        <Text style={styles.text}>Music:</Text>
        {music ? (
          <View style={styles.cardContainer}>
            <MusicCard
              key={music.id}
              songname={music.name}
              image={music.image}
              artist={music.artist}
            />
          </View>
        ) : (
          <Text style={styles.text}>Music not found</Text>
        )}
      </View>
    </ScrollView>
  );
}
