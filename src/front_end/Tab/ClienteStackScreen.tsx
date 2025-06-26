import { createStackNavigator } from "@react-navigation/stack";
import ClienteList from "../views/cliente/ClienteList";
import CadastroJoia from "../views/Joias/CadastroJoia";

const ClienteStack = createStackNavigator();

export function ClienteStackScreen() {
  return (
    <ClienteStack.Navigator initialRouteName="ClienteList" screenOptions={{ headerShown: false }}>
      <ClienteStack.Screen name={"ClienteList"} component={ClienteList} ></ClienteStack.Screen>
      <ClienteStack.Screen name={"ClienteEdit"} component={CadastroJoia} />
    </ClienteStack.Navigator>
  )
}