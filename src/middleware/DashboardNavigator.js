import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../screens/Account'
import Dashboard from '../screens/Dashboard'

export default function DashboardNavigator() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({});
