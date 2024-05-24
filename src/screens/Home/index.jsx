import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import { useEffect, useState } from "react";
import Title from "../../components/Title";
import fetchApi from "../../data/Users/User";
import ProfileCard from "../../components/Profile/ProfileCard";

export default function Home() {
  /*  const [apiData, setApiData] = useState([]);

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
  }, []); */

  /* isso abaixo so esta aqui pq o back n estava funcionando o jeito certo esta acima  */
  const apiData = [
    { id: 1, name: "Usuario", img: require("../../../assets/user.png") },
  ];

  return (
    <View style={styles.container}>
      {apiData.map((item) => (
        <ProfileCard key={item.id} username={item.name} userimg={item.img} />
      ))}
      <Title title={"Home"} />
    </View>
  );
}
