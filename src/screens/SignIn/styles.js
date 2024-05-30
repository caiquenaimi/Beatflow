import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  signUpButton: {
    backgroundColor: '#555555', // Sign up button with a different shade for distinction
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