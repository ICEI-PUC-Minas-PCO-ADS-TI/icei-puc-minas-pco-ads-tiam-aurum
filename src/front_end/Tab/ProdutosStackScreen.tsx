import { createStackNavigator } from "@react-navigation/stack";
import CadastroJoia from "../views/Joias/CadastroJoia";
import Produtos from "../views/Joias/Produtos";

const ProdutosStack = createStackNavigator();

export function ProdutosStackScreen() {
  return (
    <ProdutosStack.Navigator initialRouteName="Produtos" screenOptions={{ headerShown: false }}>
      <ProdutosStack.Screen name={"Produtos"} component={Produtos} ></ProdutosStack.Screen>
      <ProdutosStack.Screen name={"CadastroJoias"} component={CadastroJoia} />
    </ProdutosStack.Navigator>
  )
}