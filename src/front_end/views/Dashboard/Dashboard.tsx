import axios from "axios";
import { useEffect, useState } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import GraficoGastos from "../../components/Grafico";
import { StatusPagamento } from "../../enums/StatusPagamento";
import { PagamentoResponse } from "../../interfaces/interfaces";
import api from "../../services/api";
import store from "../../store";
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
  const [listaPagamentosResponse, setListaPagamentosResponse] = useState<PagamentoResponse[]>();
  const [usuario, setUsuario] = useState<UsuarioState | null>(store.getState().auth.usuario || null);

  const pagamentosMes = async () => {
    const usuario = store.getState().auth.usuario;

    const filtro: FiltroDashboardPagamento = {
      mesPagamento: new Date(mesPagamento.getFullYear(), mesPagamento.getMonth(), 1).toISOString(),
      status: StatusPagamento.PAGO,
      usuario: {
        id: usuario?.id || null,
      }
    }
    try {
      const response = await api.post('Pagamento/pagamentosMes', filtro);
      const data = new Date(response.data.mesPagamento)
      const mes: string = data.toLocaleString('pt-BR', { month: 'long' });
      response.data.mesPagamento = mes.charAt(0).toUpperCase() + mes.slice(1)
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

  const dashboard = async () => {
    const filtro: FiltroDashboardPagamento = {
      mesPagamento: new Date(mesPagamento.getFullYear(), mesPagamento.getMonth(), 1).toISOString(),
      status: StatusPagamento.PAGO,
      usuario: {
        id: store.getState().auth.usuario?.id || null
      }
    }

    try {
      const response = await api.post('Pagamento/dashboard', filtro);
      console.log("Dashboard response:", response.data);
      setListaPagamentosResponse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro na requisição:", error.response?.data);
        if (error.response?.status === 400) {
          console.log(error.response.data)
        }
      }
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let appState: import("react-native").AppStateStatus = AppState.currentState;

    const fetchData = () => {
      pagamentosMes();
      dashboard();
    }

    fetchData();

    intervalId = setInterval(fetchData, 5 * 60 * 1000);

    const handleAppStateChange = (nextAppState: import("react-native").AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        fetchData();
      }
      appState = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      clearInterval(intervalId);
      subscription.remove();
    };
  }, []);


  return (

    <View style={styles.container}>
      <View>
        <Text style={{ color: Colors.fundoCard, fontSize: 20, width: "100%" }}>Bem vinda {usuario?.nome}</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.cards}>
          {pagamentoResponse != undefined && (
            <Card
              title={`Pagamentos de ${pagamentoResponse.mesPagamento}`}
              quantidade={pagamentoResponse.quantidadePagamentos}
              status={pagamentoResponse.status}
              valorTotal={`R$${pagamentoResponse.valorTotal}`}
            ></Card>
          )}
          {pagamentoResponse != undefined && (
            <Card
              title={`Pagamentos de ${pagamentoResponse.mesPagamento}`}
              quantidade={pagamentoResponse.quantidadePagamentos}
              status={pagamentoResponse.status}
              valorTotal={`R$${pagamentoResponse.valorTotal}`}
            ></Card>
          )}
        </View>
        {listaPagamentosResponse != null && listaPagamentosResponse?.length > 0 && (
          <GraficoGastos
            pagamentos={listaPagamentosResponse}
          />
        )}
      </View>
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
    flexDirection: 'column',
    gap: 40,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  subContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.padraoBackGround,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  }
})



export default Dashboard;