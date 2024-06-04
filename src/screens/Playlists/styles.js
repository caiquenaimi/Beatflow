import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  playlistDescription: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  playlistDuration: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: "#1DB954",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  musicListContainer: {
    width: "100%",
  },
  noMusicText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default styles;
