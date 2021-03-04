import 'react-native-gesture-handler';
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import firebaseConfig from "./src/api/firebaseConfig";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import LoadingScreen from "./src/screens/LoadingScreen";
import DashboardNavigator from "./src/middleware/DashboardNavigator";
import Account from "./src/screens/Account";

const Stack = createStackNavigator();


export default function App() {

  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(firebaseConfig());
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name={"Loading"}
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={"Dashboard"}
          component={DashboardNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Account"}
          component={Account}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
