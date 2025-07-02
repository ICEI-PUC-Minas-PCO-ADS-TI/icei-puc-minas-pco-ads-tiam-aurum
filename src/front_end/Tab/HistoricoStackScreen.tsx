import { createStackNavigator } from '@react-navigation/stack';
import HistoricoPagamentos from '../views/Historico/HistoricoPagamentos';

const HistoricoStack = createStackNavigator();

export function HistoricoStackScreen() {
  return (
    <HistoricoStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoricoStack.Screen name="HistoricoPagamentos" component={HistoricoPagamentos} />
    </HistoricoStack.Navigator>
  );
}