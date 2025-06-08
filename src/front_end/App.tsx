import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import store from './store';
import { CadastroStyle, LoginStyle, TabsStyle } from './styles/pages';
import Tabs from './Tab/Tabs';
import Login from './views/Login';
import Cadastro from './views/User/Cadastro';
import { CarrinhoProvider } from './store/CarrinhoContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <CarrinhoProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen options={LoginStyle} name="Login" component={Login} />
            <Stack.Screen options={CadastroStyle} name="Cadastro" component={Cadastro} />
            <Stack.Screen options={TabsStyle} name="Tabs" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </CarrinhoProvider>
    </Provider>
  );
}

