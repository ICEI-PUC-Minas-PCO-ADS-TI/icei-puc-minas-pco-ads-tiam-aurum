import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import JoiaCard, { Joia } from '../../components/JoiaCard';
import api from '../../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Produtos: undefined;
  CadastroJoia: { joia?: Joia };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Produtos'>;

export default function Produtos({ navigation }: Props) {
  const [joias, setJoias] = useState<Joia[]>([]);
  const usuarioId = 1;

  useEffect(() => {
    fetchJoias();
  }, []);

  async function fetchJoias() {
    try {
      const response = await api.get<Joia[]>(`joia/usuario/${usuarioId}`);
      setJoias(response.data);
    } catch (error) {
      console.log('Erro ao buscar joias', error);
    }
  }

  function handleEdit(joia: Joia) {
    navigation.navigate('CadastroJoia', { joia });
  }

  async function handleDelete(joiaId: number) {
    try {
      await api.delete(`joia/${joiaId}`);
      fetchJoias();
    } catch (error) {
      console.log('Erro ao excluir joia', error);
    }
  }

  function handleAddToCart(joia: Joia) {
    alert(`Adicionado ao carrinho: ${joia.Nome}`);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={joias}
        keyExtractor={item => item.Id.toString()}
        renderItem={({ item }) => (
          <JoiaCard
            joia={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.Id)}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
      />

      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => navigation.navigate({ name: 'CadastroJoia', params: {} })}
      >
        <Text style={styles.btnAddText}>+ Cadastrar Joia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  btnAdd: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 4,
  },
  btnAddText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});