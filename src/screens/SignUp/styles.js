import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  containerScrollEdit: {
    marginTop: 100,
    marginBottom: 100,
    padding: 20,
    backgroundColor: "#1c1c1c", 
    borderRadius: 10,
  },
  cadastre: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 20,
  },
  loginButton: {
    color: "#555555",
    textDecorationLine: "underline",
  },
  Textdate: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
  },
  logo: {
    alignSelf: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  input: {
    width: "100%",
    backgroundColor: "#333333",
    borderRadius: 8,
    color: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    paddingRight: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 10,
  },
  flr: {
    flexDirection: "row",
    width: "100%",
  },
  button: {
    backgroundColor: "#FF0000",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  errorMessage: {
    color: "#FF0000",
    textAlign: "center",
    marginTop: 16,
  },
  successMessage: {
    color: "#00FF00",
    textAlign: "center",
    marginTop: 16,
  },
  exit: {
    color: "#FFFFFF",
    fontSize: 16,
    position: "absolute",
    top: 20,
    right: 0,
  },
  exitIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  TEXT: {
    color: "#FF0000",
    fontSize: 15,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  buttonDelete: {
    width: "100%",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF0000",
  },
  deleteButton: {
    marginTop: 40,
  },
  textLittle: {
    margin: 20,
  },
});
