import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Title from "../../components/Title";
import fetchApi from "../../data/Musics/Music";
import MusicCard from "../../components/Musics/MusicCard";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await fetchApi();
        console.log(dados);
        setApiData(dados.musics);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {apiData.length > 0 ? (
          apiData.map((item) => (
            <MusicCard
              key={item.id}
              songname={item.name}
              image={item.image}
              artist={item.artist}
            />
          ))
        ) : (
          <Text>Carregando...</Text>
        )}
        <Title title={"Home"} />
      </View>
    </ScrollView>
  );
}
