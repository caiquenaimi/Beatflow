import { View } from "react-native";
import styles from "./styles";
import Title from "../../components/Title";

import { useNavigation } from "@react-navigation/native";

export default function Library() {

  return (
      <View style={styles.container}>
        <Title title="Library" />
      </View>
  );
}
