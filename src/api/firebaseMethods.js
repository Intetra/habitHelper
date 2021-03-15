import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

//user authentication flow
export const registration = async (email, password, lastName, firstName) => {
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
};

export const signIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
};

export const loggingOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
};

//habit workflows
export const getHabits = async (today) => {
  try {
    let uid = await firebase.auth().currentUser.uid;
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
          console.log(habit.title + ": Completed Today");
        } else {
          const db = firebase.firestore();
          await db
            .collection("users")
            .doc(uid)
            .collection("habits")
            .doc(habit.uid)
            .update({
              completed: false,
            });
        }
      } else {
        if (habit.completedDate) {
          console.log(
            habit.title + ": last completed on " + habit.completedDate
          );
        } else {
          console.log(habit.title + ": never completed");
        }
      }
    });

    return habits;
  } catch (err) {
    Alert.alert("There is an error.", err.message);
  }
};

export const getUserInfo = async () => {
  try {
    let uid = await firebase.auth().currentUser.uid;
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

export const createHabit = async (title, details, date) => {
  try {
    if (title) {
      let uid = await firebase.auth().currentUser.uid;
      const db = await firebase.firestore();
      await db.collection("users").doc(uid).collection("habits").add({
        title,
        details,
        creationDate: date,
        completed: false,
      });
    } else {
      Alert.alert("Title is required!");
    }
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export const completeHabit = async (id, date) => {
  try {
    let uid = await firebase.auth().currentUser.uid;

    let db = await firebase.firestore();
    let habit = await db
      .collection("users")
      .doc(uid)
      .collection("habits")
      .doc(id)
      .get();
    let completed = await habit.data().completed;
    let completedDate = await habit.data().completedDate;
    let previousCompletedDate = await habit.data().previousCompletedDate;

    if (!completed) {
      //not completed
      if (!completedDate) {
        //never completed
        await db
          .collection("users")
          .doc(uid)
          .collection("habits")
          .doc(id)
          .update({
            completedDate: date,
            completed: true,
          });
      } else {
        //not completed
        //completed at least once before
        await db
          .collection("users")
          .doc(uid)
          .collection("habits")
          .doc(id)
          .update({
            previousCompletedDate: completedDate,
            completedDate: date,
            completed: true,
          });
      }
    } else {
      //is completed
      if (!previousCompletedDate) {
        //completed once
        //get the FieldValue object
        const FieldValue = await firebase.firestore.FieldValue;        
        await db
          .collection("users")
          .doc(uid)
          .collection("habits")
          .doc(id)
          .update({
            previousCompletedDate: FieldValue.delete(),
            completedDate: FieldValue.delete(),
            completed: false,
          });
      } else {
        //completed multiple times
        await db
          .collection("users")
          .doc(uid)
          .collection("habits")
          .doc(id)
          .update({
            completedDate: previousCompletedDate,
            completed: false,
          });
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export const updateHabit = async (id, title, details) => {
   try {
    if ((id, title)) {
      let uid = firebase.auth().currentUser.uid;
      const db = firebase.firestore();

      await db
        .collection("users")
        .doc(uid)
        .collection("habits")
        .doc(id)
        .update({
          title,
          details,
        });
    } else {
      Alert.alert("There is something wrong!");
    }
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export const deleteHabit = async (id) => {
  if (id) {
    try {
      let uid = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      await db
        .collection("users")
        .doc(uid)
        .collection("habits")
        .doc(id)
        .delete();
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  } else {
    Alert.alert("There is something wrong!");
  }
}
