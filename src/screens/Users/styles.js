import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    textAlign: "center",
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
  textInfo: {
    color: "#FF0000",
    fontSize: 24,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    textAlign: "center",
  },
  emailDiv: {
    alignItems: "center",
  },
  containerUser: {
    marginTop: 100,
  },
  loading: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingNavigation: {
    color: "#FF0000",
    fontSize: 20,
    paddingTop: 0,
  },
  containerLoading: {
    marginTop: 350,
    alignItems: "center",
  },
  separatedDivs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  passwordDiv: {
    alignItems: "center",
  },
  textInfoDiv: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerUser: {
    marginTop: 200,
  },
  eyeIcon: {
    bottom: 8,
    right: 8,
  },
});

export default styles;
