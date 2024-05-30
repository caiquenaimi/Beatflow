import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    width: "auto",
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    height: 100,
  },
  cardImage: {
    width: 99,
    height: 99,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTextContainer: {
    width: "100%",
    padding: 10,
  },
  cardText: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 5,
  },
  artistText: {
    fontSize: 16,
    color: "#bbb",
  },
});

export default styles;
