import { View, Text, ScrollView, Image, Button } from "react-native";
import { useEffect, useState } from "react";
import fetchApiMusics from "../../data/Musics/Music";
import { Audio } from "expo-av";
import styles from "./styles";

export default function Player() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/songs/conexoes.mp3")
    );
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Audio Player</Text>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={isPlaying ? pauseSound : playSound}
        />
        <Button title="Stop" onPress={stopSound} />
      </View>
    </ScrollView>
  );
}
