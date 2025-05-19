import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors } from "../../styles/constants"; // Certifique-se de ter esse arquivo


export const UserView = () => {
  const [photoUri, setPhotoUri] = React.useState<string | null>(null);

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo', // Defina o tipo de mídia como foto
        cameraType: 'back', // Tipo de câmera (traseira ou frontal)
        saveToPhotos: true, // Salvar a foto na galeria
        quality: 1, // Qualidade da imagem
      },
      (response) => {
        if (response.didCancel) {
          console.log('Usuário cancelou a captura da foto');
        } else if (response.errorCode) {
          console.log('Erro ao tirar foto: ', response.errorMessage);
        } else if (response.assets && response.assets[0]) {
          const source = response.assets[0].uri;
          setPhotoUri(source ?? null); // Defina o URI da foto capturada
        }
      }
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // Defina o tipo de mídia como foto
      },
      (response) => {
        if (response.didCancel) {
          console.log('Usuário cancelou a seleção da imagem');
        } else if (response.errorCode) {
          console.log('Erro ao selecionar imagem: ', response.errorMessage);
        } else if (response.assets && response.assets[0]) {
          const source = response.assets[0].uri;
          setPhotoUri(source ?? null); // Defina o URI da imagem selecionada
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Abrir Câmera" onPress={openCamera} />
      <Button title="Selecionar da Galeria" onPress={openGallery} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Garante que o container ocupe toda a tela
    justifyContent: 'center', // Centraliza o conteúdo na tela
    alignItems: 'center', // Alinha os itens ao centro
    backgroundColor: Colors.fundo, // Cor de fundo (ajustar de acordo com a sua variável)
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
