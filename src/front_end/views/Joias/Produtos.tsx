import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import JoiaCard, { Joia } from '../../components/JoiaCard';
import Container from '../../components/Container';
import cardContainerStyle from '../../styles/cardContainer';
import api from '../../services/api';

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
    navigation.navigate('CadastroJoias', { joia });
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
    <Container>
      <Text style={styles.txtTitulo}>Produtos</Text>
      <FlatList
        data={joias}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={cardContainerStyle.cardContainer}
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
        onPress={() => navigation.navigate('CadastroJoias', { joia: undefined })}
      >
        <Ionicons name="add" size={28} color="#D4AF37" />
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  txtTitulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginVertical: 20,
    marginLeft: 20,
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