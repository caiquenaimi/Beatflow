import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import fetchApiMusicsById from "../../data/Musics/Music";
import styles from "./styles";

const audioFiles = {
  "conexoes.mp3": require("../../../assets/songs/conexoes.mp3"),
};

export default function Player() {
  const [apiData, setApiData] = useState(null);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

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

  useEffect(() => {
    if (sound) {
      const interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        setPosition(status.positionMillis);
        setDuration(status.durationMillis);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound]);

  async function playSound() {
    if (apiData && apiData.file && audioFiles[apiData.file]) {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(audioFiles[apiData.file]);
        setSound(sound);
        await sound.playAsync();
        setIsPlaying(true);
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
      setPosition(0);
    }
  }

  function onSeek(value) {
    sound.setPositionAsync(value);
    setPosition(value);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {apiData && (
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
