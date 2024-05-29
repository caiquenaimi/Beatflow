import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    width: 180,
    backgroundColor: "#3A3954",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  cardImage: {
    width: 180,
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTextContainer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  cardText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFF",
    marginBottom: 5,
  },
  artistText: {
    fontSize: 16,
    color: "#bbb",
  },
});

export default styles;
