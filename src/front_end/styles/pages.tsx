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
  headerLeft: () => null, // Isso remove o botão de voltar

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
  tabBarShowLabel: false,
  tabBarLabelStyle: {
    color: Colors.textButton,
  },
  tabBarActiveBackgroundColor: Colors.padraoBackGround,
  tabBarIcon: ({ color, size }) => (
    <Icon name="person" color={Colors.textButton} size={33} />
  ),
}

export const DashboardStyle: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarLabelStyle: {
    color: Colors.textButton,
  },
  tabBarActiveBackgroundColor: Colors.padraoBackGround,
  tabBarIcon: ({ color, size }) => (
    <Icon name="home" color={Colors.textButton} size={33} />
  ),
}

export const ProdutosStackStyle: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarLabelStyle: {
    color: Colors.textButton,
  },
  tabBarActiveBackgroundColor: Colors.padraoBackGround,
  tabBarIcon: () => (
    <Icon name="list" color={Colors.textButton} size={33} />
  ),
}

export const CalendarioStyleStackStyle: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarLabelStyle: {
    color: Colors.textButton,
  },
  tabBarActiveBackgroundColor: Colors.padraoBackGround,

  tabBarIcon: ({ color, size }) => (
    <Icon name="calendar" size={29} color={Colors.textButton} />
  )
}

export const CarrinhoStackStyle: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarLabelStyle: {
    color: Colors.textButton,
  },
  tabBarActiveBackgroundColor: Colors.padraoBackGround,

  tabBarIcon: () => (
    <Icon name="cart" size={33} color={Colors.textButton} />
  )
}

export const ClientesList: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarLabelStyle: {
    color: Colors.textButton,
  },
  tabBarActiveBackgroundColor: Colors.padraoBackGround,

  tabBarIcon: () => (
    <Icon name="people" size={33} color={Colors.textButton} />
  )
}

export const HistoricoStackStyle: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarLabelStyle: {
    color: Colors.textButton,
  },
  tabBarActiveBackgroundColor: Colors.padraoBackGround,

  tabBarIcon: () => (
    <Icon name="card" size={33} color={Colors.textButton} />
  )
}