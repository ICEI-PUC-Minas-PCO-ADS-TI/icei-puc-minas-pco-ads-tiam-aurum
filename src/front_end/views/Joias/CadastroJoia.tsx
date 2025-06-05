import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  CadastroJoia: { joia?: Joia };
  Produtos: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroJoia'>;

interface Joia {
  Id?: number;
  Nome: string;
  Descricao?: string;
  Preco: number;
  Quantidade: number;
  UrlImagem?: string;
}

export default function CadastroJoia({ route, navigation }: Props) {
  const joiaEdit = route.params?.joia;

  const [nome, setNome] = useState(joiaEdit?.Nome || '');
  const [descricao, setDescricao] = useState(joiaEdit?.Descricao || '');
  const [preco, setPreco] = useState(joiaEdit?.Preco ? joiaEdit.Preco.toString() : '');
  const [quantidade, setQuantidade] = useState(joiaEdit?.Quantidade ? joiaEdit.Quantidade.toString() : '');
  const [imagem, setImagem] = useState<{ uri: string } | null>(null);

  useEffect(() => {
    if (joiaEdit?.UrlImagem) {
      setImagem({ uri: joiaEdit.UrlImagem });
    }
  }, [joiaEdit]);

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para escolher imagens.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagem({ uri: result.assets[0].uri });
    }
  }

  async function handleSubmit() {
    if (!nome || !preco || !quantidade) {
      Alert.alert('Erro', 'Nome, preço e quantidade são obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('Nome', nome);
    formData.append('Descricao', descricao);
    formData.append('Preco', parseFloat(preco).toString());
    formData.append('Quantidade', parseInt(quantidade, 10).toString());

    if (imagem && imagem.uri && !imagem.uri.startsWith('http')) {
      const filename = imagem.uri.split('/').pop() || 'photo.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append('imagem', {
        uri: imagem.uri,
        name: filename,
        type,
      } as any);
    }

    try {
      if (joiaEdit?.Id) {
        await api.put(`joia/${joiaEdit.Id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Sucesso', 'Joia atualizada.');
      } else {
        await api.post(`joia?usuarioId=1`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Sucesso', 'Joia cadastrada.');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar joia.');
      console.error(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* inputs e botões */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
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
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
});
