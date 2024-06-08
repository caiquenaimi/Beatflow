import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 5,
    margin: 5,
    alignSelf: 'flex-end',
    bottom: 330,
    right: 0,
  },
  profileCardImg: {
    backgroundColor: "#FFF",
    borderRadius: 50,
    padding: 5,
    margin: 5,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
