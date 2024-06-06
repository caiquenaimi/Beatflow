import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
  "7_novinha_pra_2_mlk.mp3": require("../../../assets/songs/7_novinha_pra_2_mlk.mp3"),
  "atras_de_tu.mp3": require("../../../assets/songs/atras_de_tu.mp3"),
  "bandana.mp3": require("../../../assets/songs/bandana.mp3"),
  "barras_e_barras.mp3": require("../../../assets/songs/barras_e_barras.mp3"),
  "bolsa_de_ombro.mp3": require("../../../assets/songs/bolsa_de_ombro.mp3"),
  "bonde_da_fumaca.mp3": require("../../../assets/songs/bonde_da_fumaca.mp3"),
  "chapa_quente.mp3": require("../../../assets/songs/chapa_quente.mp3"),
  "devolve_as_correntes.mp3": require("../../../assets/songs/devolve_as_correntes.mp3"),
  "engana_dizendo_que_ama.mp3": require("../../../assets/songs/engana_dizendo_que_ama.mp3"),
  "essa_e_a_vida_de_um_gangsta.mp3": require("../../../assets/songs/essa_e_a_vida_de_um_gangsta.mp3"),
  "essa_vadia.mp3": require("../../../assets/songs/essa_vadia.mp3"),
  "eu_so_deslizo.mp3": require("../../../assets/songs/eu_so_deslizo.mp3"),
  "foto_do_corte.mp3": require("../../../assets/songs/foto_do_corte.mp3"),
  "hora_errada.mp3": require("../../../assets/songs/hora_errada.mp3"),
  "i_told_u.mp3": require("../../../assets/songs/i_told_u.mp3"),
  "jeito_bandido.mp3": require("../../../assets/songs/jeito_bandido.mp3"),
  "lean_na_fanta.mp3": require("../../../assets/songs/lean_na_fanta.mp3"),
  "londres_freestyle.mp3": require("../../../assets/songs/londres_freestyle.mp3"),
  "mandraka.mp3": require("../../../assets/songs/mandraka.mp3"),
  "meio_pa.mp3": require("../../../assets/songs/meio_pa.mp3"),
  "mlks_de_sp.mp3": require("../../../assets/songs/mlks_de_sp.mp3"),
  "nois_e_nois.mp3": require("../../../assets/songs/nois_e_nois.mp3"),
  "nois_ta_forgano.mp3": require("../../../assets/songs/nois_ta_forgano.mp3"),
  "perola.mp3": require("../../../assets/songs/perola.mp3"),
  "resumo.mp3": require("../../../assets/songs/resumo.mp3"),
  "scooby_doo.mp3": require("../../../assets/songs/scooby_doo.mp3"),
  "vida_chique.mp3": require("../../../assets/songs/vida_chique.mp3"),
  "vivencias_do_trap.mp3": require("../../../assets/songs/vivencias_do_trap.mp3"),
  "modelo.mp3": require("../../../assets/songs/modelo.mp3"),
  "ó.mp3": require("../../../assets/songs/ó.mp3"),
  "TWERK.mp3": require("../../../assets/songs/TWERK.mp3"),
  "Sua_Inveja_Eu_Não_Vejo.mp3": require("../../../assets/songs/Sua_Inveja_Eu_Não_Vejo.mp3"),
  "Mítico_Jovem.mp3": require("../../../assets/songs/Mítico_Jovem.mp3"),
  "FYE!.mp3": require("../../../assets/songs/FYE!.mp3"),
  "hobby.mp3": require("../../../assets/songs/hobby.mp3"),
  "Diagnóstico.mp3": require("../../../assets/songs/Diagnóstico.mp3"),
  "Mantém_o_Pique.mp3": require("../../../assets/songs/Mantém_o_Pique.mp3"),
  "Embalo.mp3": require("../../../assets/songs/Embalo.mp3"),
  "count_me_out.mp3": require("../../../assets/songs/count_me_out.mp3"),
  "savior.mp3": require("../../../assets/songs/savior.mp3"),
  "money_trees.mp3": require("../../../assets/songs/money_trees.mp3"),
  "father_time.mp3": require("../../../assets/songs/father_time.mp3"),
  "rich_spirit.mp3": require("../../../assets/songs/rich_spirit.mp3"),
  "PRIDE.mp3": require("../../../assets/songs/PRIDE.mp3"),
  "HUMBLE.mp3": require("../../../assets/songs/HUMBLE.mp3"),
  "N95.mp3": require("../../../assets/songs/N95.mp3"),
  "ELEMENT.mp3": require("../../../assets/songs/ELEMENT.mp3"),
  "backseat_freestyle.mp3": require("../../../assets/songs/backseat_freestyle.mp3"),
  "swimming_pools.mp3": require("../../../assets/songs/swimming_pools.mp3"),
};

export default function PlayerPlaylist() {
  const [playlist, setPlaylist] = useState([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pausedPosition, setPausedPosition] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); 
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const [nextMusicIndex, setNextMusicIndex] = useState(0);

  useEffect(() => {
    async function loadPlaylist() {
      try {
        const response = await fetchApiMusics();
        setPlaylist(response.musics);
        setShuffledPlaylist(response.musics);
        setNextMusicIndex(0);
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
          handleMusicEnd();
        }
      });
    } catch (error) {
      console.error("Erro ao carregar ou reproduzir a música:", error);
    }
  };
  const handleMusicEnd = () => {
    if (repeatMode === 2) {
      playNext();
    } else if (repeatMode === 1) {
      loadMusic(playlist[currentMusicIndex]); 
    } else {
      playNext(); // Ir para a próxima música
      if (currentMusicIndex === playlist.length - 1) {
        setRepeatMode(0); 
      }
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

  const shuffleArray = (array) => {
    let shuffled = array.slice();
    let currentIndex = shuffled.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }

    return shuffled;
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      const newShuffledPlaylist = shuffleArray(playlist);
      setShuffledPlaylist(newShuffledPlaylist);
      setNextMusicIndex(
        newShuffledPlaylist.findIndex(
          (music) => music === playlist[currentMusicIndex]
        )
      );
    }
  };

  const toggleRepeatMode = () => {
    setRepeatMode((repeatMode + 1) % 3);
  };

  const playNext = () => {
    if (isShuffle) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentMusicIndex);
      setCurrentMusicIndex(nextIndex);
    } else {
      const nextIndex = (currentMusicIndex + 1) % playlist.length;
      if (repeatMode === 1) {
        loadMusic(playlist[currentMusicIndex]);
      } else {
        setCurrentMusicIndex(nextIndex);
      }
    }
  };

  const playPrevious = () => {
    if (currentMusicIndex > 0) {
      setCurrentMusicIndex(currentMusicIndex - 1);
    } else {
      setCurrentMusicIndex(playlist.length - 1);
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
          <Text style={styles.album}>
            {playlist[currentMusicIndex].album}
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
              onPress={toggleShuffle}
              style={[styles.controlButton, styles.shuffleButton]}
            >
              <Feather
                name="shuffle"
                size={24}
                color={isShuffle ? "#FF0000" : "#FFFFFF"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={playPrevious}
              style={[styles.controlButton, styles.backwardButton]}
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
            <TouchableOpacity
              onPress={playNext}
              style={[styles.controlButton, styles.forwardButton]}
            >
              <Feather name="skip-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleRepeatMode}
              style={[styles.controlButton, styles.repeatButton]}
            >
              <MaterialCommunityIcons
                name={
                  repeatMode === 0
                    ? "repeat-off"
                    : repeatMode === 1
                    ? "repeat-once"
                    : "repeat"
                }
                size={24}
                color={
                  repeatMode === 0
                    ? "#FFFFFF"
                    : repeatMode === 1
                    ? "#FF0000"
                    : "#FF0000"
                }
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
