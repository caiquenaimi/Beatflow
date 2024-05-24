import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import fetchApi from "../../data/Users/User";
import styles from "./styles";
import Title from "../../components/Title";

export default function Users() {
  const [apiData, setApiData] = useState([]);

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

  return (
    <View style={styles.container}>
      <Title title={"Users"} />
      {apiData.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.text}>ID: {item.id}</Text>
          <Text style={styles.text}>Name: {item.name}</Text>
          <Text style={styles.text}>Email: {item.email}</Text>
          <Text style={styles.text}> Password: {item.password}</Text>
        </View>
  ))
}
    </View >
  );
}
