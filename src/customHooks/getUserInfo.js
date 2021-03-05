import React from 'react'
import {Alert} from 'react-native';
import * as firebase from 'firebase';

const getUserInfo = async (uid) => {
  console.log('inside getUserInfo')
  try {
    let doc = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();

    if (!doc.exists){
      Alert.alert('No user data found!')
    } else {
      let dataObj = doc.data();
      return dataObj
    }
  } catch (err){
  Alert.alert('There is an error.', err.message)
  }
}

export default getUserInfo
