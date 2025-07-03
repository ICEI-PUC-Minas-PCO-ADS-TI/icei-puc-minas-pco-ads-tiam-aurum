import axios from "axios";
import { Formik } from "formik";
import React, { useState, } from "react";
import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Alert from "../../components/Alert";
import { DefaultButton } from "../../components/DefautlBotton";
import { ClienteDTO } from "../../interfaces/interfaces";
import api from "../../services/api";
import { UsuarioState } from "../../store/slices/authSlice";
import { Colors } from "../../styles/constants";



const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório'),
  documento: Yup.string().required('Campo obrigatório'),
  cidade: Yup.string().required('Campo obrigatório'),
  estado: Yup.string().required('Campo obrigatório'),
});

export const ClienteView = ({ route, navigation }: any) => {
  const [clienteView, setClienteView] = useState<ClienteDTO | null>(route.params.cliente || null);
  const [viewMode, setViewMode] = useState<boolean>(false);
  const [viewNotifications, setViewNotifications] = useState<boolean>(false);
  const [messagemNotificaion, setMensagemNotification] = useState<string>("");
  const [modalVisivelExcluir, setModalVisivelExcluir] = useState<boolean>(false);
  const dispatch = useDispatch();

  const saveUserData = async (values: UsuarioState) => {
    try {
      const response = await api.put(`Clientes/${values.id}`, values);
      console.log("Resposta da API:", response.status);
      if (response.status === 204) {
        statusResponse(200, "Usuário atualizado com sucesso");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro na requisição:", error.response?.data);
        if (error.response?.status === 400) {
          console.log(`Erro: ${error.response.data.status}`, error.response.data.errors.Documento[0]);
          statusResponse(error.response.data.status, error.response.data.errors.Documento[0]);
        }
      } else {
        console.log("Erro desconhecido:", error);
        statusResponse(500, "Erro desconhecido ao atualizar usuário");
      }
    }
  }

  const statusResponse = (status: number, message: string) => {
    if (status === 204 || status === 200) {
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
    } else {
      setViewMode(true);
      setViewNotifications(true);
      setMensagemNotification(message);
      setTimeout(() => {
        setMensagemNotification("");
        setViewNotifications(false);
      }, 6000);
    }
  }

  const excluirCliente = async (id: number | null) => {
    try {
      const response = await api.delete(`/Clientes/${id}`);
      if (response.status === 204) {
        alert("Cliente excluído com sucesso");
        console.log("Cliente excluído com sucesso", id);
        navigation.navigate('ClienteList');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro ao excluir cliente:", error.response?.data);
        if (error.response?.status === 400) {
          console.log(error.response.data);
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Alert text1="Alerta" text2={messagemNotificaion} type="info" viewMode={viewNotifications}></Alert>
        {modalVisivelExcluir && (
          <Modal
            visible={modalVisivelExcluir}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisivelExcluir(false)}
          >
            <TouchableWithoutFeedback onPress={() => {
              setModalVisivelExcluir(false);
              Keyboard.dismiss();
            }}>
              <View style={stylesModal.modalCard}>
                <TouchableWithoutFeedback onPress={() => { }}>
                  <View style={stylesModal.modalConteudo}>
                    <Text style={stylesModal.modalTitulo}>Informação</Text>
                    <Text style={stylesModal.modalSubtitulo}>Você Realmente deseja excluir o cliente</Text>
                    <Text style={{ fontWeight: "bold", color: Colors.fundo, backgroundColor: Colors.padraoBackGround, marginBottom: 10 }}>{clienteView?.nome}</Text>
                    <TouchableOpacity style={stylesModal.modalExcluir} onPress={() => excluirCliente(clienteView?.id || null)}>
                      <Text style={stylesModal.modalBotaoTexto}>Excluir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[stylesModal.modalBotao, { backgroundColor: '#ccc', marginTop: 10 }]}
                      onPress={() => {
                        setModalVisivelExcluir(false);
                      }}
                    >
                      <Text style={[stylesModal.modalBotaoTexto, { color: '#333' }]}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <View style={{ width: "32%", marginRight: 40, marginTop: 10 }}>
            <DefaultButton
              cor={Colors.red}
              corTexto={Colors.textButton}
              nome={"Excluir"}
              onPress={() => setModalVisivelExcluir(true)}
            />
          </View>
        </View>
        <Formik
          initialValues={clienteView ? { ...clienteView } : { nome: '', documento: '', telefone: '', cidade: "", complemento: "", estado: "", numero: "", bairro: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            saveUserData(values);
          }}
        >
          {({
            values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm
          }) => (
            <View style={styles.informacoesUsuario}>
              <View>
                <Text style={styles.textTitlePage}>Cliente</Text>
              </View>
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
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>Telefone</Text>
                  <MaskedTextInput
                    mask="(99) 99999-9999"
                    style={!viewMode ? styles.inputDesativado : styles.inputAtivado}
                    placeholder="Telefone"
                    keyboardType="numeric"
                    onChangeText={(text, rawText) => setFieldValue("telefone", rawText)}
                    value={values.telefone ? values.telefone : ""}
                    editable={viewMode}
                  />
                  {touched.telefone && errors.telefone && <Text style={styles.error}>{errors.telefone}</Text>}
                </View>
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>Cidade</Text>
                  <TextInput
                    style={!viewMode ? styles.inputDesativado : styles.inputAtivado}
                    placeholder="Cidade"
                    onChangeText={handleChange('cidade')}
                    onChange={(date) => setFieldValue('cidade', date)}
                    value={values.cidade ? values.cidade : ""}
                    editable={viewMode}
                  />
                  {touched.cidade && errors.cidade && <Text style={styles.error}>{errors.cidade}</Text>}
                </View>
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>Bairro</Text>
                  <TextInput
                    style={!viewMode ? styles.inputDesativado : styles.inputAtivado}
                    placeholder="Bairro"
                    onChangeText={handleChange('bairro')}
                    onChange={(date) => setFieldValue('bairro', date)}
                    value={values.bairro ? values.bairro : ""}
                    editable={viewMode}
                  />
                  {touched.bairro && errors.bairro && <Text style={styles.error}>{errors.bairro}</Text>}
                </View>
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>Numero</Text>
                  <TextInput
                    style={!viewMode ? styles.inputDesativado : styles.inputAtivado}
                    placeholder="Numero"
                    onChangeText={handleChange('numero')}
                    onChange={(date) => setFieldValue('numero', date)}
                    value={values.numero ? values.numero : ""}
                    editable={viewMode}
                  />
                  {touched.numero && errors.numero && <Text style={styles.error}>{errors.numero}</Text>}
                </View>
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>Complemento</Text>
                  <TextInput
                    style={!viewMode ? styles.inputDesativado : styles.inputAtivado}
                    placeholder="Complemento"
                    onChangeText={handleChange('complemento')}
                    onChange={(date) => setFieldValue('complemento', date)}
                    value={values.complemento ? values.complemento : ""}
                    editable={viewMode}
                  />
                  {touched.complemento && errors.complemento && <Text style={styles.error}>{errors.complemento}</Text>}
                </View>
                <View style={styles.campoInputs}>
                  <Text style={styles.labelContainer}>Estado</Text>
                  <TextInput
                    style={!viewMode ? styles.inputDesativado : styles.inputAtivado}
                    placeholder="Complemento"
                    onChangeText={handleChange('estado')}
                    onChange={(date) => setFieldValue('estado', date)}
                    value={values.estado ? values.estado : ""}
                    editable={viewMode}
                  />
                  {touched.estado && errors.estado && <Text style={styles.error}>{errors.estado}</Text>}
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
    alignItems: 'center',
    backgroundColor: Colors.padraoBackGround,
    height: "100%",
    gap: 10,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  }, textTitlePage: {
    color: Colors.fundo,
    fontSize: 30,
    width: "50%",
    fontWeight: "bold"
  },

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

const stylesModal = StyleSheet.create({
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
  modalExcluir: {
    backgroundColor: Colors.red,
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