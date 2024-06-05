import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import styles from "../Player/styles";
import { fetchApiMusics } from "../../data/Musics/Music";

const audioFiles = {
  "conexoes.mp3": require("../../../assets/songs/conexoes.mp3"),
  "if_we_being_real.mp3": require("../../../assets/songs/if_we_being_real.mp3"),
  "maquina.mp3": require("../../../assets/songs/maquina.mp3"),
  "777-666.mp3": require("../../../assets/songs/777-666.mp3"),
  "gorilaroxo.mp3": require("../../../assets/songs/gorilaroxo.mp3"),
  "sal.mp3": require("../../../assets/songs/sal.mp3"),
  "lamanocopo.mp3": require("../../../assets/songs/lamanocopo.mp3"),
  "anosluz.mp3": require("../../../assets/songs/anosluz.mp3"),
  "quervoar.mp3": require("../../../assets/songs/quervoar.mp3"),
  "luxuria.mp3": require("../../../assets/songs/luxuria.mp3"),
  "vampiro.mp3": require("../../../assets/songs/vampiro.mp3"),
  "fdsnorio.mp3": require("../../../assets/songs/fdsnorio.mp3"),
  "royalsalute.mp3": require("../../../assets/songs/royalsalute.mp3"),
  "balazul.mp3": require("../../../assets/songs/balazul.mp3"),
  "m4.mp3": require("../../../assets/songs/m4.mp3"),
  "manha.mp3": require("../../../assets/songs/manha.mp3"),
  "paypal.mp3": require("../../../assets/songs/paypal.mp3"),
  "mustang.mp3": require("../../../assets/songs/mustang.mp3"),
  "savana.mp3": require("../../../assets/songs/savana.mp3"),
  "umfilme.mp3": require("../../../assets/songs/umfilme.mp3"),
  "problemas.mp3": require("../../../assets/songs/problemas.mp3"),
  "pick_up_the_phone.mp3": require("../../../assets/songs/pick_up_the_phone.mp3"),
  "goosebumps.mp3": require("../../../assets/songs/goosebumps.mp3"),
  "fein.mp3": require("../../../assets/songs/fein.mp3"),
  "butterfly_effect.mp3": require("../../../assets/songs/butterfly_effect.mp3"),
  "stargazing.mp3": require("../../../assets/songs/stargazing.mp3"),
  "sicko_mode.mp3": require("../../../assets/songs/sicko_mode.mp3"),
  "antidote.mp3": require("../../../assets/songs/antidote.mp3"),
  "nightcrawler.mp3": require("../../../assets/songs/nightcrawler.mp3"),
  "highest_in_the_room.mp3": require("../../../assets/songs/highest_in_the_room.mp3"),
  "out_west.mp3": require("../../../assets/songs/out_west.mp3"),
  "the_scotts.mp3": require("../../../assets/songs/the_scotts.mp3"),
  "trance.mp3": require("../../../assets/songs/trance.mp3"),
  "superhero.mp3": require("../../../assets/songs/superhero.mp3"),
  "too_many_nights.mp3": require("../../../assets/songs/too_many_nights.mp3"),
  "creepin.mp3": require("../../../assets/songs/creepin.mp3"),
  "niagara_falls.mp3": require("../../../assets/songs/niagara_falls.mp3"),
  "type_shit.mp3": require("../../../assets/songs/type_shit.mp3"),
  "like_that.mp3": require("../../../assets/songs/like_that.mp3"),
  "glock_in_my_lap.mp3": require("../../../assets/songs/glock_in_my_lap.mp3"),
  "ghostface_killers.mp3": require("../../../assets/songs/ghostface_killers.mp3"),
  "ric_flair_drip.mp3": require("../../../assets/songs/ric_flair_drip.mp3"),
  "heartless.mp3": require("../../../assets/songs/heartless.mp3"),
  "all_falls_down.mp3": require("../../../assets/songs/all_falls_down.mp3"),
  "bound2.mp3": require("../../../assets/songs/bound2.mp3"),
  "flashing_lights.mp3": require("../../../assets/songs/flashing_lights.mp3"),
  "homecoming.mp3": require("../../../assets/songs/homecoming.mp3"),
  "cant_tell_me_nothing.mp3": require("../../../assets/songs/cant_tell_me_nothing.mp3"),
  "i_wonder.mp3": require("../../../assets/songs/i_wonder.mp3"),
  "all_mine.mp3": require("../../../assets/songs/all_mine.mp3"),
  "father.mp3": require("../../../assets/songs/father.mp3"),
  "famous.mp3": require("../../../assets/songs/famous.mp3"),
  "breathe.mp3": require("../../../assets/songs/breathe.mp3"),
  "if_we_being_real.mp3": require("../../../assets/songs/if_we_being_real.mp3"),
  "poppin.mp3": require("../../../assets/songs/poppin.mp3"),
  "on_tha_line.mp3": require("../../../assets/songs/on_tha_line.mp3"),
  "money_so_big.mp3": require("../../../assets/songs/money_so_big.mp3"),
  "deserve_it.mp3": require("../../../assets/songs/deserve_it.mp3"),
  "get_busy.mp3": require("../../../assets/songs/get_busy.mp3"),
  "out_the_way.mp3": require("../../../assets/songs/out_the_way.mp3"),
  "flawless.mp3": require("../../../assets/songs/flawless.mp3"),
  "sorry_bout_that.mp3": require("../../../assets/songs/sorry_bout_that.mp3"),
};

export default function PlayerPlaylist() {
  const [playlist, setPlaylist] = useState([]); // Lista de reprodução
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0); // Índice da música atual
  const [sound, setSound] = useState(null); // Objeto de áudio
  const [isPlaying, setIsPlaying] = useState(false); // Estado de reprodução
  const [position, setPosition] = useState(0); // Posição atual na faixa
  const [duration, setDuration] = useState(0); // Duração da faixa
  const [pausedPosition, setPausedPosition] = useState(0); // Posição do áudio quando pausado

  useEffect(() => {
    async function loadPlaylist() {
      try {
        const response = await fetchApiMusics();
        setPlaylist(response.musics);
      } catch (error) {
        console.error("Erro ao carregar a lista de músicas:", error);
      }
    }

    loadPlaylist();
  }, []);

  useEffect(() => {
    if (playlist.length > 0) {
      loadMusic(playlist[currentMusicIndex]);
    }
  }, [currentMusicIndex, playlist]);

  useEffect(() => {
    if (sound) {
      const interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound]);

  const loadMusic = async (music) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const newSound = new Audio.Sound();
    try {
      const source = audioFiles[music.file];
      await newSound.loadAsync(source);
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);

      if (pausedPosition > 0) {
        await newSound.setPositionAsync(pausedPosition);
        setPausedPosition(0);
      }

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          if (currentMusicIndex < playlist.length - 1) {
            setCurrentMusicIndex(currentMusicIndex + 1);
          } else {
            setIsPlaying(false);
          }
        }
      });
    } catch (error) {
      console.error("Erro ao carregar ou reproduzir a música:", error);
    }
  };

  const pauseMusic = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setPausedPosition(status.positionMillis);
      }
    }
  };

  const onSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playNext = () => {
    if (currentMusicIndex < playlist.length - 1) {
      setCurrentMusicIndex(currentMusicIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentMusicIndex > 0) {
      setCurrentMusicIndex(currentMusicIndex - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {playlist.length > 0 ? (
          <>
            <Image
              source={{ uri: playlist[currentMusicIndex].image }}
              style={styles.image}
            />
            <Text style={styles.title}>{playlist[currentMusicIndex].name}</Text>
            <Text style={styles.artist}>
              {playlist[currentMusicIndex].artist}
            </Text>
            <Slider
              style={{ width: "90%", marginBottom: 20 }}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onValueChange={onSeek}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#888888"
              thumbTintColor="#FFFFFF"
            />
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{formatTime(position)}</Text>
              <Text style={styles.time}>{formatTime(duration)}</Text>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity
                onPress={playPrevious}
                style={styles.controlButton}
              >
                <Feather name="skip-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  isPlaying
                    ? pauseMusic
                    : () => loadMusic(playlist[currentMusicIndex])
                }
                style={styles.controlButton}
              >
                <Feather
                  name={isPlaying ? "pause" : "play"}
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={playNext} style={styles.controlButton}>
                <Feather name="skip-forward" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.error}>Erro ao carregar os dados da música</Text>
        )}
      </View>
    </ScrollView>
  );
}
