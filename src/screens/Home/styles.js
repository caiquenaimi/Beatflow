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
    padding: 10,
  },
  artistTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default styles;
