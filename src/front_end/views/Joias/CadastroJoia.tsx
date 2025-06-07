import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import cardContainerStyle from '../../styles/cardContainer';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

const imagemPadrao = require('../../assets/no-image.jpeg');

interface Joia {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
  urlImagem?: string;
}

export default function CadastroJoia({ route, navigation }: any) {
  const joiaExistente = route.params?.joia;
  const [nome, setNome] = useState(joiaExistente?.nome || '');
  const [descricao, setDescricao] = useState(joiaExistente?.descricao || '');
  const [preco, setPreco] = useState(joiaExistente?.preco ? joiaExistente.preco.toString() : '');
  const [quantidade, setQuantidade] = useState(joiaExistente?.quantidade ? joiaExistente.quantidade.toString() : '');
  const [imagem, setImagem] = useState<{ uri: string } | null>(null);

  useEffect(() => {
    if (joiaExistente) {
      setNome(joiaExistente.nome || '');
      setDescricao(joiaExistente.descricao || '');
      setPreco(joiaExistente.preco ? joiaExistente.preco.toString() : '');
      setQuantidade(joiaExistente.quantidade ? joiaExistente.quantidade.toString() : '');

      if (joiaExistente.urlImagem) {
        setImagem({ uri: joiaExistente.urlImagem });
      } else {
        setImagem(null);
      }
    } else {
      setNome('');
      setDescricao('');
      setPreco('');
      setQuantidade('');
      setImagem(imagemPadrao);
    }
  }, [joiaExistente]);

  async function pegaImagemGaleria() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso da sua galeria.');
      return;
    }

    const seleciona = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!seleciona.canceled && seleciona.assets?.length) {
      setImagem({ uri: seleciona.assets[0].uri });
    }
  }

  async function tirarFotoCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos do acesso da sua câmera.');
      return;
    }

    const seleciona = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!seleciona.canceled && seleciona.assets?.length) {
      setImagem({ uri: seleciona.assets[0].uri });
    }
  }

  async function cadastraJoia() {
    if (!nome || !preco || !quantidade) {
      Alert.alert('Erro', 'Nome, preço e quantidade são obrigatórios.');
      return;
    }

    const dadosCadastro = new FormData();
    dadosCadastro.append('Nome', nome);
    dadosCadastro.append('Descricao', descricao);
    dadosCadastro.append('Preco', parseFloat(preco).toString());
    dadosCadastro.append('Quantidade', parseInt(quantidade, 10).toString());

    if (imagem && imagem.uri && !imagem.uri.startsWith('http')) {
      const nomeArquivo = imagem.uri.split('/').pop() || 'photo.jpg';
      const match = /\.(\w+)$/.exec(nomeArquivo);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      dadosCadastro.append('imagem', {
        uri: imagem.uri,
        name: nomeArquivo,
        type,
      } as any);
    }

    try {
      if (joiaExistente?.id) {
        await api.put(`joia/${joiaExistente.id}`, dadosCadastro, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Sucesso', 'A joia foi atualizada.');
      } else {
        await api.post(`joia?usuarioId=1`, dadosCadastro, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Sucesso', 'Joia cadastrada!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar joia.');
      console.error(error);
    }
  }

  return (
    <Container>
      <Text style={styles.txtTitulo}>
        {joiaExistente ? 'Informações' : 'Cadastro de Joias'}
      </Text>
      <ScrollView style={cardContainerStyle.cardContainer}>
        <View style={{ alignItems: 'center', marginBottom: 0 }}>
          <Image
            source={imagem?.uri ? { uri: imagem.uri } : imagemPadrao}
            style={styles.imgPrevisualizacao}
          />
        </View>

        <View style={styles.imageButtonsContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={pegaImagemGaleria}>
            <Ionicons style={styles.icone} name="images-outline"></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageButton} onPress={tirarFotoCamera}>
            <Ionicons style={styles.icone} name="camera-outline"></Ionicons>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nome da Joia:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Colar de ouro"
        />

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Opcional"
          multiline
        />

        <Text style={styles.label}>Preço:</Text>
        <TextInput
          style={styles.input}
          value={preco}
          onChangeText={setPreco}
          placeholder="Ex: 199.90"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder="Ex: 3"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.btnSalvar} onPress={cadastraJoia}>
          <Text style={styles.txtBtnSalvar}>
            {joiaExistente ? 'Atualizar' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '500',
    fontSize: 20,
    color: '#364B4B',
  },
  input: {
    backgroundColor: '#A3A3A3',
    color: '#F7E7CE',
    fontWeight: '400',
    fontSize: 16,
    borderRadius: 20,
    padding: 10,
    borderColor: '#999',
    borderWidth: 1,
  },
  imagePicker: {
    marginVertical: 15,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  imageButton: {
    padding: 10,
    backgroundColor: '#030034',
    borderRadius: 8,
    width: '23%',
    alignItems: 'center',
  },
  icone: {
    fontSize: 28,
    color: '#D4AF37',
  },
  imgPrevisualizacao: {
    width: 230,
    height: 200,
    borderRadius: 8,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  btnSalvar: {
    backgroundColor: '#293A3A',
    width: '100%',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  txtBtnSalvar: {
    color: '#D4AF37',
    fontWeight: 'bold',
    fontSize: 18,
  }
});
