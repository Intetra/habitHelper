import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from 'firebase'
import firebaseConfig from './firebaseConfig.js'


export default function App() {
  const fbConfig = firebaseConfig()

  // Initialize Firebase
  !firebase.apps.length ? firebase.initializeApp(fbConfig) : firebase.app();

  return (
    <View style={styles.container}>
      <Text>Habit Helper</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
