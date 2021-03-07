import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase/app";
import Habit from "../components/Habit";
import getHabits from '../customHooks/getHabits'

export default function Dashboard({ navigation }) {
  const [habits, setHabits] = useState([]);

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

  //
  const HabitList = () => {
    return (
        <FlatList
          data={habits}
          renderItem={(habit) => renderHabit(habit)}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
    );
  };

  const handleCreate = () => {
    Alert.alert("Create pressed.");
  };

  const { container, buttonHolder, button, listStyle } = styles;

  return (
    <View style={container}>
      <HabitList style={listStyle} />
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
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    padding: 40,
    paddingBottom: 100,
  },
  buttonHolder: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 80,
    padding: 20,
    borderRadius: 50,
    backgroundColor: "#2E6194",
    alignItems: "center",
    justifyContent: "center",
  },
});
