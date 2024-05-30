import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  containerScroll:{
    flexGrow: 1,
    marginBottom: 100
  },
  cadastre:{
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  },
  loginButton:{
    color: '#555555',
  },
  
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 24, 
    marginTop: 20
   },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  input: {
    backgroundColor: '#333333',
    borderRadius: 8,
    color: '#FFFFFF',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF0000',
    width: '100%',
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  errorMessage: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 16,
  },
  successMessage: {
    color: '#00FF00',
    textAlign: 'center',
    marginTop: 16,
  },
});
