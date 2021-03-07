import React from 'react'
import {Alert} from 'react-native';
import * as firebase from 'firebase/app';

const getUserInfo = async () => {
  let uid = firebase.auth().currentUser.uid;
  try {
    let doc = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();

    if (!doc.exists){
      Alert.alert('No user data found!')
    } else {
      return doc.data();
    }
  } catch (err){
  Alert.alert('There is an error.', err.message)
  }
}

export default getUserInfo
