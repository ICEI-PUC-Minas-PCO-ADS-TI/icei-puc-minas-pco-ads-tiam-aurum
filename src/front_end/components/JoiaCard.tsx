import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Joia {
  id: number;
  codigo?: string;
  nome: string;
  descricao?: string;
  quantidade: number;
  preco: number;
  urlImagem?: string;
}

interface JoiaCardProps {
  joia: Joia;
  editar?: () => void;
  deletar?: () => void;
  adicionarCarrinho?: () => void;
}

export default function JoiaCard({ joia, editar: editar, deletar: deletar, adicionarCarrinho: adicionarCarrinho } : JoiaCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={joia.urlImagem ? { uri: joia.urlImagem } : require('../assets/no-image.jpeg')}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.nome}>{joia.nome}</Text>
        <Text style={styles.textoDestaque}>Código: {joia.codigo}</Text>
        <Text style={styles.texto}>Quantidade: {joia.quantidade}</Text>
        <Text style={styles.texto}>Preço: R$ {joia.preco.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        {editar && (
          <TouchableOpacity onPress={editar}>
            <Ionicons name="pencil" size={24} color="#030034" />
          </TouchableOpacity>
        )}
        {deletar && (
          <TouchableOpacity onPress={deletar} style={{ marginTop: 15 }}>
            <Ionicons name="trash" size={24} color="gray" />
          </TouchableOpacity>
        )}
        {adicionarCarrinho && (
          <TouchableOpacity onPress={adicionarCarrinho} style={{ marginTop: 15 }}>
            <Ionicons name="cart" size={28} color="#D4AF37" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 5,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginLeft: 3,
  },
  texto: {
    fontSize: 16,
    color: '#000',
  },
  textoDestaque: {
    fontSize: 16,
    fontWeight: '600',
    color: '#364B4B',
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#364B4B',
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
  },
});