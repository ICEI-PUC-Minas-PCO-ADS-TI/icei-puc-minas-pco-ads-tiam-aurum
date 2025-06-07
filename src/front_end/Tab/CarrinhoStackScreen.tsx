import { createStackNavigator } from "@react-navigation/stack";
import Carrinho from "../views/Carrinho/Carrinho";
import FinalizarCompra from "../views/Carrinho/FinalizarCompra";

const CarrinhoStack = createStackNavigator();

export function CarrinhoStackScreen() {
  return (
    <CarrinhoStack.Navigator initialRouteName="Carrinho" screenOptions={{ headerShown: false }}>
      <CarrinhoStack.Screen name={"Carrinho"} component={Carrinho} ></CarrinhoStack.Screen>
      <CarrinhoStack.Screen name={"FinalizarCompra"} component={FinalizarCompra} ></CarrinhoStack.Screen>
    </CarrinhoStack.Navigator>
  )
}