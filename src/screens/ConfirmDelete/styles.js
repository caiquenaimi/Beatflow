import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  text: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginTop: 50,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FF0000",
  },
  deleteText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  exit: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  content: {
    marginTop: 200,
    alignItems: "center",
  },
});

export default styles;
