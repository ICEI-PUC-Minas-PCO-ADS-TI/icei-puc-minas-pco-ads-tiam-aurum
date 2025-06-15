import axios from "axios";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from 'yup';
import DateInput from "../../components/DateInput";
import { DefaultButton } from "../../components/DefautlBotton";
import FormikWrapper from "../../components/FormikWrapper";
import { ICriacaoTarefa } from "../../interfaces/interfaces";
import api from "../../services/api";
import store from "../../store";
import { Colors } from "../../styles/constants";



const initialValues = {
  descricao: null,
  dataRealizar: ""
}
const validationSchema = Yup.object().shape({
  descricao: Yup.string().required('Campo obrigatório'),
  dataRealizar: Yup.string().required('Campo obrigatório'),
})

export const CadastroTarefa = ({ navigation }): any => {
  const [dataRealizar, setData] = useState(new Date());
  const [descricao, setDescricao] = useState<string>("");
  const [dataRealziar, setDataRealizar] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (descricao != "" && dataRealizar != null) {
      cadastrarTarefa({ descricao: descricao, dataRealizar: dataRealizar.toISOString() })
    }
  };

  const cadastrarTarefa = async (values: ICriacaoTarefa) => {
    const idUsuario: number | null | undefined = store.getState().auth.usuario?.id;
    const newTarefa: ICriacaoTarefa = {
      dataRealizar: values.dataRealizar,
      descricao: values.descricao,
      usuarioId: idUsuario,
      DataCriado: new Date().toISOString()
    }
    try {
      const response = await api.post("Tarefa/cadastro", newTarefa)
      console.log(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 10 }}>
        <Text style={styles.titleCalendario}>Cadastro Tarefa</Text>
      </View>
      <View style={styles.subContainer}>
        <FormikWrapper
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values }) => (
            <View style={{ width: "80%", marginTop: 10 }}>
              <Text style={styles.labelContainer}>Descrição</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Escreva"
                multiline
                onChangeText={setDescricao}
              />
              <DateInput
                value={dataRealizar}
                onChange={setData}
                label="Data a realizar"
                style={styles.labelContainer}
              />
              <DefaultButton
                cor={Colors.button}
                corTexto={Colors.textButton}
                nome="Adicionar"
                onPress={handleSubmit}
                key={"id"}
              ></DefaultButton>
            </View>
          )}
        </FormikWrapper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.fundo,
    height: "100%",
  },
  subContainer: {
    marginTop: 20,
    backgroundColor: Colors.padraoBackGround,
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    flexDirection: "column"
  },
  titleCalendario: {
    color: Colors.textButton,
    fontSize: 30,
    width: "100%",
    fontWeight: "bold"
  },
  textInput: {
    width: '100%',
    backgroundColor: "white",
    borderRadius: 10,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  labelContainer: {
    fontSize: 20,
    color: Colors.textInfo,
    marginTop: 20,
    width: '100%',
    fontWeight: "bold"
  },
})