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
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as firebase from "firebase/app";
import Habit from "../components/Habit";
import { getHabits } from "../api/firebaseMethods";
import CreationModal from "./habitCRUD/CreationModal";
import DraggableFlatList from 'react-native-draggable-flatlist'

export default function Dashboard() {
  //initialize state variables
  const [habits, setHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
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
  const renderHabit = useCallback(
    ({ item, index, drag, isActive }) => {
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
      )
    }
  )

  //create new habit button handler
  const handleCreate = () => {
    setModalVisible(true);
  };
  //expansion handler for completed list
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  //flatlist renderer
  const HabitList = () => {
    return (
      <View style={styles.listStyle}>
        <Text>Habits</Text>
        <DraggableFlatList
          data={habits}
          renderItem={renderHabit}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          onDragEnd={({ habits }) => setData( habits )}
        />
      </View>
    );
  };
  //header component for the completed habits list
  const CompletedHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Completed</Text>
        <MaterialCommunityIcons name={`arrow-${expanded?'up':'down'}-drop-circle-outline`} size={26} color="#8c8c8c" />
      </View>

    )
  }
  const CompletedHabitList = () => {
    if (expanded) {
      return (
        <View style={[styles.listStyle, styles.listStyle2]}>
          <TouchableOpacity
            style={[styles.completed, styles.completedExpanded]}
            onPress={() => handleExpand()}
          >
          <CompletedHeader />
          </TouchableOpacity>
          <FlatList
            data={completedHabits}
            renderItem={(habit) => renderHabit(habit)}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.listStyle, styles.listStyle2]}>
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

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "15%",
  },
  listsHolder: {
    height: "100%",
    width: "100%",
  },
  listStyle: {
    flex: 1,
    margin: 5,
  },
  listStyle2: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginRight: 20,
    color: '#8c8c8c'
  },
  completed: {
    alignItems:'center',
    justifyContent: 'center',
    height: 50
  },
  completedExpanded: {
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
    width: Dimensions.get("window").width * 0.20,
    height: Dimensions.get("window").width * 0.20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
