import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface AlertProps {
  viewMode: boolean;
  type: string;
  text1: string;
  text2: string;
}

const Alert = ({ viewMode, type, text1, text2 }: AlertProps) => {
  const showToast = () => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: 'top',
      swipeable: true
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
