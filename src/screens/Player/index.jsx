import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { fetchApiMusicsById } from "../../data/Musics/Music";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";

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

export default function Player() {
  const route = useRoute();
  const { musicId } = route.params || {};

  const [apiData, setApiData] = useState(null);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shouldResume, setShouldResume] = useState(false);

  useEffect(() => {
    if (!musicId) {
      console.error("Music ID is missing or invalid.");
      return;
    }

    async function fetchMusic() {
      try {
        const response = await fetchApiMusicsById(musicId);
        if (response.music) {
          setApiData(response.music);
        } else {
          console.error("Error fetching music: No music data found");
        }
      } catch (error) {
        console.error("Error fetching music:", error);
      }
    }

    fetchMusic();
  }, [musicId]);

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

  async function playSound() {
    if (apiData && apiData.file && audioFiles[apiData.file]) {
      const newSound = new Audio.Sound();
      try {
        await newSound.loadAsync(audioFiles[apiData.file], {}, shouldResume);
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
        setShouldResume(true);
      } catch (error) {
        console.error("Error loading or playing sound:", error);
      }
    } else {
      console.error("Audio file not found");
    }
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      setShouldResume(false);
    }
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setPosition(0);
      setShouldResume(false);
    }
  }

  async function onSeek(value) {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {apiData ? (
          <>
            <Image source={{ uri: apiData.image }} style={styles.image} />
            <Text style={styles.title}>{apiData.name}</Text>
            <Text style={styles.artist}>{apiData.artist}</Text>
            <Text style={styles.album}>{apiData.album}</Text>
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
            <View style={styles.controls}>
              <TouchableOpacity
                onPress={isPlaying ? pauseSound : playSound}
                style={styles.controlButton}
              >
                <Feather
                  name={isPlaying ? "pause" : "play"}
                  size={24}
                  color="#FFFFFF"
                />
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