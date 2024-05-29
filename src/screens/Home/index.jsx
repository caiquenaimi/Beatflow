import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Title from "../../components/Title";
import fetchApi from "../../data/Musics/Music";
import MusicCard from "../../components/Musics/MusicCard";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "react-native-carousel-control";

export default function Home() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await fetchApi();
        console.log(dados);
        setApiData(dados.musics);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };
    fetchData();
  }, []);

  const renderItem = (item) => (
    <MusicCard
      key={item.id}
      songname={item.name}
      image={item.image}
      artist={item.artist}
    />
  );

  const kanyeWestSongs = apiData.filter((item) => item.artist === "Kanye West");

  const matueSongs = apiData.filter((item) => item.artist === "Matuê");

  const { width } = Dimensions.get("window");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title title={"Home"} />
        <Text style={styles.sectionTitle}>Músicas</Text>
        <Text style={styles.artistTitle}>Kanye West</Text>
        {kanyeWestSongs.length > 0 ? (
          <Carousel pageWidth={width} sneak={20}>
            {kanyeWestSongs.map((item) => renderItem(item))}
          </Carousel>
        ) : (
          <Text>Carregando músicas de Kanye West...</Text>
        )}

        <Text style={styles.artistTitle}>Matuê</Text>
        {matueSongs.length > 0 ? (
          <Carousel pageWidth={width} sneak={20}>
            {matueSongs.map((item) => renderItem(item))}
          </Carousel>
        ) : (
          <Text>Carregando músicas de Matuê...</Text>
        )}
      </View>
    </ScrollView>
  );
}
