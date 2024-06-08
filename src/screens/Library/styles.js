import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  musicList: {
    marginBottom: 20,
  },
  musicItem: {
    marginBottom: 10,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  playPlaylistButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  playPlaylistButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardTextContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  cardText: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 5,
  },
  artistText: {
    fontSize: 16,
    color: "#bbb",
  },
  addToQueueButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToQueueButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  musicPlayButton: {
    flex: 1,
    justifyContent: "center",
  },
});

export default styles;
