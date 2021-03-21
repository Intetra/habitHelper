import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import * as firebase from "firebase/app";
import Habit from "../components/Habit";
import { getHabits, reorderHabits } from "../api/firebaseMethods";
import CreationModal from "./habitCRUD/CreationModal";
import DraggableFlatList from "react-native-draggable-flatlist";
import CompletedHeader from "../components/CompletedHeader";
import { useStateIfMounted } from 'use-state-if-mounted'

export default function Dashboard() {
  //initialize state variables
  const [habits, setHabits] = useStateIfMounted([]);
  const [completedHabits, setCompletedHabits] = useStateIfMounted([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const day = new Date().getDate(); //Current Day
  const month = new Date().getMonth() + 1; //Current Month
  const year = new Date().getFullYear(); //Current Year
  const date = month + "/" + day + "/" + year;

  //fetch habits and store in state
  useEffect(() => {
    getHabits(date, setHabits, loading, setLoading, setCompletedHabits);
  }, []);

  //modal display switch
  const updateModalVisible = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  //uncompleted flatlist renderItem handler
  const renderHabit = useCallback(({ item, index, drag, isActive }) => {
    const {
      title,
      id,
      details,
      creationDate,
      completed,
      timesCompleted,
    } = item;
    return (
      <Habit
        title={title}
        id={id}
        details={details}
        creationDate={creationDate}
        completed={completed}
        timesCompleted={timesCompleted}
        date={date}
        drag={drag}
      />
    );
  });

  //create new habit button handler
  const handleCreate = () => {
    setModalVisible(true);
  };
  //expansion handler for completed list
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const handleReorder = (data) => {

  };

  //flatlist component
  const HabitList = () => {
    if (habits) {
      return (
        <View style={styles.list}>
          <DraggableFlatList
            data={habits}
            renderItem={renderHabit}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            onDragEnd={({ data }) => {setHabits(data)}}
          />
        </View>
      );
    } else {
      return (
        <View><ActivityIndicator size="large" /></View>
      )
    }
  };

  const CompletedHabitList = () => {
    if (expanded) {
      return (
        <View style={styles.list}>
          <TouchableOpacity
            style={[styles.completed]}
            onPress={() => handleExpand()}
          >
            <CompletedHeader expanded={expanded} />
          </TouchableOpacity>
          <DraggableFlatList
            data={completedHabits}
            renderItem={renderHabit}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            onDragEnd={({ data }) => {setHabits(data)}}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.listMin]}>
          <TouchableOpacity
            style={styles.completed}
            onPress={() => handleExpand()}
          >
            <CompletedHeader expanded={expanded} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const { container, buttonHolder, button, listsHolder } = styles;

  if (loading) {
    return (
      <View style={container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={container}>
        <View style={listsHolder}>
          <HabitList />
          <CompletedHabitList />
        </View>
        <View style={buttonHolder}>
          <TouchableOpacity style={button} onPress={handleCreate}>
            <FontAwesome5 name="plus" size={40} color="red" />
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

let windowWidth = Dimensions.get("window").width
let windowHeight = Dimensions.get("window").height

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "15%",
  },
  listsHolder: {
    height: "100%",
    width: "100%"
  },
  list: {
    flex: 1,
    padding:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listMin: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
    height: 60,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  completed: {
    height: 50,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
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
        windowWidth + windowHeight
      ) / 2,
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
