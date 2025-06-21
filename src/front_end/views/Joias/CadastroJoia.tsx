import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import Container from '../../components/Container';
import cardContainerStyle from '../../styles/cardContainer';
import formularioStyle from '../../styles/formulario';
import api from '../../services/api';
import store from '../../store';

const imagemPadrao = require('../../assets/no-image.jpeg');

interface Joia {
  id?: number;
  codigo?: string;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
  urlImagem?: string;
}

export default function CadastroJoia({ route, navigation }: any) {
  const joiaEditando = route.params?.joia;
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [imagem, setImagem] = useState<{ uri: string } | null>(null);

  useEffect(() => {
    preencherCamposComJoia();
  }, [joiaEditando]);

  function preencherCamposComJoia() {
    if (joiaEditando) {
      setCodigo(joiaEditando.codigo || '');
      setNome(joiaEditando.nome || '');
      setDescricao(joiaEditando.descricao || '');
      const precoFormatado = joiaEditando.preco?.toFixed(2).replace('.', ',');
      setPreco(precoFormatado || '');
      setQuantidade(joiaEditando.quantidade?.toString() || '');
      setImagem(joiaEditando.urlImagem ? { uri: joiaEditando.urlImagem } : null);
    } else {
      setCodigo('');
      setNome('');
      setDescricao('');
      setPreco('');
      setQuantidade('');
      setImagem(null);
    }
  }

  async function selecionarImagemDaGaleria() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Habilite o acesso à galeria.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!resultado.canceled && resultado.assets?.length) {
      setImagem({ uri: resultado.assets[0].uri });
    }
  }

  async function tirarFotoComCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Habilite o acesso à câmera.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!resultado.canceled && resultado.assets?.length) {
      setImagem({ uri: resultado.assets[0].uri });
    }
  }

  function construirFormData(): FormData {
    const formData = new FormData();
    formData.append('Codigo', codigo);
    formData.append('Nome', nome);
    formData.append('Descricao', descricao);
    formData.append('Preco', preco.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'));
    formData.append('Quantidade', parseInt(quantidade, 10).toString());

    if (imagem && imagem.uri && !imagem.uri.startsWith('http')) {
      const nomeArquivo = imagem.uri.split('/').pop() || 'foto.jpg';
      const extensao = /\.(\w+)$/.exec(nomeArquivo);
      const tipo = extensao ? `image/${extensao[1]}` : 'image/jpeg';

      formData.append('imagem', {
        uri: imagem.uri,
        name: nomeArquivo,
        type: tipo,
      } as any);
    }

    return formData;
  }

  async function salvarJoia() {
    if (!nome || !preco || !quantidade) {
      Alert.alert('Preencha nome, preço e quantidade.');
      return;
    }

    const dados = construirFormData();

    try {
      if (joiaEditando?.id) {

        await api.put(`joia/${joiaEditando.id}`, dados, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Sucesso', 'Joia atualizada!');

      } else {

        const usuarioId = store.getState().auth.usuario?.id;

        if (!usuarioId) {
          Alert.alert("Erro", "Usuário não identificado.");
          return;
        }

        await api.post(`joia?usuarioId=${usuarioId}`, dados, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Sucesso', 'Joia cadastrada!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao salvar joia.');
      console.error(error);
    }
  }

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Text style={formularioStyle.titulo}>
          {joiaEditando ? 'Editar Joia' : 'Cadastrar Joia'}
        </Text>

        <ScrollView style={cardContainerStyle.cardContainer}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center' }}>
            <Image
              source={imagem?.uri ? { uri: imagem.uri } : imagemPadrao}
              style={styles.imgPrevisualizacao}
            />
          </View>

          <View style={styles.imageButtonsContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={selecionarImagemDaGaleria}>
              <Ionicons style={styles.icone} name="images-outline" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageButton} onPress={tirarFotoComCamera}>
              <Ionicons style={styles.icone} name="camera-outline" />
            </TouchableOpacity>
          </View>

          <Text style={formularioStyle.label}>Código da Joia:</Text>
          <TextInput
            style={formularioStyle.input}
            value={codigo}
            onChangeText={setCodigo}
            placeholder="Ex: J123-OURO"
          />

          <Text style={formularioStyle.label}>Nome da Joia:</Text>
          <TextInput
            style={formularioStyle.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Ex: Colar de Ouro"
          />

          <Text style={formularioStyle.label}>Descrição:</Text>
          <TextInput
            style={formularioStyle.input}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Opcional"
            multiline
          />

          <Text style={formularioStyle.label}>Preço:</Text>
          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: '',
            }}
            style={formularioStyle.input}
            value={preco}
            onChangeText={setPreco}
            placeholder="Ex: R$ 199,90"
          />

          <Text style={formularioStyle.label}>Quantidade:</Text>
          <TextInput
            style={formularioStyle.input}
            value={quantidade}
            onChangeText={(text) => {
              const somenteNumeros = text.replace(/[^0-9]/g, '');
              setQuantidade(somenteNumeros);
            }}
            keyboardType="numeric"
            placeholder="Ex: 3"
          />

          <TouchableOpacity style={formularioStyle.botao} onPress={salvarJoia}>
            <Text style={formularioStyle.textoBotao}>
              {joiaEditando ? 'Atualizar' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
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
});
