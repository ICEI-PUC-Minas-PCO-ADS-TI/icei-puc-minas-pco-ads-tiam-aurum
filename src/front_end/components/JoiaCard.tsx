import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Joia {
  Id: number;
  Nome: string;
  Quantidade: number;
  Preco: number;
  UrlImagem?: string;
}

interface JoiaCardProps {
  joia: Joia;
  onEdit: () => void;
  onDelete: () => void;
  onAddToCart: () => void;
}

export default function JoiaCard({ joia, onEdit, onDelete, onAddToCart }: JoiaCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={joia.UrlImagem ? { uri: joia.UrlImagem } : require('../assets/no-image.png')}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.nome}>{joia.Nome}</Text>
        <Text>Quantidade: {joia.Quantidade}</Text>
        <Text>Preço: R$ {joia.Preco.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="pencil" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={{ marginTop: 10 }}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddToCart} style={{ marginTop: 20 }}>
          <Ionicons name="cart" size={28} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});