import { View, Text, Dimensions, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import styles from "./styles";
import fetchApiMusics from "../../data/Musics/Music";
import { fetchApiPlaylists } from "../../data/Playlists/Playlist";
import MusicCard from "../../components/Musics/MusicCard";

export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicData = await fetchApiMusics();
        const playlistData = await fetchApiPlaylists();
        console.log(musicData);
        console.log(playlistData);
        setApiData(musicData.musics);
        setPlaylistData(playlistData.playlists);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };
    fetchData();
  }, []);

  const renderPlaylistItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.artistTitle}>{item.name}</Text>
      <Text style={styles.playlistDescription}>{item.description}</Text>
      <Text style={styles.playlistDuration}>Duração: {item.duration}</Text>
    </View>
  );

  const renderMusicItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <MusicCard
        key={item.id}
        songname={item.name}
        image={item.image}
        artist={item.artist}
      />
    </View>
  );

  const { width } = Dimensions.get("window");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/Beatflowlogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Playlists</Text>
        {playlistData.length > 0 ? (
          <Carousel
            data={playlistData}
            renderItem={renderPlaylistItem}
            sliderWidth={width}
            itemWidth={width - 60}
            activeSlideAlignment="center"
            contentContainerCustomStyle={styles.carouselContent}
          />
        ) : (
          <Text style={styles.loadingText}>Carregando playlists...</Text>
        )}

        <Text style={styles.artistTitle}>Músicas de Kanye West</Text>
        {apiData.length > 0 ? (
          <Carousel
            data={apiData.filter((item) =>
              item.artist.toLowerCase().includes("kanye west")
            )}
            renderItem={renderMusicItem}
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
        {apiData.length > 0 ? (
          <Carousel
            data={apiData.filter((item) =>
              item.artist.toLowerCase().includes("matuê")
            )}
            renderItem={renderMusicItem}
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
