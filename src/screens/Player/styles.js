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
    padding: 10, 
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
    width: 250,
    height: 250, 
    borderRadius: 10,
    marginBottom: 10, 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5, 
  },
  artist: {
    fontSize: 16, 
    color: "#888888",
    marginBottom: 5, 
  },
  album: {
    fontSize: 14, 
    color: "#AAAAAA",
    marginBottom: 10, 
  },
  controls: {
    flexDirection: "row",
    marginBottom: 10,
  },
  controlButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginHorizontal: 5, 
  },
  controlButtonText: {
    color: "#FFFFFF",
    fontSize: 16, 
    fontWeight: "bold",
  },
  shuffleButton: {
    backgroundColor: "transparent",
  },

  repeatButton: {
    backgroundColor: "transparent",
  },

  forwardButton: {
    backgroundColor: "transparent",
  },

  backwardButton: {
    backgroundColor: "transparent",
  },
  timeContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10, 
  },
  time: {
    color: "#FFFFFF",
  },
  error: {
    fontSize: 14, 
    color: "#FFFFFF",
  },
});

export default styles;
