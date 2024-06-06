import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import styles from "./styles";
import { fetchApiMusics } from "../../data/Musics/Music";
import { fetchApiPlaylists } from "../../data/Playlists/Playlist";
import MusicCard from "../../components/Musics/MusicCard";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicData = await fetchApiMusics();
        const playlistData = await fetchApiPlaylists();
        console.log(musicData);
        console.log(playlistData);
        setApiData(musicData.musics || []);
        setPlaylistData(playlistData.playlists || []);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };
    fetchData();
  }, []);

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate("PlaylistTest", { playlistId: item.id })
      }
    >
      <Text style={styles.artistTitle}>{item.name}</Text>
      <Text style={styles.playlistDescription}>{item.description}</Text>
      <Text style={styles.playlistDuration}>Duração: {item.duration}</Text>
    </TouchableOpacity>
  );

  const renderMusicItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <MusicCard
        id={item.id}
        songname={item.name}
        image={item.image}
        artist={item.artist}
      />
    </View>
  );

  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <Text style={styles.artistTitle}>Músicas de Travis Scott</Text>
        {apiData.length > 0 ? (
          <Carousel
            data={apiData.filter((item) =>
              item.artist.toLowerCase().includes("travis scott")
            )}
            renderItem={renderMusicItem}
            sliderWidth={width}
            itemWidth={220}
            activeSlideAlignment="center"
            contentContainerCustomStyle={styles.carouselContent}
          />
        ) : (
          <Text style={styles.loadingText}>
            Carregando músicas de Travis Scott...
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
      </ScrollView>
    </View>
  );
}
