import { createStackNavigator } from "@react-navigation/stack";
import { Calendario } from "../views/Calendario/Calendario";
import { CadastroTarefa } from "../views/Tarefa/CadastroTarefa";

const ProdutosStack = createStackNavigator();

export function TarefaStackScreen() {
  return (
    <ProdutosStack.Navigator initialRouteName="Calendario" screenOptions={{ headerShown: false }}>
      <ProdutosStack.Screen name={"Calendario"} component={Calendario} ></ProdutosStack.Screen>
      <ProdutosStack.Screen name={"CadastroTarefa"} component={CadastroTarefa} />
    </ProdutosStack.Navigator>
  )
}