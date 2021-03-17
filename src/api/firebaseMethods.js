import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

//user authentication flow
export const registration = async (email, password, lastName, firstName) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    await db.collection("users").doc(currentUser.uid).set({
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

export const getUserInfo = async () => {
  try {
    let uid = firebase.auth().currentUser.uid;
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

//habit workflows
export const getHabits = (
  today,
  setHabits,
  loading,
  setLoading,
  setCompletedHabits
) => {
  try {
    let uid = firebase.auth().currentUser.uid;
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits");
    return ref.onSnapshot((querySnapshot) => {
      let habits = querySnapshot.docs.map((doc) =>
        Object.assign({ id: doc.id }, doc.data())
      );

      habits.forEach(async (habit) => {
        try {
          if (habit.completed) {
            //completed
            if (habit.completedDate === today) {
              //completed today, do nothing
              //console.log(habit.title + ": Completed Today");
            } else {
              //completed before today, switch "completed" to false
              await firebase
                .firestore()
                .collection("users")
                .doc(uid)
                .collection("habits")
                .doc(habit.id)
                .update({
                  completed: false,
                });
            }
          } else {
            //not completed
            if (habit.completedDate) {
              //has been completed before
              //console.log(
              //  habit.title + ": last completed on " + habit.completedDate
              //);
            } else {
              //has never been completed
              //console.log(habit.title + ": never completed");
            }
          }
        } catch (err) {
          Alert.alert("There is an error.", err.message);
        }
      });

      let list1 = [];
      let list2 = [];
      habits.forEach((habit) => {
        if (!habit.completed) {
          list1.push(habit);
        } else {
          list2.push(habit);
        }
      });

      setHabits(list1);
      setCompletedHabits(list2);

      if (loading) {
        setLoading(false);
      }
    });
  } catch (err) {
    Alert.alert("There is an error.", err.message);
  }
};

export const createHabit = async (title, details, date) => {
  try {
    if (title) {
      let uid = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      await db.collection("users").doc(uid).collection("habits").add({
        title,
        details,
        timesCompleted: 0,
        creationDate: date,
        completed: false,
      });
    } else {
      Alert.alert("Title is required!");
    }
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
};

export const completeHabit = async (id, date) => {
  try {
    let uid = firebase.auth().currentUser.uid;

    let db = firebase.firestore();
    let habit = await db
      .collection("users")
      .doc(uid)
      .collection("habits")
      .doc(id)
      .get();
    let completed = habit.data().completed;
    let completedDate = habit.data().completedDate;
    let previousCompletedDate = habit.data().previousCompletedDate;
    let timesCompleted = habit.data().timesCompleted;

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
            timesCompleted: timesCompleted + 1,
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
            timesCompleted: timesCompleted + 1,
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
            timesCompleted: timesCompleted - 1,
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
            timesCompleted: timesCompleted - 1,
            completedDate: previousCompletedDate,
            completed: false,
          });
      }
    }
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
};

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
};

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
};
