import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface Props {
  visivel: boolean;
  fechar: () => void;
  quantidadeAtual: number;
  estoque: number;
  onConfirmar: (novaQuantidade: number) => void;
}

export default function ModalEditarQuantidade({
  visivel,
  fechar,
  quantidadeAtual,
  estoque,
  onConfirmar
}: Props) {
  const [novaQuantidade, setNovaQuantidade] = useState(quantidadeAtual.toString());

  function confirmarAlteracao() {
    const valor = parseInt(novaQuantidade);

    if (isNaN(valor) || valor < 1) {
      Alert.alert('Quantidade inválida', 'A quantidade deve ser maior ou igual a 1.');
      return;
    }

    if (valor > estoque) {
      Alert.alert('Estoque insuficiente', `Máximo disponível: ${estoque}`);
      return;
    }

    onConfirmar(valor);
    fechar();
  }

  return (
    <Modal visible={visivel} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>Editar Quantidade</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={novaQuantidade}
            onChangeText={setNovaQuantidade}
          />
          <View style={styles.botoes}>
            <TouchableOpacity style={styles.btn} onPress={confirmarAlteracao}>
              <Text style={styles.btnTexto}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnCancelar]} onPress={fechar}>
              <Text style={styles.btnTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    width: '85%',
    maxWidth: 300,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    marginBottom: 10,
    color: '#364B4B',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    flex: 1,
    backgroundColor: '#364B4B',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCancelar: {
    backgroundColor: '#ccc',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
