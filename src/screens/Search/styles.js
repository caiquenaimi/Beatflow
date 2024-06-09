import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    flexGrow: 1, 
  },
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#000000",
  },
  render: {
    width: "100%",
    padding: 20,
    backgroundColor: "#000000",
    marginBottom: 20,
  },
  message: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  sad: {
    width: 200,
    height: 200,
    alignSelf: "center",
    alignContent: "center",
  },
});

export default styles;
