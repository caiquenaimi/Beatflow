import { View, Text } from "react-native";
import styles from "./styles";

const ErrorMessage = ({ msg }) => {
  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorMsgContainer}>
        <Text style={styles.errorMsgText}>{msg}</Text>
      </View>
    </View>
  );
};

export default ErrorMessage;
