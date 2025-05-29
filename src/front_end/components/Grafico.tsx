import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { PagamentoResponse } from '../interfaces/interfaces';
import { Colors } from '../styles/constants';

const screenWidth = Dimensions.get('window').width;
const configDoGrafico: ChartConfig = {
  backgroundColor: '#1e2923',
  backgroundGradientFrom: Colors.defaultText,
  backgroundGradientTo: Colors.fundo,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    // O borderRadius será movido para o container
  },
  barPercentage: 0.8,
};

interface GraficoGastosProps {
  pagamentos?: PagamentoResponse[]; // Use a interrogação para tornar a prop opcional
}


const GraficoGastos: React.FC<GraficoGastosProps> = ({ pagamentos = [] }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // A verificação `pagamentos && pagamentos.length > 0` é uma boa prática
    if (pagamentos && pagamentos.length > 0) {
      const novosLabels = pagamentos.map((pagamento) => {
        const dataPagamento = new Date(pagamento.mesPagamento);
        const mes = dataPagamento.toLocaleDateString('pt-BR', { month: 'long' })
        return mes.charAt(0).toUpperCase() + mes.slice(1);
      });
      const novosData = pagamentos.map((pagamento) => pagamento.valorTotal);

      setLabels(novosLabels);
      setData(novosData);
    } else {
      // Limpa os dados se a prop pagamentos ficar vazia ou indefinida
      setLabels([]);
      setData([]);
    }
  }, [pagamentos]);

  const dadosDoGrafico = {
    labels: labels,
    datasets: [
      {
        data: data.length > 0 ? data : [0],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.graficoContainer}>
        <BarChart
          data={dadosDoGrafico}
          width={screenWidth * 0.95}
          height={180}
          chartConfig={configDoGrafico}
          yAxisLabel="R$ "
          fromZero={true}
          showValuesOnTopOfBars={true}
          verticalLabelRotation={0}
          yAxisSuffix=''
          yAxisInterval={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.fundo,
    padding: 10,
  },
  graficoContainer: {
    // Estilos para criar o efeito de "card"
    borderRadius: 16,
    paddingVertical: 15, // Adiciona um espaço vertical dentro do card
    paddingHorizontal: 5,  // Adiciona um espaço horizontal dentro do card
    alignItems: 'center',

    // Sombra (opcional)
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default GraficoGastos;