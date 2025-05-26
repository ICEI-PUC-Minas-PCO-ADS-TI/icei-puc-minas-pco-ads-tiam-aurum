import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { Colors } from '../styles/constants';

const screenWidth = Dimensions.get('window').width;

// Dados do gráfico (seu código original)
const dadosDoGrafico = {
  labels: ["Alimentação", "Transporte", "Moradia", "Lazer", "Outros"],
  datasets: [
    {
      data: [1250, 550, 2100, 480, 300],
    },
  ],
};

// Configurações visuais (seu código original)
const configDoGrafico: ChartConfig = {
  backgroundColor: '#1e2923',
  backgroundGradientFrom: Colors.fundo,
  backgroundGradientTo: Colors.fundo,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(134, 209, 149, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    // O borderRadius será movido para o container
  },
  barPercentage: 0.8,
};


const GraficoGastos = () => {
  return (
    <View style={styles.container}>
      {/* O título pode ficar aqui fora do card */}
      <Text style={styles.titulo}>Resumo de Gastos Mensais</Text>

      {/* <-- MUDANÇA 1: Adicionamos a View "envelope" --> */}
      <View style={styles.graficoContainer}>
        <BarChart
          data={dadosDoGrafico}
          // <-- MUDANÇA 2: Reduzimos a largura e a altura -->
          width={screenWidth * 0.95} // Usando 80% da largura da tela
          height={180}
          chartConfig={configDoGrafico}
          yAxisLabel="R$ "
          fromZero={true}
          showValuesOnTopOfBars={true}
          verticalLabelRotation={0} // Ajustado para melhor visualização
          // <-- MUDANÇA 3: Removemos a prop 'style' daqui -->
          // As outras props que você usava podem continuar aqui
          yAxisSuffix=''
          yAxisInterval={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  // <-- MUDANÇA 4: Criamos o estilo para o "envelope" do gráfico -->
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