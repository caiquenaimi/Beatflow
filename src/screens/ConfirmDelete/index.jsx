import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ConfirmDelete({ route }) {
  let { user } = route.params;
  const navigation = useNavigation();

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/users/${user.id}`
      );
      if (response.status === 204) {
        navigation.navigate("SignUp", { clear: true });
      } else {
        console.log("Unexpected response: ", response);
      }
    } catch (error) {
      console.log(
        "Error: ",
        error.response ? error.response.data : error.message
      );
      alert(
        "Houve um problema ao tentar deletar o usuário. Por favor, tente novamente."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View tyles={styles.exit}>
        <TouchableOpacity onPress={() => navigation.navigate("Users")}>
          <Feather name="corner-down-left" size={32} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>
          Tem certeza que deseja excluir sua conta?
        </Text>
        <Text style={styles.text}>
          Ao excluir sua conta, você perderá todos os seus dados e não poderá
          recuperá-los.
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteUser()}
        >
          <Text style={styles.deleteText}>Excluir conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
