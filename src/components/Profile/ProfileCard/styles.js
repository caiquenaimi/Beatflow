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
    flexDirection: "column", // Para empilhar os elementos verticalmente
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
    alignItems: "center", // Alinha o texto ao centro
    paddingVertical: 10, // Adiciona espaçamento vertical
    backgroundColor: "#222", // Cor de fundo diferente
    borderBottomLeftRadius: 20, // Adiciona bordas arredondadas
    borderBottomRightRadius: 20, // Adiciona bordas arredondadas
  },
  userText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
