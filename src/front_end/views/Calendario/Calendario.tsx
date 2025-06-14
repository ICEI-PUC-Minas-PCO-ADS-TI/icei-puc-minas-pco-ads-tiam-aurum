import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando os ícones
import { ITarefa } from "../../interfaces/interfaces";
import api from "../../services/api";
import store from "../../store";
import { Colors } from "../../styles/constants";

type ItemProps = { title: string; subTitle?: string };


const Item = ({ title, subTitle }: ItemProps) => (
  <View style={styles2.item}>
    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Text style={styles2.title}>{title}</Text>
      <Text style={styles2.title}>Dia</Text>
    </View>
    {subTitle && (
      <Text style={styles2.subTitle}>
        {/* Bolinha preta antes do subtítulo */}
        {'\u2022'} {subTitle}
      </Text>
    )}
  </View>
);

export const Calendario = ({ navigation }: any) => {
  const [tarefas, setTarefas] = useState<ITarefa[]>([])

  const handleTarefas = async () => {
    const idUsuario = store.getState().auth.usuario?.id;
    try {
      const response = await api.get(`Tarefa/${idUsuario}`)
      formataTarefas(response.data)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro na requisição:", error.response?.data);
        if (error.response?.status === 400) {
          console.log(error.response.data)
        }
      }
    }
  }

  const formataTarefas = (tarefas: ITarefa[]) => {
    console.log(tarefas)
    const tarefasComDia = tarefas.map(tarefa => {
      console.log('dataRealizar:', tarefa.dataRealizar);
      return {
        ...tarefa,
        dataRealizar: tarefa.dataRealizar
          ? new Date(tarefa.dataRealizar).getDate().toString()
          : 'Sem data'
      };
    });
    setTarefas(tarefasComDia)

  }

  useFocusEffect(
    React.useCallback(() => {
      handleTarefas();
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 10 }}>
        <Text style={styles.titleCalendario}>Calendário</Text>
        <Icon name="person" color={Colors.textButton} size={30} onPress={() => navigation.navigate("Perfil")} />

      </View>
      <View style={styles.subContainer}>
        <View style={{ marginTop: 10, alignItems: "center", width: "100%" }}>
          <Calendar
            onDayPress={day => {
              console.log('selected day', day);
            }}
            style={{
              width: 300, shadowRadius: 10, elevation: 20, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5,
            }}
          />
        </View>
        <View style={styles.containerCard}>
          {tarefas.length > 0 && (
            <View style={{ backgroundColor: Colors.fundoCard, width: "80%", borderRadius: 20 }}>
              <Text style={{ fontSize: 20, marginLeft: 10, color: Colors.fundo, fontWeight: "bold" }}>Tarefas</Text>
              <FlatList
                data={tarefas}
                renderItem={({ item }) => <Item title={item.dataRealizar} subTitle={item.descricao} />}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.fundo,
    height: "100%",

  },
  subContainer: {
    marginTop: 20,
    backgroundColor: Colors.padraoBackGround,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    flexDirection: "column"
  },
  titleCalendario: {
    color: Colors.textButton,
    fontSize: 30,
    width: "100%",
    fontWeight: "bold"
  },
  containerCard: {
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    width: "100%",
    padding: 5
  }
})

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
