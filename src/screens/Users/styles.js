import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#FF0000",
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#FF0000",
  },
  edit: {
    color: "#FF0000",
    fontSize: 20,
  },
  editDiv: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  userInit: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
  },
  textName: {
    color: "#fff",
    fontSize: 30,
  },
  userSeparetad: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  playlistDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: {
    color: "#fff",
    fontSize: 20,
  },
});

export default styles;
