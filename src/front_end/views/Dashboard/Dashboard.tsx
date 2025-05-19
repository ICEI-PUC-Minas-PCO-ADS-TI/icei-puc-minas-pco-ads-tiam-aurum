import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../styles/constants";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
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
})



export default Dashboard;