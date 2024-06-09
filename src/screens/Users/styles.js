import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
  },
  containerUser: {
    marginTop: 100,
  },
  userInit: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#FF0000",
  },
  textName: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
  editDiv: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  emailDiv: {
    alignItems: "center",
  },
  passwordDiv: {
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
  textInfoDiv: {
    flexDirection: "row",
    alignItems: "center",
  },
  edit: {
    color: "#FF0000",
    fontSize: 20,
  },
  eyeIcon: {
    bottom: 8,
    right: 8,
  },
  signOutDiv: {
    position: "absolute",
  },
  containerLoading: {
    marginTop: 350,
    alignItems: "center",
  },
  loading: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  loadingNavigation: {
    color: "#FF0000",
    fontSize: 20,
  },
});

export default styles;
