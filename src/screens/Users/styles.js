import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
  },
  containerUser: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
  },
  userInit: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
    position: "relative",
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
    marginTop: 10,
  },
  editDiv: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  emailDiv: {
    alignItems: "center",
    marginBottom: 20,
  },
  passwordDiv: {
    alignItems: "center",
    marginBottom: 20,
  },
  textTitle: {
    color: "#fff",
    fontSize: 20,
  },
  textInfo: {
    color: "#FF0000",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  textInfoDiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  edit: {
    color: "#FF0000",
    fontSize: 20,
    marginLeft: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  signOutDiv: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  signOut: {
    color: "#FF0000",
    fontSize: 20,
  },
  containerLoading: {
    marginTop: 350,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
  },
  loading: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  noLogedbtn: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  loadingNavigation: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
