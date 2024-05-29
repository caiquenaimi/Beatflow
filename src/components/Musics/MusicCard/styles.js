import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20202C",
    marginBottom: 40,
  },
  carousel: {
    flex: 1,
  },
  cardContainer: {
    width: 200,
    backgroundColor: "#3A3954",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTextContainer: {
    width: '100%',
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFF",
    marginBottom: 5,
  },
  artistText: {
    fontSize: 16,
    color: "#bbb",
  },
  artistTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  horizontalScroll: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default styles;
