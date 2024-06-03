import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#000',
    marginBottom: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#fff',  
  },
  musicItem: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  artist: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    marginTop: 10,
    color: 'blue',
  },
});

export default styles;
