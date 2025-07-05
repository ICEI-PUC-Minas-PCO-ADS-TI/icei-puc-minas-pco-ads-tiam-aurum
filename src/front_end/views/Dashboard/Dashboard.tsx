import axios from "axios";
import { useEffect, useState } from "react";
import { AppState, ScrollView, StyleSheet, Text, View } from "react-native";
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
  const [listaPagamentosResponsePendente, setListaPagamentosResponsePendente] = useState<PagamentoResponse[]>();
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
      setListaPagamentosResponse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log(error.response.data)
        }
      }
    }
  }
  const dashboardPendentes = async () => {
    const filtro: FiltroDashboardPagamento = {
      mesPagamento: new Date(mesPagamento.getFullYear(), mesPagamento.getMonth(), 1).toISOString(),
      status: StatusPagamento.PENDENTE,
      usuario: {
        id: store.getState().auth.usuario?.id || null
      }
    }

    try {
      const response = await api.post('Pagamento/dashboard', filtro);
      setListaPagamentosResponsePendente(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
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
      dashboardPendentes();
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
      <View style={{ padding: 15, width: "100%", justifyContent: "center", borderTopLeftRadius: 80, borderTopRightRadius: 80 }}>
        <Text style={{ color: Colors.textButton, fontSize: 20, width: "100%" }}>Bem vindo,</Text>
        <Text style={{ color: Colors.textButton, fontSize: 20, width: "100%" }}>{usuario?.nome}</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.cards}>
          {pagamentoResponse != undefined ?
            <Card
              title={`Pagamentos de ${pagamentoResponse.mesPagamento}`}
              quantidade={pagamentoResponse.quantidadePagamentos}
              status={pagamentoResponse.status}
              valorTotal={`R$${pagamentoResponse.valorTotal}`}
            ></Card>
            : <Card title="Não tem pagamentos para esse mês"></Card>
          }
          {pagamentoResponse != undefined ?
            <Card
              title={`Pagamentos de ${pagamentoResponse.mesPagamento}`}
              quantidade={pagamentoResponse.quantidadePagamentos}
              status={pagamentoResponse.status}
              valorTotal={`R$${pagamentoResponse.valorTotal}`}
            ></Card>
            :
            <Card title="Não tem pagamentos para esse mês"></Card>

          }
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 60,
            minHeight: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          showsVerticalScrollIndicator={true}
        >
          {listaPagamentosResponse != null && listaPagamentosResponse?.length > 0 && (
            <GraficoGastos
              pagamentos={listaPagamentosResponse}
            />
          )}
          {listaPagamentosResponsePendente != null && listaPagamentosResponsePendente?.length > 0 && (
            <GraficoGastos
              pagamentos={listaPagamentosResponsePendente}
            />
          )}
        </ScrollView>
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
    justifyContent: 'center',
    width: '100%'
  },
  subContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.padraoBackGround,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    padding: 10
  }
})



export default Dashboard;