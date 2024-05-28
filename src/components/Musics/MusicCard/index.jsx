import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const MusicCard = ({ songname, image, artist }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardText}>{songname}</Text>
        <Text style={styles.artistText}>{artist}</Text>
      </View>
    </View>
  );
};

export default MusicCard;
