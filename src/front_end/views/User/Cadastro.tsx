import { Formik } from "formik";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { MaskedTextInput } from "react-native-mask-text";
import * as Yup from "yup";
import { DefaultButton } from "../../components/DefautlBotton";
import { Colors } from "../../styles/constants";



const initialValues = {
  nome: "",
  cpf: "",
  senha: "",
  confirmarSenha: "",
  email: "",
  confirmaEmail: "",
}

const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .required("Nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  confirmaEmail: Yup.string()
    .email("E-mail inválido")
    .oneOf([Yup.ref("email"), null], "Os e-mails não coincidem")
    .required("Confirmação de e-mail é obrigatória"),
  senha: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref("senha"), null], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  cpf: Yup.string()
    .required("CPF é obrigatório"),
})

interface UsuarioProps {
  nome: string;
  cpf: string;
  senha: string;
  confirmarSenha: string;
  email: string;
  confirmaEmail: string;
}
const Cadastro = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values);
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
              <Text style={styles.title}>Cadastro</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.labelContainer}>Nome completo</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite seu nome completo"
                  onChangeText={handleChange("nome")}
                  value={values.nome}
                />
                {touched.nome && errors.email && <Text style={styles.error}>{errors.nome}</Text>}
                <Text style={styles.labelContainer}>CPF</Text>
                <MaskedTextInput
                  mask="999.999.999-99"
                  style={styles.textInput}
                  placeholder="CPF"
                  keyboardType="numeric"
                  onChangeText={(text, rawText) => {
                    handleChange("cpf")(rawText); // Use o valor sem máscara no Formik
                  }}
                  value={values.cpf}
                />
                {touched.cpf && errors.cpf && <Text style={styles.error}>{errors.cpf}</Text>}
                <Text style={styles.labelContainer}>E-mail</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite seu e-mail"
                  onChangeText={handleChange("email")}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                <Text style={styles.labelContainer}>Confirme o E-mail</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirme seu e-mail"
                  onChangeText={handleChange("confirmaEmail")}
                  value={values.confirmaEmail}
                />
                {touched.confirmaEmail && errors.confirmaEmail && <Text style={styles.error}>{errors.confirmaEmail}</Text>}
                <Text style={styles.labelContainer}>Senha</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite sua senha"
                  secureTextEntry={true}
                  onChangeText={handleChange("senha")}
                  value={values.senha}
                />
                {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
                <Text style={styles.labelContainer}>Confirme a senha</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirme sua senha"
                  secureTextEntry={true}
                  onChangeText={handleChange("confirmarSenha")}
                  value={values.confirmarSenha}
                />
                {touched.confirmarSenha && errors.confirmarSenha && <Text style={styles.error}>{errors.confirmarSenha}</Text>}
              </View>
              <DefaultButton onPress={handleSubmit} corTexto={Colors.textButton} cor={Colors.button} nome="Cadastrar" ></DefaultButton>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
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
});

export default Cadastro;