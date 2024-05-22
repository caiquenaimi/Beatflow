import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import fetchApi from "../../data/Users/User";
import React from "react";
import styles from "./styles";
import Title from "../../components/Title";

export default function Category() {
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
          <Text style={styles.text}>Username: {item.username}</Text>
        </View>
      ))}
    </View>
  );
}
