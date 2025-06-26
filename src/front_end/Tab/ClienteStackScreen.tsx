import { createStackNavigator } from "@react-navigation/stack";
import { CadastroCliente } from "../views/cliente/CadastroCliente";
import ClienteList from "../views/cliente/ClienteList";

const ClienteStack = createStackNavigator();

export function ClienteStackScreen() {
  return (
    <ClienteStack.Navigator initialRouteName="ClienteList" screenOptions={{ headerShown: false }}>
      <ClienteStack.Screen name={"ClienteList"} component={ClienteList} ></ClienteStack.Screen>
      <ClienteStack.Screen name={"ClienteNew"} component={CadastroCliente} />
    </ClienteStack.Navigator>
  )
}