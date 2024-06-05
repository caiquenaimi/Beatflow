import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#000000",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#333333",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: "#888888",
    marginBottom: 5,
  },
  album: {
    fontSize: 16,
    color: "#AAAAAA",
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
  },
  controlButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  controlButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  timeContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  time: {
    color: "#FFFFFF",
  }
});

export default styles;
