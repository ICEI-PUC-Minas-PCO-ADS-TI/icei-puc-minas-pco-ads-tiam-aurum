import { Formik } from "formik";
import React from "react";
import { Button, Image, StyleSheet, TextInput, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import store from "../../store";
import { UsuarioState } from "../../store/slices/authSlice";
import { Colors } from "../../styles/constants"; // Certifique-se de ter esse arquivo


export const UserView = () => {
  const [photoUri, setPhotoUri] = React.useState<string | null>(null);
  const [usuario, setUsuario] = React.useState<UsuarioState | null>(store.getState().auth.usuario || null);

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
      <Formik
        initialValues={usuario || { nome: '', email: '', documento: '' }}
        onSubmit={(values) => {
          console.log('Dados do usuário:', values);
        }}
      >
        {({ }) => (
          <View style={styles.informacoesUsuario}>
            <TextInput value={usuario?.nome || ""}></TextInput>
            <TextInput value={usuario?.email || ""}></TextInput>
            <TextInput value={usuario?.documento || ""}></TextInput>
          </View>
        )}
      </Formik>
      <Button title="Abrir Câmera" onPress={openCamera} />
      <Button title="Selecionar da Galeria" onPress={openGallery} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.fundo,
    height: "100%"
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  informacoesUsuario: {
    width: "100%",
    justifyContent: 'flex-start',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    gap: 10,
  }
});
