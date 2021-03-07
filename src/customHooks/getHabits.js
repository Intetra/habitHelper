import React, { useState } from "react";
import { Alert } from "react-native";
import * as firebase from "firebase/app";



//fetch habits from firestore
const getHabits = () => {

  //declare habits state
  const [habits, setHabits] = useState([]);

  //fetch an array of habits or throw an error
  const fetch = async () => {
    let uid = firebase.auth().currentUser.uid;
    try {
      let h = await firebase.firestore().collection(`/users/${uid}/habits`).get();

      return h.docs.map((doc) => Object.assign({ uid: doc.id }, doc.data()));
    } catch (err) {
      Alert.alert("There is an error.", err.message);
    }
  };

  //handlers to update habits state with results of fetch
  const updateHabits = async () => {
    setHabits(await fetch());
  };

  //call handler
  updateHabits();
  //return array
  return habits
}

export default getHabits
