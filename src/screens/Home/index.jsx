import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import styles from "./styles";
import { fetchApiMusics } from "../../data/Musics/Music";
import { fetchApiPlaylists } from "../../data/Playlists/Playlist";
import MusicCard from "../../components/Musics/MusicCard";
import MusicCardSearch from "../../components/Musics/MusicCardSearch";
import RandomMusicCard from "../../components/RandomMusicCard";
import { useNavigation } from "@react-navigation/native";


const getRandomMusic = (apiData) => {
  const randomId = Math.floor(Math.random() * 104) + 1;
  return apiData.find((music) => music.id === randomId) || {};
};

export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [randomMusic, setRandomMusic] = useState({});
  const [animation] = useState(new Animated.Value(1)); 
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
        setRandomMusic(getRandomMusic(musicData.musics || []));
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(handleRandomMusicTime, 7000);
    startAnimation();
    return () => clearInterval(interval); 
  }, [apiData]);

  const startAnimation = () => {
    animation.setValue(1);
    Animated.timing(animation, {
      toValue: 0,
      duration: 7000,
      useNativeDriver: true,
    }).start();
  };

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

  const recommendedMusicIds = [32, 30, 28, 53, 14, 60];

  const recommendedMusics = apiData.filter((music) =>
    recommendedMusicIds.includes(music.id)
  );

  const handleRandomMusicTime = () => {
    setRandomMusic(getRandomMusic(apiData));
    startAnimation(); 
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../../assets/Beatflowlogo.png")}
          style={styles.logo}
        />

        <View style={styles.randomSongCard}>
          {randomMusic.id ? (
            <View>
              <RandomMusicCard
                id={randomMusic.id}
                songname={randomMusic.name}
                image={randomMusic.image}
                artist={randomMusic.artist}
              />
              <Animated.View
                style={[
                  styles.loader,
                  {
                    transform: [{ scale: animation }],
                  },
                ]}
              />
            </View>
          ) : (
            <Text style={styles.loadingText}>Carregando música...</Text>
          )}
        </View>

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
            {recommendedMusics.map((music) => (
              <MusicCardSearch
                key={music.id}
                id={music.id}
                songname={music.name}
                image={music.image}
                artist={music.artist}
              />
            ))}
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
          <Text style={styles.loadingText}>
            Carregando músicas de Matuê...
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
