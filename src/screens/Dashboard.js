import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase/app";
import Habit from "../components/Habit";
import { getHabits } from "../api/firebaseMethods";
import CreateModal from "./habitCRUD/CreateModal";

export default function Dashboard({ navigation }) {
  //get uid for current user
  let uid = firebase.auth().currentUser.uid;
  //initialize state variables
  const [habits, setHabits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const habitGetter = () => {
    const fetch = async () => {
      setHabits(await getHabits());
    };
    fetch();
  }

  const updateModalVisible = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }

  };

  //fetch habits and store in state
  useEffect(() => {
    habitGetter()
  }, []);

  //flatlist renderItem handler
  const renderHabit = (prop) => {
    return (
      <Habit
        title={prop.item.title}
        id={prop.item.uid}
        details={prop.item.details}
      />
    );
  };

  //create new habit button handler
  const handleCreate = () => {
    setModalVisible(true)
  };

  const HabitList = () => {
    const { listStyle } = styles;
    return (
      <View style={listStyle}>
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

  return (
    <View style={container}>
      <HabitList />
      <View style={buttonHolder}>
        <TouchableOpacity style={button} onPress={handleCreate}>
          <Entypo name="add-to-list" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <CreateModal
        modalVisible={modalVisible}
        habitGetter={() => {
          habitGetter()
        }}
        updateModalVisible={() => {
          updateModalVisible()
        }}
      />
    </View>
  );
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
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    bottom: '10%',
    right: '2%'
  },
  button: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: "#2E6194",
    alignItems: "center",
    justifyContent: "center",
  },
});
