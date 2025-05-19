import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../styles/constants";
import { DashboardStyle, UserViewStyle } from "../styles/pages";
import Dashboard from "../views/Dashboard/Dashboard";
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
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={DashboardStyle}
      />
      <Tab.Screen
        name="UserView"
        component={UserView}
        options={UserViewStyle}
      />
    </Tab.Navigator>
  )
}