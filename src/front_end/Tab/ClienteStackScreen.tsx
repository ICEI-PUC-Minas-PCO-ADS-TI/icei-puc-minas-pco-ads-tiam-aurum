import { createStackNavigator } from "@react-navigation/stack";
import { CadastroCliente } from "../views/cliente/CadastroCliente";
import ClienteList from "../views/cliente/ClienteList";
import { ClienteView } from "../views/cliente/ClienteView";

const ClienteStack = createStackNavigator();

export function ClienteStackScreen() {
  return (
    <ClienteStack.Navigator initialRouteName="ClienteList" screenOptions={{ headerShown: false }}>
      <ClienteStack.Screen name={"ClienteList"} component={ClienteList} ></ClienteStack.Screen>
      <ClienteStack.Screen name={"ClienteNew"} component={CadastroCliente} />
      <ClienteStack.Screen name={"ClienteView"} component={ClienteView} />
    </ClienteStack.Navigator>
  )
}