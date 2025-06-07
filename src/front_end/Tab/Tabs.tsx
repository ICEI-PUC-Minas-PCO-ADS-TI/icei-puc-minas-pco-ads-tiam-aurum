import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../styles/constants";
import { CalendarioStyle, DashboardStyle, ProdutosStyle, UserViewStyle } from "../styles/pages";
import { Calendario } from "../views/Calendario/Calendario";
import Dashboard from "../views/Dashboard/Dashboard";
import Produtos from "../views/Joias/Produtos";
import { UserView } from "../views/User/UserView";

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
        name="Dashboard"
        component={Dashboard}
        options={DashboardStyle}
      />
      <Tab.Screen
        name="Perfil"
        component={UserView}
        options={UserViewStyle}
      />
      <Tab.Screen
        name="Produtos"
        component={Produtos}
        options={ProdutosStyle}
      />
      <Tab.Screen
        name={"Calendario"}
        component={Calendario}
        options={CalendarioStyle}
      ></Tab.Screen>
    </Tab.Navigator>
  )
}