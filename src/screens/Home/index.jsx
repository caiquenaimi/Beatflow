import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import styles from "./styles";
import { fetchApiMusics } from "../../data/Musics/Music";
import { fetchApiPlaylists } from "../../data/Playlists/Playlist";
import MusicCard from "../../components/Musics/MusicCard";
import MusicCardSearch from "../../components/Musics/MusicCardSearch";
import RandomMusicCard from "../../components/RandomMusicCard";
import ProfileCard from "../../components/Profile/ProfileCard";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

const getRandomMusic = (apiData) => {
  const randomId = Math.floor(Math.random() * 104) + 1;
  return apiData.find((music) => music.id === randomId) || {};
};

export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [randomMusic, setRandomMusic] = useState({});
  const [randomArtist, setRandomArtist] = useState("");
  const [randomArtistMusicData, setRandomArtistMusicData] = useState([]);
  const [animation] = useState(new Animated.Value(1));
  const navigation = useNavigation();
  const { user } = useAuth();
  const { favorites: favoriteMusics } = useFavorites();

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
    if (apiData.length > 0) {
      setRandomArtist(getRandomArtist(apiData));
    }
  }, [apiData]);

  useEffect(() => {
    const interval = setInterval(handleRandomMusicTime, 7000);
    startAnimation();
    return () => clearInterval(interval);
  }, [randomMusic]);

  useEffect(() => {
    if (randomArtist) {
      setRandomArtistMusicData(
        apiData.filter((item) =>
          item.artist.toLowerCase().includes(randomArtist.toLowerCase())
        )
      );
    }
  }, [randomArtist]);

  const startAnimation = () => {
    animation.setValue(1);
    Animated.timing(animation, {
      toValue: 0,
      duration: 7670,
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

  const renderFavoriteMusicItem = ({ item }) => (
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

  const getRandomArtist = (apiData) => {
    const randomIndex = Math.floor(Math.random() * apiData.length);
    return apiData[randomIndex].artist.split(",")[0];
  };

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
        <View style={styles.WelcomeView}>
          <View style={styles.txtView}>
            <Text style={styles.WelcomeText}>Let the</Text>
            <Text style={styles.beatflowtxt}> Beatflow</Text>
          </View>
          <Text style={styles.subtitle}>O seu aplicativo de Trap/Rap</Text>
           {
            user ? (
              <ProfileCard username={user.name} />
            ) : null
           }
        </View>

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
            <ActivityIndicator size="large" color="#ff0000" />
          )}
        </View>

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

        <Text style={styles.sectionTitle}>Músicas de {randomArtist}</Text>
        {randomArtistMusicData.length > 0 ? (
          <Carousel
            data={randomArtistMusicData}
            renderItem={renderMusicItem}
            sliderWidth={width}
            itemWidth={220}
            activeSlideAlignment="center"
            contentContainerCustomStyle={styles.carouselContent}
          />
        ) : (
          <ActivityIndicator size="large" color="#ff0000" />
        )}

        {user ? (
          <>
            <Text style={styles.sectionTitle}>Músicas favoritas de {user.name}</Text>
            {favoriteMusics.length > 0 ? (
              <Carousel
                data={favoriteMusics}
                renderItem={renderFavoriteMusicItem}
                sliderWidth={width}
                itemWidth={220}
                activeSlideAlignment="center"
                contentContainerCustomStyle={styles.carouselContent}
              />
            ) : (
              <View style={styles.seeMoreDiv}>
                <Text style={styles.loadingText}>
                  Visite nossa biblioteca e adicione músicas aos favoritos.
                </Text>
                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate("Library")}
                >
                  <Text style={styles.seeMoreText}>Biblioteca</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}
