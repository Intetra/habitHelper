import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "../screens/Account";
import Dashboard from "../screens/Dashboard";
import { MaterialIcons } from '@expo/vector-icons';

export default function DashboardNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused
              ? "dashboard-customize"
              : "dashboard";
          } else if (route.name === "Account") {
            iconName = focused ? "account-circle" : "account-box";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
      labelPosition={'below-icon'}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
