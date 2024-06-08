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
    marginBottom: 22,
    textAlign: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 150, 
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: 10,
    textAlign: "center",
    border: "none",
  },
  sortButton: {
    width: 150,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 10,
  },
  musicList: {
    marginBottom: 45,
  },
  musicItem: {
    marginBottom: 10,
  },
  playBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  playPlaylistButton: {
    backgroundColor: "#FF0000",
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    width: 50,
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
