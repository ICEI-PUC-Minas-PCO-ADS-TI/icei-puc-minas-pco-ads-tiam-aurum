import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CadastroStyle, LoginStyle, TabsStyle } from './styles/pages';
import Tabs from './Tab/Tabs';
import Login from './views/Login';
import Cadastro from './views/User/Cadastro';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={LoginStyle} name="Login" component={Login} />
        <Stack.Screen options={CadastroStyle} name="Cadastro" component={Cadastro} />
        <Stack.Screen options={TabsStyle} name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

