import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styles from "./styles";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import { AuthContext } from "../../context/AuthContext";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function SignUp() {
  const { user, updateUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { edit } = route.params || {};
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const clear = route.params?.clear;

  useEffect(() => {
    if (edit) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setConfirmPassword("");

      const unsubscribe = navigation.addListener("focus", () => {
        console.log("Atualizando informações do usuário");
        console.log("Usuário: ", user);
      });

      return () => unsubscribe();
    }
  }, [navigation, edit, user]);

  useEffect(() => {
    if (clear) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [clear]);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const validation = () => {
    let errors = [];
    if (!email) {
      errors.push("Preencha o campo de email");
    } else if (!email.includes("@")) {
      errors.push("Email inválido!");
    }
    if (!name) {
      errors.push("Preencha o campo de nome");
    }
    if (edit && password !== confirmPassword) {
      errors.push("As senhas não coincidem");
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
      });
      console.log("response: ", response.data);
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Erro ao fazer cadastro: ", error);
      setError("Erro ao fazer cadastro. Por favor, tente novamente.");
      setSuccess("");
    }
    setLoading(false);
  };

  const editUser = async () => {
    if (!validation()) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/users/${user.id}`,
        {
          name,
          email,
          password,
        }
      );
      console.log("Response completa da API: ", response);
      const updatedUser = response.data.user;
      console.log("Dados do usuário atualizado: ", updatedUser);

      setError("");
      updateUser(updatedUser);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigation.navigate("Users");
    } catch (error) {
      console.error("Erro ao atualizar cadastro: ", error);
      setError("Erro ao atualizar cadastro. Por favor, tente novamente.");
      setSuccess("");
    }
    setLoading(false);
  };

  console.log("Edit:", edit);

  console.log("User:", user);

  return (
    <ScrollView style={styles.containerScroll}>
      <View style={styles.container}>
        {edit ? (
          <View style={styles.container}>
            <View style={styles.exit}>
              <Text
                style={styles.exit}
                onPress={() => navigation.navigate("Users")}
              >
                <Feather name="corner-down-left" size={32} color="red" />
              </Text>
            </View>

            <ScrollView style={styles.containerScrollEdit}>
              <Text style={styles.title}>Editar Perfil</Text>

              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={styles.flr}>
                  <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureTextEntry}
                  />
                  <TouchableOpacity
                    onPress={toggleSecureEntry}
                    style={styles.eyeIcon}
                  >
                    <Feather
                      name={secureTextEntry ? "eye-off" : "eye"}
                      size={33}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.flr}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirme a Senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={secureTextEntry}
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={editUser}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>
                {error ? <ErrorMessage msg={error} /> : null}
                {success ? <SuccessMessage msg={success} /> : null}
              </View>
              <View style={styles.textLittle}>
                <Text style={styles.TEXT}>ou</Text>
              </View>

              <View style={styles.deleteButton}>
                <TouchableOpacity
                  style={styles.buttonDelete}
                  onPress={() => navigation.navigate("ConfirmDelete", { user })}
                >
                  <Text style={styles.buttonText}>Deletar Perfil</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        ) : (
          <ScrollView style={styles.containerScroll}>
            <View style={styles.head}>
              <View style={styles.logo}>
                <Image
                  source={require("../../../assets/Beatflowlogo.png")}
                  style={{ width: 350, height: 250 }}
                />
              </View>
              <Text style={styles.title}>Bem-vindo a BeatFlow</Text>
              <Text style={styles.subtitle}>
                A melhor plataforma de Trap/Rap
              </Text>
            </View>
            <Text style={styles.title}>Cadastre-se</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <View style={styles.flr}>
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity
                  onPress={toggleSecureEntry}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={secureTextEntry ? "eye-off" : "eye"}
                    size={33}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
              <Text style={styles.cadastre}>
                Já possui uma conta?{" "}
                <Text
                  style={styles.loginButton}
                  onPress={() => navigation.navigate("SignIn")}
                >
                  Faça o Login
                </Text>
              </Text>
              {error ? <ErrorMessage msg={error} /> : null}
              {success ? <SuccessMessage msg={success} /> : null}
            </View>
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
}
