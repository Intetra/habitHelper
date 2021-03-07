import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase/app";

export default function Dashboard({ navigation }) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      let uid = firebase.auth().currentUser.uid;
      try {
        let doc = await firebase
          .firestore()
          .collection(`/users/${uid}/projects`)
          .get()

          return doc.docs.map(doc => doc.data())


      } catch (err) {
        Alert.alert("There is an error.", err.message);
      }

    }
    const updateProjects = async () => {
      setProjects(await getProjects());
    }
    updateProjects()
  }, []);

  useEffect(() => {
    projects.forEach((project) => {
      console.log(project)
    })
  })



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
