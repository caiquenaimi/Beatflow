import { View, Text, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import styles from "./styles";
import Title from "../../components/Title";


export default function Player() {

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Title title="Player" />
        <Text style={styles.text}>Player</Text>
       
      </View>
    </ScrollView>
  );
}
