import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";

export default function SignUp({ route }) {
  let { user, edit } = route.params;
  const [isUpdate, setIsUpdate] = useState(edit);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [birthdate, setBirthDate] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 7000);

    return () => clearTimeout(timeout);
  }, [error, success]);

  useEffect(() => {
    if (isUpdate == true) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setBirthDate(user.birthdate);
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
      setName("");
      setEmail("");
      setPassword("");
      setBirthDate("");
    }
  }, [user]);

  const reverseFormatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(year, month - 1, day);
    return date;
  };
  const formatDate = (dateF) => {
    const date = new Date(dateF);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    if (edit == false) {
      setDate(currentDate);
    } else {
      setDate(reverseFormatDate(conquestDate));
    }
    setBirthDate(formatDate(currentDate));
  };

  const showDatepicker = () => {
    setShow(true);
  };

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
    /* if (!password) {
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
    } */
    if (!name) {
      errors.push("Preencha o campo de nome");
    }
    /* if (!birthdate) {
      errors.push("Preencha o campo de data de nascimento");
    } */

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
      {edit == "true" ? (
        <ScrollView style={styles.containerScroll}>
          <Text style={styles.title}>Editar Perfil</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={user.name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={user.email}
              onChangeText={setEmail}
            />
            <View style={styles.flr}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={user.password}
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
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
            {error ? <ErrorMessage msg={error} /> : null}
            {success ? <SuccessMessage msg={success} /> : null}
          </View>
        </ScrollView>
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
            <View style={styles.flr}>
              <TextInput
                style={styles.input}
                placeholder="Password"
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
            {error ? <ErrorMessage msg={error} /> : null}
            {success ? <SuccessMessage msg={success} /> : null}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
