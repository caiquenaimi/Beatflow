import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import fetchApi from "../../data/Users/User";
import styles from "./styles";
import { useAuth } from "../../context/AuthContext";

export default function Users() {
  const [apiData, setApiData] = useState([]);
  const { user } = useAuth();
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

  let ages = user.age - 1;

  return (
    <View style={styles.container}>
      <View style={styles.containerUser}>
        <View style={styles.userInit}>
          <Image
            source={require("../../../assets/user-removebg-preview.png")}
            style={styles.image}
          />
          <Text style={styles.textName}>{user?.name}</Text>
          <View style={styles.editDiv}>
            <Text style={styles.edit} onPress={() => alert("Edit")}>
              ✏
            </Text>
          </View>
        </View>

        <View style={styles.userSeparetad}>
          <View style={styles.emailDiv}>
            <Text style={styles.textTitle}>Email:</Text>
            <Text style={styles.text}>{user?.email}</Text>
          </View>

          <View style={styles.ageDiv}>
            <Text style={styles.textTitle}>Age:</Text>
            <Text style={styles.text}>{ages}</Text>
          </View>
        </View>

        <View style={styles.playlistDiv}>
          <Text style={styles.textTitle}>Playlist:</Text>
          <Text style={styles.text}>{user?.playlist}</Text>
        </View>
      </View>
    </View>
  );
}
