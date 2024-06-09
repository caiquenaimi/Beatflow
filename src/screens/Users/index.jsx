import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { useAuth, AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function Users() {
  const { user } = useAuth();
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.containerUser}>
          <View style={styles.userInit}>
            <Image
              source={require("../../../assets/avataaars.png")}
              style={styles.image}
            />
            <Text style={styles.textName}>{user?.name}</Text>
            <View style={styles.signOutDiv}>
              <TouchableOpacity
                style={styles.signOut}
                onPress={() => {
                  signOut();
                  navigation.navigate("SignIn");
                }}
              >
                <Feather name="log-out" size={24} color="red" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.editDiv}
              onPress={() =>
                navigation.navigate("SignUp", { user, edit: true })
              }
            >
              <Feather name="edit-2" size={24} color="red" />
            </TouchableOpacity>
          </View>

          <View style={styles.emailDiv}>
            <Text style={styles.textTitle}>Email:</Text>
            <Text style={styles.textInfo}>{user?.email}</Text>
          </View>

          <View style={styles.passwordDiv}>
            <Text style={styles.textTitle}>Senha:</Text>
            <View style={styles.textInfoDiv}>
              <Text style={styles.textInfo}>
                {secureTextEntry ? "********" : user?.password}
              </Text>
              <TouchableOpacity style={styles.edit} onPress={toggleSecureEntry}>
                <Feather
                  name={secureTextEntry ? "eye" : "eye-off"}
                  size={16}
                  color="red"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.containerLoading}>
          <Text style={styles.loading}>
            Você não está conectado em uma conta.
          </Text>
          <TouchableOpacity
            style={styles.noLogedbtn}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.loadingNavigation}>
              Clique aqui para fazer login.
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
