import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { StackNavigationOptions } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Ionicons'; // Importando os ícones
import { Logo } from "../components/Logo";
import { Colors } from "./constants";

export const TabsStyle: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: Colors.fundo,
  },
  headerTitle: () => <Logo />,
}

export const LoginStyle: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: Colors.fundo,
  },
  headerTitle: () => <Logo />,
  headerTintColor: Colors.textButton,
  headerTitleStyle: {
    backgroundColor: Colors.button,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 30,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}

export const CadastroStyle: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: Colors.fundo,
  },
  headerTitle: () => <Logo />,
  headerTintColor: Colors.textButton,
  headerTitleStyle: {
    backgroundColor: Colors.button,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 30,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}

export const UserViewStyle: BottomTabNavigationOptions = {
  headerTitle: () => <Logo />,
  headerShown: false,
  tabBarLabelStyle: {
    color: Colors.textButton,
  },
  tabBarIcon: ({ color, size }) => (
    <Icon name="person" color={Colors.textButton} size={size} />
  ),
}

export const DashboardStyle: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabelStyle: {
    color: Colors.textButton,
  },
  tabBarIcon: ({ color, size }) => (
    <Icon name="home" color={Colors.textButton} size={size} />
  ),
}