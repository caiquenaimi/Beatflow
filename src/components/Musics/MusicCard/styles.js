import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 100,
    backgroundColor: "#3A3954",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardText: {
    fontSize: 16,
    textAlign: "left",
    color: "#FFF",
  },
  artistText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default styles;
