import { View, Text, Image } from "react-native";
import styles from "./styles";

const ProfileCard = ({ username , userimage}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileCardImg}>
        <Image
          source={userimage}
          style={styles.profileImg}
        />
      </View>

      <Text style={styles.userText}>{username}</Text>
    </View>
  );
};

export default ProfileCard;
