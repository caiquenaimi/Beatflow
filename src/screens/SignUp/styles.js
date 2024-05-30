import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  errorContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightcoral",
    borderRadius: 4,
  },
  errorMsgContainer: {
    padding: 10,
    backgroundColor: "lightcoral",
    borderRadius: 4,
  },
  errorMsgText: {
    color: "red",
  },
  successContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 4,
  },
  successMsgContainer: {
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 4,
  },
  successMsgText: {
    color: "green",
  },
});
