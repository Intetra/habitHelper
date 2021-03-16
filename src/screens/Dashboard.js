import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase/app";
import Habit from "../components/Habit";
import { getHabits } from "../api/firebaseMethods";
import CreationModal from "./habitCRUD/CreationModal";

export default function Dashboard() {
  //initialize state variables
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const day = new Date().getDate(); //Current Day
  const month = new Date().getMonth() + 1; //Current Month
  const year = new Date().getFullYear(); //Current Year
  const date = month + "/" + day + "/" + year;

  //fetch habits and store in state
  useEffect(() => {
    getHabits(date, setHabits, loading, setLoading);
  }, [loading]);

  //modal display switch
  const updateModalVisible = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  //uncompleted flatlist renderItem handler
  const renderHabit = (habit) => {
    const { title, id, details, creationDate, completed } = habit.item;
    return (
      <Habit
        title={title}
        id={id}
        details={details}
        creationDate={creationDate}
        completed={completed}
        date={date}
      />
    );
  };

  //create new habit button handler
  const handleCreate = () => {
    setModalVisible(true);
  };
  //flatlist renderer
  const HabitList = () => {
    return (
      <View style={styles.listStyle}>
        <FlatList
          data={habits}
          renderItem={(habit) => renderHabit(habit)}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
      </View>
    );
  };

  const { container, buttonHolder, button } = styles;

  if (loading) {
    return (
      <View style={container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={container}>
        <HabitList />
        <View style={buttonHolder}>
          <TouchableOpacity style={button} onPress={handleCreate}>
            <Entypo name="add-to-list" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <CreationModal
          modalVisible={modalVisible}
          updateModalVisible={() => {
            updateModalVisible();
          }}
          currentDate={date}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: "15%",
  },
  listStyle: {
    width: "100%",
    height: "100%",
  },
  buttonHolder: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: "10%",
    right: "2%",
  },
  button: {
    padding: 10,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.22,
    height: Dimensions.get("window").width * 0.22,
    backgroundColor: "#2E6194",
    alignItems: "center",
    justifyContent: "center",
  },
});
