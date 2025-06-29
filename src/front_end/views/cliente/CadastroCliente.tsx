import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import * as Yup from "yup";
import Alert from "../../components/Alert";
import { DefaultButton } from "../../components/DefautlBotton";
import { ClienteDTO } from "../../interfaces/interfaces";
import api from "../../services/api";
import store from "../../store";
import { UsuarioState } from "../../store/slices/authSlice";
import { Colors } from "../../styles/constants";


const initialValues = {
  nome: "",
  documento: "",
  email: "",
  cep: "",
  numero: "",
  logradouro: "",
  complemento: "",
  cidade: "",
  estado: "",
  bairro: "",
}

const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .required("Nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  documento: Yup.string()
    .required("CPF é obrigatório"),
})
export const CadastroCliente = ({ navigation }: any) => {
  const [usuario, setUsuario] = useState<UsuarioState | null>(store.getState().auth.usuario || null);
  const [notification, setNotification] = useState<string>("");
  const [viewNotification, setViewNotification] = useState<boolean>(false);
  const [typeNotification, setTypeNotification] = useState<string>("");
  const [messageNotification, setMessageNotification] = useState<string>("");


  const handleCadastroCliente = async (values: ClienteDTO) => {
    values.idUsuario = usuario?.id || null;
    try {
      const response = await api.post<ClienteDTO>("/Clientes", values);
      if (response.status === 201) {
        console.log("Cliente cadastrado com sucesso:", response.data);
        showNotification("Sucesso", "Cliente cadastrado com sucesso!", "success", true);
        return true;
      }
      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro ao cadastrar cliente:", error.response?.data);
        if (error.response?.status === 400) {
          showNotification("Erro", error.response.data?.errors?.Documento[0], "error", true);
        }
        return false;
      }
    }
  }

  const showNotification = (text1: string, text2: string, type: string, viewMode: boolean) => {
    setNotification(text1);
    setMessageNotification(text2);
    setTypeNotification(type);
    setViewNotification(viewMode);
    setTimeout(() => {
      setViewNotification(false);
      setNotification("");
      setMessageNotification("");
      setTypeNotification("");
      navigation.navigate("ClienteList");
    }, 3000);
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.fundo }}>
      <Alert text1={notification} text2={messageNotification} type={typeNotification} viewMode={viewNotification}></Alert>
      <View style={styles2.subContainer}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            const foiSalvo = await handleCadastroCliente(values);
            // if (foiSalvo !== undefined && foiSalvo) {
            //   resetForm();
            // }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <View style={styles.headerContainer}>
              <Text style={styles2.textTitlePage}>Novo  Cliente</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite o nome completo do cliente"
                  onChangeText={handleChange("nome")}
                  value={values.nome}
                  placeholderTextColor="#5e5e5e"
                />
                {touched.nome && errors.email && <Text style={styles.error}>{errors.nome}</Text>}
                <MaskedTextInput
                  mask="999.999.999-99"
                  style={styles.textInput}
                  placeholder="CPF"
                  keyboardType="numeric"
                  onChangeText={(text, rawText) => {
                    handleChange("documento")(rawText);
                  }}
                  value={values.documento}
                  placeholderTextColor="#5e5e5e"
                />
                {touched.documento && errors.documento && <Text style={styles.error}>{errors.documento}</Text>}
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite o e-mail do cliente"
                  onChangeText={handleChange("email")}
                  value={values.email}
                  placeholderTextColor="#5e5e5e"
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
              </View>
              <Text style={styles2.textTitlePage}>Endereço</Text>
              <View style={{ width: '100%', flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: "space-around" }}>
                <TextInput
                  style={styles.textInputEndereco}
                  placeholder="CEP"
                  onChangeText={handleChange("cep")}
                  value={values.cep}
                  placeholderTextColor="#5e5e5e"
                ></TextInput>
                <TextInput
                  style={styles.textInputEndereco}
                  placeholder="Número"
                  onChangeText={handleChange("numero")}
                  value={values.numero}
                  placeholderTextColor="#5e5e5e"
                ></TextInput>
                <TextInput
                  style={styles.textInputEndereco}
                  placeholder="Bairro "
                  onChangeText={handleChange("bairro")}
                  value={values.bairro}
                  placeholderTextColor="#5e5e5e"
                ></TextInput>
              </View>
              <View style={{ width: '100%', gap: 10, alignItems: 'center', justifyContent: "space-around" }}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Complemento"
                  onChangeText={handleChange("complemento")}
                  value={values.complemento}
                  placeholderTextColor="#5e5e5e"
                ></TextInput>
                <TextInput
                  style={styles.textInput}
                  placeholder="Cidade"
                  onChangeText={handleChange("cidade")}
                  value={values.cidade}
                  placeholderTextColor="#5e5e5e"

                ></TextInput>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite o Estado"
                  onChangeText={handleChange("estado")}
                  value={values.estado}
                  placeholderTextColor="#5e5e5e"
                ></TextInput>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite o Logradouro"
                  onChangeText={handleChange("logradouro")}
                  value={values.logradouro}
                  placeholderTextColor="#5e5e5e"
                ></TextInput>
              </View>

              <DefaultButton onPress={handleSubmit} corTexto={Colors.textButton} cor={Colors.button} nome="Cadastrar" ></DefaultButton>
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  subContainer: {
    height: "100%",
    backgroundColor: Colors.padraoBackGround,
    marginTop: 10,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    padding: 20,
  },
  textTitlePage: {
    color: Colors.textButton,
    fontSize: 30,
    width: "100%",
    fontWeight: "bold",
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.fundo,
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    marginBottom: 50
  },
  title: {
    fontSize: 40,
    color: Colors.textInfo,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    textAlign: 'left',
  },
  labelContainer: {
    fontSize: 15,
    color: Colors.textInfo,
    marginTop: 20,
    width: '100%',
  },
  textInput: {
    backgroundColor: Colors.textInfo,
    width: '100%',
    height: 40,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: Colors.defaultText,

  },
  error: {
    color: 'red'
  },
  textInputEndereco: {
    backgroundColor: Colors.textInfo,
    width: '30%',
    height: 40,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: Colors.defaultText,
  },
});