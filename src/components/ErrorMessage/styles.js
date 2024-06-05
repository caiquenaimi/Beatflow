import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMsgContainer: {
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: 300,
  },
  errorMsgText: {
    color: "#D32F2F",
    fontSize: 16,
  },
});

export default styles;
