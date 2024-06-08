import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "react-native-vector-icons";
import styles from "./styles";

const FloatingPlayer = ({ isPlaying, onPressPlayPause, onPressOpenPlayer }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressOpenPlayer}>
        <Feather name="music" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressPlayPause}>
        <Feather name={isPlaying ? "pause" : "play"} size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPlayer;