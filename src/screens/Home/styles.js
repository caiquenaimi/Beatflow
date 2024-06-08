import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  WelcomeView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  WelcomeText: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#888', 
  },
  scrollContainer: {
    paddingBottom: 80,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
    marginTop: 50,
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
    marginTop: 80,
    height: 145
  },
  loader: {
    width: 150,
    height: 10,
    borderRadius: 25,
    backgroundColor: "red",
    alignSelf: "center",
    marginTop: 2,
    marginBottom: 20
  },
});

export default styles;
