import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Title from "../../components/Title";
import fetchApi from "../../data/Users/User";
import ProfileCard from "../../components/Profile/ProfileCard";

export default function Home() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await fetchApi();
        console.log(dados); // Verifique a estrutura dos dados aqui
        setApiData(dados.users);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {apiData.length > 0 ? (
        apiData.map((item) => (
          <ProfileCard
            key={item.id}
            username={item.name}
          />
        ))
      ) : (
        <Text>Carregando...</Text>
      )}
      <Title title={"Home"} />
    </View>
  );
}
