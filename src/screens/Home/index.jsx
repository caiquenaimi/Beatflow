import { View, Text, Dimensions, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import styles from "./styles";
import Title from "../../components/Title";
import fetchApi from "../../data/Musics/Music";
import MusicCard from "../../components/Musics/MusicCard";

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

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <MusicCard
        key={item.id}
        songname={item.name}
        image={item.image}
        artist={item.artist}
      />
    </View>
  );

  const kanyeWestSongs = apiData.filter((item) =>
    item.artist.toLowerCase().includes("kanye west")
  );
  const matueSongs = apiData.filter((item) =>
    item.artist.toLowerCase().includes("matuê")
  );

  const { width } = Dimensions.get("window");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/Beatflowlogo.png")}
          style={styles.logo}
        />
        <Text style={styles.artistTitle}>Músicas de Kanye West</Text>
        {kanyeWestSongs.length > 0 ? (
          <Carousel
            data={kanyeWestSongs}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={220}
            activeSlideAlignment="center"
            contentContainerCustomStyle={styles.carouselContent}
          />
        ) : (
          <Text style={styles.loadingText}>
            Carregando músicas de Kanye West...
          </Text>
        )}

        <Text style={styles.artistTitle}>Músicas de Matuê</Text>
        {matueSongs.length > 0 ? (
          <Carousel
            data={matueSongs}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={220}
            activeSlideAlignment="center"
            contentContainerCustomStyle={styles.carouselContent}
          />
        ) : (
          <Text style={styles.loadingText}>Carregando músicas de Matuê...</Text>
        )}
      </View>
    </ScrollView>
  );
}
