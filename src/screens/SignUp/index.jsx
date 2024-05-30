import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
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
    const timeout = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 7000);

    return () => clearTimeout(timeout);
  }, [error, success]);


  const validation = () => {
    let errors = [];
    if (!email) {
      errors.push("Preencha o campo de email!");
    } else if (!email.includes("@")) {
      errors.push("Email inválido!");
    }
    if (!password) {
      errors.push("Preencha o campo de senha!");
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
      errors.push("Preencha o campo de nome!");
    }
    if (!birthdate) {
      errors.push("Preencha o campo de data de nascimento!");
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
        <ScrollView style={styles.containerScroll} >
          <View style={styles.head}>
        <View style={styles.logo}>
        <Image
          source={require("../../../assets/Beatflowlogo.png")}
         style={{width:350, height:250}}
        />
      </View>
      <Text style={styles.title}>Bem-vindo a BeatFlow</Text>
      <Text style={styles.subtitle}>A melhor plataforma de Trap/Rap</Text>
      </View>
      <Text style={styles.title}>Cadastre-se</Text>
      <View style={styles.form}> 
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
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.cadastre}>
        Já possui uma conta? <Text style={styles.loginButton} onPress={() => navigation.navigate("SignIn")}>Faça login</Text>
      </Text>
        </View>
      {error ? <ErrorMessage msg={error} /> : null}
      {success ? <SuccessMessage msg={success} /> : null}
    </ScrollView>
    </View>
  );
}
