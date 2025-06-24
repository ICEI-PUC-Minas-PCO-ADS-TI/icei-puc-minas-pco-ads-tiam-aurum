import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Container from '../../components/Container';
import { Colors } from "../../styles/constants";
import Dashboard from '../Dashboard/Dashboard';
import { PagamentoResponse } from '../../interfaces/interfaces';



interface Pagamento {
  id: number;
  valor: number;
  status: string;
  data: string;
  clienteId: number;
}

interface Cliente {
  id: number;
  nome: string;
}

export const HistoricoPagamentos=({ navigation }):any => { 
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);


export const Dashboard = ({ navigation }: any) => {
  const [historico, sethistorico] = useState<PagamentoResponse[]>([])
}
 const API = "http://192.168.0.106:5038";

async function fetchClientes() {
  try {
    // não esqueça do await aqui
    const response = await fetch(`http://192.168.0.106:5038/api/Clientes`);
     
    if (!response.ok) throw new Error(`Erro ao buscar clientes: ${response.status}`);
    await api.post(`pagamento?usuarioId=${clienteId}`, JSON.stringify(Cliente), {
                    headers: { 'Content-Type': 'application/json' },
    
  } catch (error) {
    console.error(error);
  }
}

async function fetchPagamentos() {
  try {
    // GET correto para buscar pagamentos
    const response = await fetch(`${API}/api/Pagamento/pagamentosMes`);
    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Resposta da API:", text);

    if (!response.ok) throw new Error(`Erro ao buscar pagamentos: ${response.status}`);
    const data: Pagamento[] = JSON.parse(text);
    setPagamentos(data);
  } catch (error) {
    console.error(error);
  }
}




  useEffect(() => {
    fetchPagamentos();
    fetchClientes();
  }, []);

  function getNomeCliente(clienteId: number): string {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'Cliente desconhecido';
  }

  return (
    <Container style={styles.body}>

      {pagamentos.length === 0 ? (
        <Text style={styles.subTitle}>Nenhum pagamento encontrado.</Text>
      ) : (
        pagamentos.map((pagamento) => (
          <View key={pagamento.id} style={styles.cardItem}>
            <Text style={styles.subTitleCliente}>{getNomeCliente(pagamento.clienteId)}</Text>
            <Text  style={styles.subTitle}>Valor: {pagamento.valor}</Text>
            <Text style={styles.subTitle}>Status: {pagamento.status}</Text>
            <Text style={styles.subTitle}>Data: {new Date(pagamento.data).toLocaleDateString()}</Text>
          </View>
        ))
      )}
    {pagamentos.map((pagamento) => (
  <View key={pagamento.id} style={styles.cardItem}>
    <Text style={styles.subTitle}>{getNomeCliente(pagamento.clienteId)}</Text>
    <Text>Valor: {pagamento.valor}</Text>
    <Text>Status: {pagamento.status}</Text>
    <Text>Data: {new Date(pagamento.data).toLocaleDateString()}</Text>

    {pagamento.status !== 'Pago' && (
      <Text
  style={styles.botaoPagar}
  onPress={async () => {
    try {
      await fetch(
        `${API}/api/Pagamento/marcar-como-pago/${pagamento.id}`,
        { method: 'PUT' }
      );
      await fetchPagamentos(); // atualiza a lista depois
    } catch (error) {
      console.error(error);
    }
  }}
> Marcar como Pago</Text>

    )}
  </View>
))}

    </Container>
  );
} 
}

const styles = StyleSheet.create({
  
  body: {
    backgroundColor: Colors.fundo,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.textInfo,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 10,
  },
  subTitleCliente: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: Colors.fundoCard,
    marginLeft:10,
    marginRight:10,
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
    alignItems: 'center',
  },
});
