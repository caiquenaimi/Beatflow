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
import MusicCardSearch from "../../components/Musics/MusicCardSearch";
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

  const recommendedMusicIds = [32, 30, 28,53,14,60];

  const recommendedMusics = apiData.filter((music) =>
    recommendedMusicIds.includes(music.id)
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../../assets/Beatflowlogo.png")}
          style={styles.logo}
        />

        <Text style={styles.sectionTitle}>Músicas de Travis Scott</Text>
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
        <Text style={styles.sectionTitle}>Músicas recomendadas</Text>
        {recommendedMusics.length > 0 ? (
          <ScrollView>
            <MusicCardSearch
              id={recommendedMusics[0].id}
              songname={recommendedMusics[0].name}
              image={recommendedMusics[0].image}
              artist={recommendedMusics[0].artist}
            />
            <MusicCardSearch
              id={recommendedMusics[1].id}
              songname={recommendedMusics[1].name}
              image={recommendedMusics[1].image}
              artist={recommendedMusics[1].artist}
            />
            <MusicCardSearch
              id={recommendedMusics[2].id}
              songname={recommendedMusics[2].name}
              image={recommendedMusics[2].image}
              artist={recommendedMusics[2].artist}
            />
            <MusicCardSearch
              id={recommendedMusics[3].id}
              songname={recommendedMusics[3].name}
              image={recommendedMusics[3].image}
              artist={recommendedMusics[3].artist}
            />
            <MusicCardSearch
              id={recommendedMusics[4].id}
              songname={recommendedMusics[4].name}
              image={recommendedMusics[4].image}
              artist={recommendedMusics[4].artist}
            />
            <MusicCardSearch
              id={recommendedMusics[5].id}
              songname={recommendedMusics[5].name}
              image={recommendedMusics[5].image}
              artist={recommendedMusics[5].artist}
            />
          </ScrollView>
        ) : (
          <Text style={styles.loadingText}>
            Nenhuma música recomendada encontrada.
          </Text>
        )}

        <Text style={styles.sectionTitle}>Músicas de Matuê</Text>
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
