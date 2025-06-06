import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando os ícones
import { Colors } from "../../styles/constants";



export const Calendario = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 10 }}>
        <Text style={styles.titleCalendario}>Calendário</Text>
        <Icon name="person" color={Colors.textButton} size={30} onPress={() => navigation.navigate("Perfil")} />

      </View>
      <View style={styles.subContainer}>
        <View style={{ marginTop: 10, alignItems: "center", width: "100%" }}>
          <Calendar
            onDayPress={day => {
              console.log('selected day', day);
            }}
            style={{
              width: 300, shadowRadius: 10, elevation: 20, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5,
            }}
          />
        </View>
      </View>
    </View>
  )
}

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
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    flexDirection: "column"
  },
  titleCalendario: {
    color: Colors.textButton,
    fontSize: 30,
    width: "100%",
    fontWeight: "bold"
  }
})