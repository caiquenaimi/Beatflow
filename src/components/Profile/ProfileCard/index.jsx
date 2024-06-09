import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const ProfileCard = ({ username }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.outerContainer}>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Users", { username })}
        >
        <View style={styles.profileCardImg}>
          <Image
            source={require("../../../../assets/avataaars.png")}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.userText}>{username}</Text>
      </View>
    </View>
  );
};

export default ProfileCard;
