import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(email, password, lastName, firstName) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      lastName: lastName,
      firstName: firstName,
    });
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export const getHabits = async () => {
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

export const getUserInfo = async () => {
  let uid = firebase.auth().currentUser.uid;
  try {
    let doc = await firebase.firestore().collection("users").doc(uid).get();

    if (!doc.exists) {
      Alert.alert("No user data found!");
    } else {
      return doc.data();
    }
  } catch (err) {
    Alert.alert("There is an error.", err.message);
  }
};

export async function createHabit(title, details) {
  if (title) {
    try {
      let uid = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      db.collection("users")
        .doc(uid)
        .collection("habits")
        .add({
          title,
          details
        })
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  } else {
    Alert.alert("Title is required!");
  }
}
