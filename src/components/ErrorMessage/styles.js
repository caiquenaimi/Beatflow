import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMsgContainer: {
    backgroundColor: "#111", 
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D32F2F",
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  errorMsgText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
