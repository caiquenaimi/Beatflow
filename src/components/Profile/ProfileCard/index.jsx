import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";

const ProfileCard = ({ username, userimg }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileCardImg}>
        <Image style={styles.profileImg} source={userimg} />
      </View>
      <Text style={styles.userText}>{username}</Text>
    </View>
  );
};

export default ProfileCard;
