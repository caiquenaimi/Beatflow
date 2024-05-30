import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20202C",
    marginBottom: 80.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  artistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FFF',
  },
  cardContainer: {
    paddingHorizontal: 5,  
  },
  carouselContent: {
    alignItems: 'center',  
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
});

export default styles;
