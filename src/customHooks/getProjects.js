import React, { useState } from 'react'
import {Alert} from 'react-native';
import * as firebase from 'firebase/app';

const getProjects = async () => {
  let [projects, setProjects] = useState([])
  let uid = firebase.auth().currentUser.uid;
  try {
    let doc = firebase
      .firestore()
      .collection(`/users/${uid}/projects`)
      .get()

      return doc.data

  } catch (err) {
    Alert.alert("There is an error.", err.message);
  }
}

export default getProjects
