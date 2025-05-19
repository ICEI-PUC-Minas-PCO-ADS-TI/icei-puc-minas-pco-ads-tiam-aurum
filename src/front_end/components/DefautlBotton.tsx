import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


interface DefaultButtonProps {
  nome: string;
  cor: string;
  corTexto: string;
  onPress: () => void;
}

export const DefaultButton = ({ nome, cor, corTexto, onPress }: DefaultButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: cor }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: corTexto }]}>{nome}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})