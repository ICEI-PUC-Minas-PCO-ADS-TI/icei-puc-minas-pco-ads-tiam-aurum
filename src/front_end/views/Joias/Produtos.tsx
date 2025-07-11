import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

import JoiaCard, { Joia } from '../../components/JoiaCard';
import Container from '../../components/Container';
import cardContainerStyle from '../../styles/cardContainer';
import formularioStyle from '../../styles/formulario';
import useCarrinho from '../../store/CarrinhoContext';
import api from '../../services/api';
import store from '../../store';

export default function Produtos({ navigation }: any) {
  const [joias, renderizaJoias] = useState<Joia[]>([]);
  const usuarioId = store.getState().auth.usuario?.id; // substituir pelo id do usuário através do jwt ou contexto global
  const [joiaSelecionada, setJoiaSelecionada] = useState<Joia | null>(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const { adicionarItem } = useCarrinho();
  const [termoBusca, setTermoBusca] = useState('')

  useFocusEffect(
    useCallback(() => {
      carregarJoias();
    }, [])
  );

  async function carregarJoias() {
    try {
      const response = await api.get<Joia[]>(`joia/usuario/${usuarioId}`);
      renderizaJoias(response.data);
    } catch (error) {
      console.log('Deu ruim pra buscar as joias', error);
    }
  }

  async function buscarJoiasPorTermo() {
    try {
      if (!termoBusca.trim()) {
        carregarJoias();
        return;
      }

      const response = await api.get<Joia[]>(`joia/usuario/${usuarioId}/buscar`, {
        params: { term: termoBusca.toUpperCase().trim() }
      });
      renderizaJoias(response.data);
      setTermoBusca('');
    } catch (error) {
      console.log('Erro ao buscar por termo:', error);
      Alert.alert('Erro ao buscar joias.');
    }
  }

  function navegarParaEdicao(joia: Joia) {
    navigation.navigate('CadastroJoias', { joia });
  }

  async function excluirJoia(joiaId: number) {
    Alert.alert('Excluir Joia', 'Tem certeza que deseja excluir essa joia?',
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

  function abreModalAdicionarCarrinho(joia: Joia) {
    setJoiaSelecionada(joia);
    setQuantidadeSelecionada('');
    setModalVisivel(true);
  }

  function confirmarAdicaoCarrinho() {
    const quantidade = parseInt(quantidadeSelecionada);

    if (!quantidade || quantidade <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida.');
      return;
    }

    if (joiaSelecionada && quantidade > joiaSelecionada.quantidade) {
      Alert.alert('Erro', 'O estoque não possui essa quantidade disponível.');
      return;
    }

    if (joiaSelecionada) {
      adicionarItem(joiaSelecionada, quantidade);
      Alert.alert('Sucesso', `${quantidade}x ${joiaSelecionada.nome} adicionado ao carrinho`);
    }

    fecharModal()
  }

  function fecharModal() {
    setModalVisivel(false);
    setJoiaSelecionada(null);
    Keyboard.dismiss();
  }

  return (
    <Container>
      <Text style={formularioStyle.titulo}>Joias</Text>
      <View style={styles.barraBuscaContainer}>
        <TextInput
          placeholder="Buscar por nome ou código"
          style={styles.barraBuscaInput}
          value={termoBusca}
          onChangeText={setTermoBusca}
          onSubmitEditing={buscarJoiasPorTermo}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={buscarJoiasPorTermo} style={styles.btnBuscar}>
          <Ionicons name="search" size={20} color="#D4AF37" />
        </TouchableOpacity>
      </View>
      <View style={cardContainerStyle.cardContainer}>
        {joias.length === 0 ? (
          <Text style={formularioStyle.label}>Nenhuma joia cadastrada.</Text>
        ) : (
          <FlatList
            data={joias}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <JoiaCard
                joia={item}
                editar={() => navegarParaEdicao(item)}
                deletar={() => excluirJoia(item.id)}
                adicionarCarrinho={() => abreModalAdicionarCarrinho(item)}
              />
            )}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => navigation.navigate('CadastroJoias', { joia: undefined })}
      >
        <Ionicons name="add" size={28} color="#D4AF37" />
      </TouchableOpacity>
      {modalVisivel && (
        <TouchableWithoutFeedback onPress={() => {
          setModalVisivel(false);
          setJoiaSelecionada(null);
          Keyboard.dismiss();
        }}>
          <View style={styles.modalCard}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalConteudo}>
                <Text style={styles.modalTitulo}>Informe a quantidade</Text>
                <Text style={styles.modalSubtitulo}>Estoque: {joiaSelecionada?.quantidade}</Text>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  placeholder="Quantidade"
                  value={quantidadeSelecionada}
                  onChangeText={setQuantidadeSelecionada}
                />
                <TouchableOpacity style={styles.modalBotao} onPress={confirmarAdicaoCarrinho}>
                  <Text style={styles.modalBotaoTexto}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBotao, { backgroundColor: '#ccc', marginTop: 10 }]}
                  onPress={() => {
                    setModalVisivel(false);
                    setJoiaSelecionada(null);
                  }}
                >
                  <Text style={[styles.modalBotaoTexto, { color: '#333' }]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  btnAdd: {
    backgroundColor: '#364B4B',
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    left: 20,
    elevation: 4,
  },
  modalCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalConteudo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalSubtitulo: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalBotao: {
    backgroundColor: '#364B4B',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: '#D4AF37',
    fontWeight: 'bold',
    fontSize: 16,
  },
  barraBuscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  barraBuscaInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 8,
    color: '#000',
  },

  btnBuscar: {
    padding: 6,
    marginLeft: 5,
  },
});