import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#111",
    borderRadius: 20,
    margin: 5,
    alignSelf: "flex-end",
    bottom: 390,
    right: 0,
  },
  cardContainer: {
    flexDirection: "column", 
  },
  profileCardImg: {
    borderRadius: 50,
    padding: 5,
    margin: 5,
  },
  profileImg: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  textContainer: {
    alignItems: "center", 
    paddingVertical: 10,
    backgroundColor: "#222", 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
  },
  userText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
