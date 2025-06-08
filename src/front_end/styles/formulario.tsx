import { StyleSheet } from 'react-native';

const formularioStyle = StyleSheet.create({
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#D4AF37',
        marginVertical: 20,
        marginLeft: 20,
        marginBottom: 10,
    },
    label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '500',
    fontSize: 20,
    color: '#364B4B',
  },
    botao: {
        backgroundColor: '#293A3A',
        width: '60%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 'auto',
        marginTop: 20,
        marginBottom: 40,
    },
    textoBotao: {
        color: '#D4AF37',
        fontWeight: 'bold',
        fontSize: 18,
    },
    input: {
    backgroundColor: '#A3A3A3',
    color: '#F7E7CE',
    fontWeight: '400',
    fontSize: 16,
    borderRadius: 20,
    padding: 10,
    borderColor: '#999',
    borderWidth: 1,
  },
});

export default formularioStyle;