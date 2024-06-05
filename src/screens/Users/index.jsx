import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import fetchApi from "../../data/Users/User";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Users() {
  const [apiData, setApiData] = useState([]);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { user, setUser } = useAuth();

  const navigation = useNavigation();
  // id, name email, password, playlist

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await fetchApi();
        setApiData(dados.users);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  console.log(user);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.container}>
          <View style={styles.containerUser}>
            <View style={styles.userInit}>
              <Image
                source={require("../../../assets/usuariotop.png.png")}
                style={styles.image}
              />
              <Text style={styles.textName}>{user?.name}</Text>
              <View style={styles.editDiv}>
                <Text
                  style={styles.edit}
                  onPress={() =>
                    navigation.navigate("SignUp", { user, edit: "true" })
                  }
                >
                  <Feather name="edit-2" size={32} color="red" />
                </Text>
              </View>
            </View>

            <View style={styles.emailDiv}>
              <Text style={styles.textTitle}>Email:</Text>
              <Text style={styles.textInfo}>{user?.email}</Text>
            </View>
          </View>
          <View style={styles.flr}>
            <Text style={styles.textTitle}>Playlist:</Text>
            <View style={styles.playlistDiv}>
              <Text style={styles.text}>{user?.playlist}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.containerLoading}>
          <Text style={styles.loading}>
            Você não está conectando em uma conta,
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
