import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("SignUp");
  }, []);

  const validation = () => {
    let errors = [];
    if (!email) {
      errors.push("Preencha o campo de email");
    } else if (!email.includes("@")) {
      errors.push("Email inválido");
    }
    if (!password) {
      errors.push("Preencha o campo de senha");
    } else if (password.length < 6) {
      errors.push("A senha deve ter no mínimo 6 caracteres");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("A senha deve conter ao menos um caracter especial");
    } else if (!/\d/.test(password)) {
      errors.push("A senha deve conter ao menos um número");
    } else if (!/[A-Z]/.test(password)) {
      errors.push("A senha deve conter ao menos uma letra maiúscula");
    } else if (!/[a-z]/.test(password)) {
      errors.push("A senha deve conter ao menos uma letra minúscula");
    }
    if (!name) {
      errors.push("Preencha o campo de nome");
    }
    if (!birthdate) {
      errors.push("Preencha o campo de data de nascimento");
    }

    if (errors.length > 0) {
      setError(errors.join("\n"));
      setSuccess("");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    if (!validation()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users", {
        name,
        email,
        password,
        birthdate,
      });
      console.log("response: ", response.data);
      setSuccess("Cadastro realizado com sucesso!");
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      setBirthDate("");
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Erro ao fazer cadastro: ", error);
      setError("Erro ao fazer cadastro. Por favor, tente novamente.");
      setSuccess("");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
        <ScrollView >
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Date"
        value={birthdate}
        onChangeText={setBirthDate}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error ? <ErrorMessage msg={error} /> : null}
      {success ? <SuccessMessage msg={success} /> : null}
    </ScrollView>
    </View>
  );
}
