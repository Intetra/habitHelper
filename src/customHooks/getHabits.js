import React, { useState } from "react";
import { Alert } from "react-native";
import * as firebase from "firebase/app";

const getHabits = async () => {
  let uid = firebase.auth().currentUser.uid;
  try {
    let habits = await firebase
      .firestore()
      .collection(`/users/${uid}/habits`)
      .get();

    return habits.docs.map((doc) => Object.assign({ uid: doc.id }, doc.data()));
  } catch (err) {
    Alert.alert("There is an error.", err.message);
  }
};

export default getHabits;
