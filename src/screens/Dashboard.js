import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { Entypo } from "@expo/vector-icons";
import getUserInfo from "../customHooks/getUserInfo";

export default function Dashboard({ navigation }) {
  let uid = firebase.auth().currentUser.uid;
  const [info, setInfo] = useState({ email: "", firstName: "", lastName: "" });

  const getInfo = async () => {
    setInfo(await getUserInfo(uid));
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);

  const handlePress = () => {
    Alert.alert("Pressed");
  };

  const { container, titleText, button, listStyle } = styles;

  return (
    <View style={container}>
      <Text style={titleText}>Dashboard</Text>
      <FlatList style={listStyle} />
      <TouchableOpacity style={button} onPress={handlePress}>
        <Entypo name="add-to-list" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  titleText: {
    fontSize: 32,
    color: "blue",
  },
  listStyle: {},
  button: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
