import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface AlertProps {
  viewMode: boolean;
}

const Alert = ({ viewMode }: AlertProps) => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Notificação de Sucesso!',
      text2: 'A operação foi concluída com sucesso.',
      position: 'top',
    });
  };
  useEffect(() => {
    if (viewMode) {
      showToast();
    }
  }, [viewMode]);

  return (
    <View style={styles.container}>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, // Distância do topo
    left: 0,
    right: 0,
    zIndex: 1000, // Assegura
  },
});

export default Alert;
