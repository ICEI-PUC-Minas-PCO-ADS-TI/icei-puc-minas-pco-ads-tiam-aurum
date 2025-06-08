import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MaskedTextInput } from "react-native-mask-text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Alert from "../../components/Alert";
import { DefaultButton } from "../../components/DefautlBotton";
import api from "../../services/api";
import store from "../../store";
import { setAuthentication, UsuarioState } from "../../store/slices/authSlice";
import { Colors } from "../../styles/constants";

const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  senha: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Campo obrigatório'),
});

export const UserView = ({ navigation }: any) => {
  const [photoUri, setPhotoUri] = React.useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioState | null>(store.getState().auth.usuario || null);
  const [viewMode, setViewMode] = useState<boolean>(false);
  const [viewNotifications, setViewNotifications] = useState<boolean>(false);
  const [messagemNotificaion, setMensagemNotification] = useState<string>("");
  const dispatch = useDispatch();
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

  const saveUserData = async (values: UsuarioState) => {
    try {
      const response = await api.put(`Usuario/Atualizar/`, values);
      console.log("Resposta da API:", response.data);
      statusResponse(response.status, response.data.message);
      dispatch(setAuthentication(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro na requisição:", error.response?.data);
        if (error.response?.status === 400) {
          statusResponse(error.response.status, error.response.data.message);
        }
      } else {
        console.log("Erro desconhecido:", error);
        statusResponse(500, "Erro desconhecido ao atualizar usuário");
      }
    }
  }

  const statusResponse = (status: number, message: string) => {
    if (status === 200) {
      handleNotification(true, message);
    } else {
      handleNotification(false, message);
    }
  }

  const handleNotification = (succes: boolean, message: string) => {
    if (succes) {
      setViewMode(false);
      setViewNotifications(true);
      setMensagemNotification(message);
      setTimeout(() => {
        setMensagemNotification("");
        setViewNotifications(false);
      }, 6000);
    }
  }

  const deslogger = () => {
    dispatch(setAuthentication(null))
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }


  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Alert text1="Alerta" text2={messagemNotificaion} type="info" viewMode={viewNotifications}></Alert>
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <View style={{ width: "22%", marginRight: 25 }}>
            <DefaultButton
              cor={Colors.button}
              corTexto={Colors.textButton}
              nome={"Sair"}
              onPress={() => deslogger()}
            />
          </View>
        </View>
        <Formik
          initialValues={usuario ? { ...usuario } : { nome: '', email: '', documento: '', telefone: '', senha: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            saveUserData(values);
          }}
        >
          {({
            values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm
          }) => (
            <View style={styles.informacoesUsuario}>
              <SafeAreaView style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../assets/usuario.jpeg")}
                />
              </SafeAreaView>
              <View style={{ gap: 10, width: "100%" }}>
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>NOME</Text>
                  <TextInput
                    style={!viewMode ? styles.inputDesativado : styles.inputAtivado}
                    placeholder="Nome"
                    onChangeText={handleChange('nome')}
                    onChange={(date) => setFieldValue('nome', date)}
                    value={values.nome ? values.nome : ""}
                    editable={viewMode}
                  />
                  {touched.nome && errors.nome && <Text style={styles.error}>{errors.nome}</Text>}
                </View>
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>EMAIL</Text>
                  <TextInput
                    style={!viewMode ? styles.inputDesativado : styles.inputAtivado}
                    value={values.email ? values.email : ""}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    editable={viewMode}
                  />
                  {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                </View>
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>SENHA</Text>
                  <TextInput
                    value={values.senha ? values.senha : ""}
                    style={!viewMode ? styles.inputDesativado : styles.inputAtivado}
                    placeholder="Senha"
                    editable={viewMode}
                    onChangeText={handleChange('senha')}
                    secureTextEntry={true}
                  />
                </View>
                {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>CPF</Text>
                  <MaskedTextInput
                    mask="999.999.999-99"
                    style={styles.inputDesativado}
                    placeholder="CPF"
                    keyboardType="numeric"
                    onChangeText={(text, rawText) => {
                      handleChange("cpf")(rawText);
                    }}
                    value={values.documento ? values.documento : ""}
                    editable={false}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                  {!viewMode && (
                    <DefaultButton
                      cor={Colors.button}
                      corTexto={Colors.textButton}
                      nome={"Editar"}
                      onPress={() => setViewMode(!viewMode)}
                    />
                  )}
                  {viewMode && (
                    <DefaultButton
                      cor={Colors.button}
                      corTexto={Colors.textButton}
                      nome={"Salvar"}
                      onPress={handleSubmit}
                    />
                  )}
                  {viewMode && (
                    <DefaultButton
                      cor={Colors.button}
                      corTexto={Colors.textButton}
                      nome={"Cancelar"}
                      onPress={() => {
                        setViewMode(!viewMode);
                        resetForm()
                      }}
                    />
                  )}

                </View>
              </View>
            </View>
          )
          }
        </Formik >
      </View>
      {/* <Button title="Abrir Câmera" onPress={openCamera} />
      <Button title="Selecionar da Galeria" onPress={openGallery} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />} */}
    </View >
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
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    gap: 10,
  },
  inputDesativado: {
    backgroundColor: "#e6f0ff",
    borderRadius: 10,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    width: '70%',
  },
  inputAtivado: {
    width: '70%',
    backgroundColor: "white",
    borderRadius: 10,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
  labelContainer: {
    fontSize: 20,
    marginTop: 2,
    width: '26%',
    color: Colors.textInfo,
    fontWeight: 'bold',
  },
  campoInputs: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  subContainer: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.padraoBackGround,
    height: "100%",
    gap: 10,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  }
});

const styles2 = StyleSheet.create({
  container: {
    width: "50%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.button,
    padding: 10,
    borderTopEndRadius: 160,
    borderTopStartRadius: 160,
    borderBottomRightRadius: 160,
    borderBottomLeftRadius: 160,
    height: 160,
  },
  stretch: {
    width: "70%",
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 100
  },
});
