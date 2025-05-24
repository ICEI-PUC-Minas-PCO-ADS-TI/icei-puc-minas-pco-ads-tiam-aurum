import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import { StatusPagamento } from "../../enums/StatusPagamento";
import { PagamentoResponse } from "../../interfaces/interfaces";
import api from "../../services/api";
import { UsuarioState } from "../../store/slices/authSlice";
import { Colors } from "../../styles/constants";

export interface FiltroDashboardPagamento {
  mesPagamento: string;
  status: string;
  usuario: UsuarioState;
  periodoPagamentos?: Date;
}


const Dashboard = () => {
  const mesPagamento: Date = new Date();
  const [pagamentoResponse, setPagamentoResponse] = useState<PagamentoResponse>();

  const pagamentosMes = async () => {

    const filtro: FiltroDashboardPagamento = {
      mesPagamento: new Date(mesPagamento.getFullYear(), mesPagamento.getMonth(), 1).toISOString(),
      status: StatusPagamento.PAGO,
      usuario: {
        id: 1
      }
    }
    try {
      const response = await api.post('Pagamento/pagamentosMes', filtro);
      const data = new Date(response.data.mesPagamento)
      const mes: string = data.toLocaleString('pt-BR', { month: 'long' });
      response.data.mesPagamento = mes.charAt(0).toUpperCase() + mes.slice(1)
      console.log(response.data);

      setPagamentoResponse(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro na requisição:", error.response?.data);
        setPagamentoResponse(undefined)
        if (error.response?.status === 400) {
          console.log(error.response.data)
        }
      }
    }
  }
  useEffect(() => {
    pagamentosMes()
  }, []);

  return (

    <View style={styles.container}>
      <Text>Dashboard</Text>
      {pagamentoResponse != undefined && (
        <Card
          title={`Pagamentos de ${pagamentoResponse.mesPagamento}`}
          quantidade={pagamentoResponse.quantidadePagamentos}
          status={pagamentoResponse.status}
          valorTotal={`R$${pagamentoResponse.valorTotal}`}
        ></Card>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.fundo,
    width: '100%',
  },
})



export default Dashboard;