import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    paddingBottom: 80,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#FFF",
  },
  artistTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#FFF",
  },
  playlistDescription: {
    fontSize: 16,
    color: "#FFF",
  },
  cardContainer: {
    paddingHorizontal: 5,
  },
  carouselContent: {
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
  },
  logo: {
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default styles;
