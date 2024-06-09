import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { Feather } from "@expo/vector-icons";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import styles from "./styles";

export default function SignIn() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 7000);

    return () => clearTimeout(timeout);
  }, [error, success]);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

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

    if (errors.length > 0) {
      setError(errors.join("\n"));
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validation()) {
      return;
    }

    try {
      setLoading(true);
      const response = await login(email, password);
      console.log("response: ", response);
      if (response) {
        setSuccess("Login realizado com sucesso!");
        setError("");
        navigation.navigate("Inicio");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      setError("Erro ao fazer login. Por favor, tente novamente.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerScroll}>
        <View style={styles.logo}>
          <Image
            source={require("../../../assets/Beatflowlogo.png")}
            style={{ width: 350, height: 250 }}
          />
        </View>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.flr}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
            <Feather
              name={secureTextEntry ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.erros}>
          {error ? <ErrorMessage msg={error} /> : null}
          {success ? <SuccessMessage msg={success} /> : null}
        </View>
        <Text style={styles.cadastre}>
          Não possui uma conta?{" "}
          <Text
            style={styles.loginButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            Faça o cadastro
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
}
