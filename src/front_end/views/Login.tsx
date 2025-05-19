import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import * as Yup from 'yup';
import Alert from '../components/Alert';
import { DefaultButton } from '../components/DefautlBotton';
import { Colors } from '../styles/constants';

const validationSchema = Yup.object().shape({
  cpf: Yup.string().required('Campo obrigatório'),
  senha: Yup.string().required('Campo obrigatório'),
})

interface LoginProps {
  cpf: string;
  senha: string;
}

const Login = ({ navigation }: any) => {
  const [viewNotication, setViewNotification] = useState<boolean>(false);
  const handleCadastro = () => {
    navigation.navigate('Tabs');
  }
  const handleLogin = (values: LoginProps) => {
    console.log(values);
    setViewNotification(true);
    console.log(viewNotication);
    setTimeout(() => {
      setViewNotification(false);
      console.log(viewNotication);

    }, 4000);

  }

  return (
    <View style={styles.container}>
      <Alert viewMode={viewNotication} />
      <Formik
        validationSchema={validationSchema}
        initialValues={{ cpf: '', senha: '' }}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({
          values, errors, touched, handleChange, handleBlur, handleSubmit,
          isSubmitting, setFieldValue,
        }) => (
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
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
              <Text style={styles.labelContainer}>SENHA</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite sua senha"
                secureTextEntry={true}
                onChangeText={handleChange('senha')}
                value={values.senha}
              />
              {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
            </View>
            <View style={styles.buttonContainer}>
              <DefaultButton
                cor={Colors.button}
                corTexto={Colors.textButton}
                nome="Login"
                onPress={handleSubmit}
              />
              <DefaultButton
                cor={Colors.button}
                corTexto={Colors.textButton}
                nome="Cadastrar"
                onPress={handleCadastro}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.fundo,
    width: '100%',
  },
  headerContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
  textInput: {
    width: '65%',
    height: 40,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: Colors.textInfo,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
  },
  labelContainer: {
    fontSize: 15,
    marginTop: 20,
    width: '65%',
    color: Colors.textInfo,
  },
  error: {
    color: 'red'
  },
});



export default Login;