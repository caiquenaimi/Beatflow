import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    width: 200, // Aumentado de 180 para 200
    backgroundColor: "#3A3954",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  cardImage: {
    width: 200, // Aumentado de 180 para 200
    height: 200, // Aumentado de 180 para 200
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTextContainer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  cardText: {
    fontSize: 20, // Aumentado de 18 para 20
    textAlign: "center",
    color: "#FFF",
    marginBottom: 5,
  },
  artistText: {
    fontSize: 18, // Aumentado de 16 para 18
    color: "#bbb",
  },
});

export default styles;
