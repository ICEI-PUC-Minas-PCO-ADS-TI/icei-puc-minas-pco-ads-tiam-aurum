import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { ClienteDTO } from "../../interfaces/interfaces";
import { Colors } from "../../styles/constants";
import { ItemProps } from "../Calendario/Calendario";

const CardClient = ({ title, subTitle }: ItemProps) => (
  <View style={styles2.item}>
    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Text style={styles2.title}>{title}</Text>
      <Text style={styles2.title}>Dia</Text>
    </View>
    {subTitle && (
      <Text style={styles2.subTitle}>
        {'\u2022'} {subTitle}
      </Text>
    )}
  </View>
);

export default function ClienteList() {
  const [clientes, setClientes] = useState<ClienteDTO[]>([]);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const carregarClientes = async () => {
    // const data = await getClientes();
    // setClientes(data);
  };

  useEffect(() => {
    if (isFocused) carregarClientes();
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={clientes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardClient
            title={item.nome}
            subTitle={item.numero}
          ></CardClient>
        )}
      />
      <Button title="Novo Cliente" onPress={() => navigation.navigate('Form')} />
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: Colors.fundoCard,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: Colors.fundo,
    fontWeight: "bold",
    fontSize: 15,
  },
  subTitle: {
    color: Colors.fundo,
    fontWeight: "bold",
    fontSize: 15
  }
});