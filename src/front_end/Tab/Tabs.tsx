import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../styles/constants";
import { CalendarioStyleStackStyle, CarrinhoStackStyle, DashboardStyle, ProdutosStackStyle, UserViewStyle } from "../styles/pages";
import Dashboard from "../views/Dashboard/Dashboard";
import { UserView } from "../views/User/UserView";
import { CarrinhoStackScreen } from "./CarrinhoStackScreen";
import { ProdutosStackScreen } from "./ProdutosStackScreen";
import { TarefaStackScreen } from "./TarefaStackScreen";

const Tab = createBottomTabNavigator();


export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.button,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginBottom: 5,
        },
        tabBarActiveTintColor: Colors.padraoBackGround,
        tabBarInactiveTintColor: Colors.defaultText,
      }}
    >
      <Tab.Screen
        name="DashboardStack"
        component={DashboadStackScreen}
        options={DrodutosStackStyle}
      />
      <Tab.Screen
        name="Perfil"
        component={UserView}
        options={UserViewStyle}
      />
      <Tab.Screen
        name={"CalendarioStack"}
        component={TarefaStackScreen}
        options={CalendarioStyleStackStyle}
      ></Tab.Screen>
      <Tab.Screen name="ProdutosStack" component={ProdutosStackScreen} options={ProdutosStackStyle} />
      <Tab.Screen name="CarrinhoStack" component={CarrinhoStackScreen} options={CarrinhoStackStyle} />
    </Tab.Navigator>
  )
}