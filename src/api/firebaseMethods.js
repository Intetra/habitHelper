import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

//user authentication flow
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

//habit workflows
export const getHabits = async (today) => {
  let uid = firebase.auth().currentUser.uid;
  try {
    let habits = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits")
      .get();

    habits = habits.docs.map((doc) =>
      Object.assign({ uid: doc.id }, doc.data())
    );

    await habits.forEach(async (habit) => {
      if (habit.completed) {
        if (habit.completedDate === today) {
          //do nothing
          console.log(habit.title + ': Completed Today')
        } else {
          const db = firebase.firestore()
          await db.collection("users").doc(uid).collection("habits").doc(habit.uid).update({
            completed: false,
          });
        }
      } else {
        if (habit.completedDate) {
          console.log(habit.title + ': last completed on ' + habit.completedDate)
        } else {
          console.log(habit.title + ': never completed')
        }
      }
    });

    return habits;
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

export async function createHabit(title, details, date) {
  if (title) {
    try {
      let uid = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      await db.collection("users").doc(uid).collection("habits").add({
        title,
        details,
        creationDate: date,
        completed: false,
      });
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  } else {
    Alert.alert("Title is required!");
  }
}

export async function completeHabit(id, date) {
  try {
    let uid = firebase.auth().currentUser.uid;

    const db = firebase.firestore();
    let habit = await db
      .collection("users")
      .doc(uid)
      .collection("habits")
      .doc(id)
      .get();
    let completed = await habit.data().completed;
    let completedDate = await habit.data().completedDate
    let previousCompletedDate = await habit.data().previousCompletedDate;

    if (!completed) {
      //not completed
      if (!completedDate) {
        //never completed
        await db.collection("users").doc(uid).collection("habits").doc(id).update({
          previousCompletedDate: null,
          completedDate: date,
          completed: !completed
        });
      } else {
        //complete again
        await db.collection("users").doc(uid).collection("habits").doc(id).update({
          previousCompletedDate: completedDate,
          completedDate: date,
          completed: !completed
        });
      }
    } else {
      if (!previousCompletedDate) {
        //completed once
        await db.collection("users").doc(uid).collection("habits").doc(id).update({
          previousCompletedDate: null,
          completedDate: null,
          completed: !completed
        });
      } else {
        //completed multiple times
        await db.collection("users").doc(uid).collection("habits").doc(id).update({
          previousCompletedDate: completedDate,
          completedDate: previousCompletedDate,
          completed: !completed
        });
      }
    }

  } catch {}
}

export async function updateHabit(id, title, details) {
  if ((id, title)) {
    try {
      let uid = firebase.auth().currentUser.uid;
      const db = firebase.firestore();

      await db.collection("users").doc(uid).collection("habits").doc(id).update({
        title,
        details,
      });
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  } else {
    Alert.alert("There is something wrong!");
  }
}

export async function deleteHabit(id) {
  if (id) {
    try {
      let uid = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      await db.collection("users").doc(uid).collection("habits").doc(id).delete();
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  } else {
    Alert.alert("There is something wrong!");
  }
}
