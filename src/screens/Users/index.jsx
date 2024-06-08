import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Users() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  console.log(user);
  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.containerUser}>
          <View style={styles.userInit}>
            <Image
              source={require("../../../assets/usuariotop.png.png")}
              style={styles.image}
            />
            <Text style={styles.textName}>{user.name}</Text>
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
            <Text style={styles.textInfo}>{user.email}</Text>
          </View>

          <View style={styles.passwordDiv}>
            <Text style={styles.textTitle}>Senha:</Text>
            <View style={styles.textInfoDiv}>
              <Text style={styles.textInfo}>
                {secureTextEntry ? "********" : user.password}
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
            Você não está conectado em uma conta,
          </Text>
          <Text
            style={styles.loadingNavigation}
            onPress={() => navigation.navigate("SignIn")}
          >
            clique aqui para fazer login.
          </Text>
        </View>
      )}
    </View>
  );
}
