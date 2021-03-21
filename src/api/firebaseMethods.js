import * as firebase from "firebase";
import "firebase/firestore";

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
    console.log("There is something wrong!", err.message);
  }
};

export const signIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log("There is something wrong!", err.message);
  }
};

export const loggingOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log("There is something wrong!", err.message);
  }
};

export const getUserInfo = async () => {
  try {
    let uid = firebase.auth().currentUser.uid;
    let doc = await firebase.firestore().collection("users").doc(uid).get();

    if (!doc.exists) {
      console.log("No user data found!");
    } else {
      return doc.data();
    }
  } catch (err) {
    console.log("There is an error.", err.message);
  }
};

//habit workflows
export const getHabits = async (
  today,
  setHabits,
  loading,
  setLoading,
  setCompletedHabits
) => {
  try {
    let uid = firebase.auth().currentUser.uid;
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits")
      .orderBy("order")
      .onSnapshot((querySnapshot) => {
        let habits = querySnapshot.docs.map((doc) =>
          Object.assign({ id: doc.id }, doc.data())
        )

        habits.forEach((habit) => {
          try {
            if (habit.completed) {
              if (habit.completedDate != today) {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(uid)
                  .collection("habits")
                  .doc(habit.id)
                  .update({
                    completed: false,
                  });
              }
            }
          } catch (err) {
            console.log("There is an error.", err.message);
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
    console.log("There is an error.", err.message);
  }
};

export const reorderHabits = async (habits) => {
  try {
    let uid = firebase.auth().currentUser.uid;
    habits.forEach(async(habit, index) => {
      await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("habits")
        .doc(habit.id)
        .update({
          order: index,
        });
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const createHabit = async (title, details, date) => {
  try {
    let uid = firebase.auth().currentUser.uid;
    const ref = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits")
      .get();

    const habits = ref.docs.map((doc) =>
      Object.assign({ id: doc.id }, doc.data())
    );
    let prevMax = 0;
    if (habits) {
      if (habits.length === 1) {
        prevMax = habits.length;
      } else {
        prevMax = habits.length + 1;
      }
    }

    if (title) {
      let uid = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      await db.collection("users").doc(uid).collection("habits").add({
        title,
        details,
        timesCompleted: 0,
        creationDate: date,
        completed: false,
        order: prevMax,
      });
    } else {
      console.log("Title is required!");
    }
  } catch (err) {
    console.log("There is something wrong!", err.message);
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
    console.log("There is something wrong!", err.message);
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
      console.log("There is something wrong!");
    }
  } catch (err) {
    console.log("There is something wrong!", err.message);
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
      console.log("There is something wrong!", err.message);
    }
  } else {
    console.log("There is something wrong!");
  }
};
