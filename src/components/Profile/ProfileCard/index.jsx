import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const ProfileCard = ({ username }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.profileCardImg}>
          <Image
            source={require("../../../../assets/avataaars.png")}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.userText}>{username}</Text>
      </View>
    </View>
  );
};

export default ProfileCard;
