import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    width: 200,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  cardImage: {
    width: 198,
    height: 198,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTextContainer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  cardText: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFF",
    marginBottom: 5,
  },
  artistText: {
    fontSize: 18,
    color: "#bbb",
  },
});

export default styles;
