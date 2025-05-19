import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

export const Logo = () => {
  return (
    <ImageBackground
      source={require('../image/aurum.png')}
      style={styles.headerImage}
      resizeMode="contain"
    ></ImageBackground>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    width: 100,
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }
});
