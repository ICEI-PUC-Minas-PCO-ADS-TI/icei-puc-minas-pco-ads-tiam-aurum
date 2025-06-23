import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    const tarefasComDiaMes = tarefas.map(tarefa => {
      const data = new Date(tarefa.dataRealizar);
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // +1 porque janeiro é 0
      return {
        ...tarefa,
        dataRealizar: `${dia}/${mes}` // formato "dd/mm"
      };
    });
    setTarefas(tarefasComDiaMes)

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
            <View style={{ backgroundColor: Colors.fundoCard, width: "83%", borderRadius: 20, flex: 1, height: "100%" }}>
              <Text style={{ fontSize: 20, marginLeft: 10, color: Colors.fundo, fontWeight: "bold", paddingVertical: 10 }}>
                Tarefas
              </Text>
              <FlatList
                data={tarefas}
                renderItem={({ item }) => <Item title={item.dataRealizar} subTitle={item.descricao} />}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => navigation.navigate('CadastroTarefa')}
        >
          <Ionicons name="add" size={28} color="#D4AF37" />
        </TouchableOpacity>
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
    padding: 5,
    height: "35%"
  },
  btnAdd: {
    backgroundColor: '#364B4B',
    padding: 0,
    borderRadius: 50,
    bottom: 20,
    left: 0,
    elevation: 2,
    width: "12%",
    alignItems: "center",
    justifyContent: "center",
    height: "7%"
  },
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
