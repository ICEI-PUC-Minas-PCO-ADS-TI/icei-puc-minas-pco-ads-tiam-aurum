import { createStackNavigator } from "@react-navigation/stack";
import {HistoricoPagamentos }from "../views/Pagamentos/HistoricoPagamentos";
import Dashboard from "../views/Dashboard/Dashboard";

const DashboardStack= createStackNavigator();

export function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name={"Dashboard"} component={Dashboard} ></DashboardStack.Screen>
      <DashboardStack.Screen name={"HistoricoPagamentos"} component={HistoricoPagamentos} />
    </DashboardStack.Navigator>
  )
}