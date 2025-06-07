import React, { useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import JoiaCard, { Joia } from '../../components/JoiaCard';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

export default function Produtos({ navigation }: any) {
  const [joias, renderizaJoias] = useState<Joia[]>([]);
  const usuarioId = 1;

  useFocusEffect(
    useCallback(() => {
      carregarJoias();
    }, [])
  );

  async function carregarJoias() {
    try {
      const response = await api.get<Joia[]>(`joia/usuario/${usuarioId}`);
      console.log('Dados recebidos:', response.data);
      renderizaJoias(response.data);
    } catch (error) {
      console.log('Deu ruim pra buscar as joias', error);
    }
  }

  function editarJoia(joia: Joia) {
    navigation.navigate('CadastroJoia', { joia });
  }

  async function deletarJoia(joiaId: number) {
    Alert.alert(
      'Excluir Joia',
      'Tem certeza que deseja excluir essa joia?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`joia/${joiaId}`);
              carregarJoias();
              Alert.alert('Sucesso', 'A joia foi excluída com sucesso!');
            } catch (error) {
              console.log('Deu ruim pra excluir', error);
              Alert.alert('Erro', 'Não foi possível excluir essa joia.');
            }
          },
        },
      ]
    );
  }

  function adicionaCarrinho(joia: Joia) {
    alert(`Adicionado ao carrinho: ${joia.nome}`);
  }

  return (
  <View style={styles.container}>
    <FlatList
      data={joias}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.cardContainer}
      ListHeaderComponent={
        <Text style={styles.txtTitulo}>Produtos</Text>
      }
      renderItem={({ item }) => (
        <JoiaCard
          joia={item}
          editar={() => editarJoia(item)}
          deletar={() => deletarJoia(item.id)}
          adicionarCarrinho={() => adicionaCarrinho(item)}
        />
      )}
    />

    <TouchableOpacity
      style={styles.btnAdd}
      onPress={() => navigation.navigate('CadastroJoia', { joia: undefined })}
    >
      <Ionicons name="add" size={28} color="#D4AF37" />
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#364B4B',
  },
  cardContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 40,
    padding: 20,
    elevation: 2,
  },
  txtTitulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#364B4B',
    textAlign: 'center',
    marginBottom: 10,
  },
  btnAdd: {
    backgroundColor: '#364B4B',
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    left: 20,
    elevation: 4,
  },
});