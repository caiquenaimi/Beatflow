import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import { SearchBar } from "react-native-elements";
import { useState, useEffect } from "react";

export default function Search() {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
        />
      </View>
    </View>
  );
}
