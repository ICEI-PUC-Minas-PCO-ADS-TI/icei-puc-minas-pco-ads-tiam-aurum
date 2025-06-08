// components/Card.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles/constants';

interface CardProps {
  title: string;
  description?: string;
  quantidade?: number;
  status?: string;
  valorTotal?: string;
}

const Card: React.FC<CardProps> = (values: CardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sobTitle}>{values.title}</Text>
      <Text style={styles.title}>{values.valorTotal}</Text>
      {values.status !== undefined && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.sobTitle}>Status </Text>
          <Text style={styles.caracterTitle}>{values.status}</Text>
        </View>
      )}
      {values.quantidade !== undefined && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.sobTitle}>Quantidade: </Text>
          <Text style={styles.caracterTitle}>{values.quantidade}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Android
    width: '43%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 8,
    color: Colors.defaultText
  },
  sobTitle: {
    fontSize: 14,
    color: Colors.fundo,
    fontWeight: "bold"
  },
  caracterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.defaultText
  }
});

export default Card;
