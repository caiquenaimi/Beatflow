import { View, Text, Image } from "react-native";
import styles from "./styles";

const ProfileCard = ({ username }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.userText}>{username}</Text>
    </View>
  );
};

export default ProfileCard;
