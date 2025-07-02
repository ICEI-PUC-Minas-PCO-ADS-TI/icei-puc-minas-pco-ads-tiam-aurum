import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Container from '../../components/Container';
import { Colors } from "../../styles/constants";
import api from '../../services/api';
import store from '../../store';
import { useFocusEffect } from '@react-navigation/native';

interface Pagamento {
  id: number;
  valorParcela: number;
  status: string;
  dataVencimento: string;
  formaPagamento: string;
  numeroParcela: number;
  nomeCliente: string;
}

const HistoricoPagamentos = ({ navigation }: any) => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const usuarioId = store.getState().auth.usuario?.id;

  async function fetchPagamentosPendentes() {
    try {
      const response = await api.get<Pagamento[]>(`pagamento/usuario/${usuarioId}/pendentes`);
      setPagamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
    }
  }

  async function marcarComoPago(pagamentoId: number) {
    try {
      await api.put(`pagamento/marcar-como-pago/${pagamentoId}`);
      await fetchPagamentosPendentes();
    } catch (error) {
      console.error('Erro ao marcar como pago:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPagamentosPendentes();
    }, [usuarioId])
  );

  return (
    <Container style={styles.body}>
      <ScrollView>
        {pagamentos.length === 0 ? (
          <Text style={styles.subTitle}>Nenhum pagamento pendente encontrado.</Text>
        ) : (
          pagamentos.map((pagamento) => (
            <View key={pagamento.id} style={styles.cardItem}>
              <Text style={styles.subTitleCliente}>{pagamento.nomeCliente}</Text>
              <Text style={styles.subTitle}>Parcela: {pagamento.numeroParcela}</Text>
              <Text style={styles.subTitle}>Valor: R$ {pagamento.valorParcela.toFixed(2)}</Text>
              <Text style={styles.subTitle}>Forma de pagamento: {pagamento.formaPagamento}</Text>
              <Text style={styles.subTitle}>
                Vencimento: {new Date(pagamento.dataVencimento).toLocaleDateString('pt-BR')}
              </Text>
              <Text style={styles.botaoPagar} onPress={() => marcarComoPago(pagamento.id)}>
                Marcar como Pago
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </Container>
  );
};

export default HistoricoPagamentos;

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.fundo,
    flex: 1,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 5,
  },
  subTitleCliente: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: Colors.fundoCard,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  botaoPagar: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.button,
    color: Colors.textButton,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
  },
});
