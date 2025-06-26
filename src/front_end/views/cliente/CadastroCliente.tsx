import { Formik } from "formik";
import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import * as Yup from "yup";
import { DefaultButton } from "../../components/DefautlBotton";
import { Colors } from "../../styles/constants";


const initialValues = {
  nome: "",
  documento: "",
  email: "",
  cep: "",
  numero: "",
  longradouro: "",
  complemento: "",
  cidade: "",
  estado: "",
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
  return (
    <View style={{ flex: 1, backgroundColor: Colors.fundo }}>
      <View style={styles2.subContainer}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            // const foiSalvo: boolean | undefined = await handleCadastro(values);
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
                />
                {touched.documento && errors.documento && <Text style={styles.error}>{errors.documento}</Text>}
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite o e-mail do cliente"
                  onChangeText={handleChange("email")}
                  value={values.email}
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
                ></TextInput>
                <TextInput
                  style={styles.textInputEndereco}
                  placeholder="Número"
                  onChangeText={handleChange("numero")}
                  value={values.numero}
                ></TextInput>
                <TextInput
                  style={styles.textInputEndereco}
                  placeholder="Bairro "
                  onChangeText={handleChange("longradouro")}
                  value={values.longradouro}
                ></TextInput>
              </View>
              <View style={{ width: '100%', gap: 10, alignItems: 'center', justifyContent: "space-around" }}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Complemento"
                  onChangeText={handleChange("complemento")}
                  value={values.complemento}
                ></TextInput>
                <TextInput
                  style={styles.textInput}
                  placeholder="Cidade"
                  onChangeText={handleChange("cidade")}
                  value={values.cidade}
                ></TextInput>
                <TextInput
                  style={styles.textInput}
                  placeholder="Estado"
                  onChangeText={handleChange("Estado")}
                  value={values.estado}
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
    backgroundColor: Colors.fundoCard,
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
    backgroundColor: Colors.fundoCard,
    width: '30%',
    height: 40,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: Colors.defaultText,
  },
});