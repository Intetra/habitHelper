import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase/app";
import Habit from "../components/Habit";
import getHabits from '../customHooks/getHabits'

export default function Dashboard({ navigation }) {
  //initialize habit state with empty array
  const [habits, setHabits] = useState([]);

  //fetch habits and store in state
  useEffect(() => {
    const fetch = async () => {
      setHabits(await getHabits());
    };
    fetch();
  }, [])


  //flatlist renderItem handler
  const renderHabit = (prop) => {
    return (
      <Habit
        title={prop.item.name}
        id={prop.item.uid}
        details={prop.item.details}
      />
    );
  };

  //TO_DO!!!!!
  //create new task functionality
  const handleCreate = () => {
    Alert.alert("Create pressed.");
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
    )
  }

  const { container, buttonHolder, button } = styles;

  return (
    <View style={container}>
      <HabitList />
      <View style={buttonHolder}>
        <TouchableOpacity style={button} onPress={handleCreate}>
          <Entypo name="add-to-list" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: '15%'
  },
  listStyle: {
    width: '100%',
    height: '85%'
  },
  buttonHolder: {
    height: '15%',
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: "#2E6194",
    alignItems: "center",
    justifyContent: "center",
  },
});
