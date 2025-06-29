import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ClientCard from '../../components/ClientCard';
import { ClienteDTO } from "../../interfaces/interfaces";
import api from '../../services/api';
import store from '../../store';
import { UsuarioState } from '../../store/slices/authSlice';
import { Colors } from "../../styles/constants";
import { ItemProps } from "../Calendario/Calendario";


const CardClient = ({ title, subTitle }: ItemProps) => (
  <View style={styles2.item}>
    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
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

export default function ClienteList({ navigation }: any) {
  const [usuario, setUsuario] = useState<UsuarioState | null>(store.getState().auth.usuario || null);
  const [clientes, setClientes] = useState<ClienteDTO[]>([]);
  const isFocused = useIsFocused();

  const carregarClientes = async () => {
    try {
      const response = await api.get(`/Clientes/usuario/${usuario?.id}`);
      setClientes(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro na requisição:", error.response?.data);
        if (error.response?.status === 400) {
          console.log(error.response.data)
        }
      }
    }
  };

  useEffect(() => {
    if (isFocused) carregarClientes();
  }, [isFocused]);

  const handleDeleteCliente = async (id: number) => {
    try {
      const response = await api.delete(`/Clientes/${id}`);
      if (response.status === 204) {
        alert("Cliente excluído com sucesso");
        carregarClientes();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro ao excluir cliente:", error.response?.data);
        if (error.response?.status === 400) {
          console.log(error.response.data);
        }
      }
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.fundo }}>
      <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "10%" }}>
        <Text style={styles2.textTitlePage}>Clientes</Text>
        <TouchableOpacity
          style={styles2.btnAdd}
          onPress={() => navigation.navigate('ClienteNew')}
        >
          <Ionicons name="add" size={28} color="#D4AF37" />
        </TouchableOpacity>
      </View>
      <View style={styles2.subContainer}>
        <ScrollView>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <ClientCard
                key={cliente.id}
                client={cliente}
                onEdit={() => { console.log("teste") }}
                onDelete={() => { handleDeleteCliente(cliente.id) }}
                onViewDetails={() => { console.log("teste") }}
              />
            ))
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: Colors.textButton }}>Nenhum cliente cadastrado</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  subContainer: {
    height: "90%",
    backgroundColor: Colors.padraoBackGround,
    marginTop: 10,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    padding: 20,
    marginBottom: 50,
  },
  textTitlePage: {
    color: Colors.textButton,
    fontSize: 30,
    width: "50%",
    fontWeight: "bold"
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
  },
  btnAdd: {
    backgroundColor: '#364B4B',
    borderRadius: 50,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    height: "60%"
  },
});