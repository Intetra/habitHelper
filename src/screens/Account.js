import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {loggingOut} from '../api/firebaseMethods';
import getUserInfo from '../customHooks/getUserInfo'

export default function Account({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;

  const handlePress = () => {
    loggingOut();
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Account</Text>
      <Text style={styles.text}>Hi!</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    padding: 5,
    backgroundColor: '#ff9999',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#3FC5AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    marginTop: '2%',
    marginBottom: '10%',
    fontWeight: 'bold',
    color: 'black',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E6194',
  },
});
