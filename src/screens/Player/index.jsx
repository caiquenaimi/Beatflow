import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import fetchApiMusicsById from "../../data/Musics/Music";
import Feather from "react-native-vector-icons/Feather";
import { Audio } from "expo-av";
import styles from "./styles";

const audioFiles = {
  "conexoes.mp3": require("../../../assets/songs/conexoes.mp3"),
};

export default function Player() {
  const [apiData, setApiData] = useState(null);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function fetchMusic() {
      try {
        const response = await fetchApiMusicsById(1);
        setApiData(response.music);
      } catch (error) {
        console.error("Error fetching music:", error);
      }
    }

    fetchMusic();
  }, []);

  async function playSound() {
    if (apiData && apiData.file && audioFiles[apiData.file]) {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(audioFiles[apiData.file]);
        setSound(sound);
        await sound.playAsync();
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
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
    }
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {apiData && (
          <>
            <Image source={{ uri: apiData.image }} style={styles.image} />
            <Text style={styles.title}>{apiData.name}</Text>
            <Text style={styles.artist}>{apiData.artist}</Text>
            <Text style={styles.album}>{apiData.album}</Text>
            <View style={styles.controls}>
              <TouchableOpacity onPress={isPlaying ? pauseSound : playSound} style={styles.controlButton}>
                <Feather name={isPlaying ? "pause" : "play"} size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={stopSound} style={styles.controlButton}>
                <Feather name="stop-circle" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
