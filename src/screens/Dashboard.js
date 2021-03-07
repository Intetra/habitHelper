import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase/app";

export default function Dashboard({ navigation }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      let uid = firebase.auth().currentUser.uid;
      try {
        let projects = await firebase
          .firestore()
          .collection(`/users/${uid}/projects`)
          .get();

        return projects.docs.map((doc) => doc.data());
      } catch (err) {
        Alert.alert("There is an error.", err.message);
      }
    };
    const updateProjects = async () => {
      setProjects(await getProjects());
    };
    updateProjects();
  }, []);

  const DATA = [];
  projects.forEach((project) => {
    DATA.push(project);
  });

  const renderProject = (prop) => {
    console.log(prop);
    return (
      <TouchableOpacity style={styles.projectHolder}>
        <Text style={styles.projectName}>{prop.item.name}</Text>
      </TouchableOpacity>
    );
  };

  const ProjectList = () => {
    return (
      <View>
        <FlatList
          data={DATA}
          renderItem={(item) => renderProject(item)}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
      </View>
    );
  };

  const handlePress = () => {
    Alert.alert("Pressed");
  };

  const { container, buttonHolder, button, listStyle } = styles;

  return (
    <View style={container}>
      <ProjectList style={listStyle} />
      <View style={buttonHolder}>
      <TouchableOpacity style={button} onPress={handlePress}>
        <Entypo name="add-to-list" size={40} color="white" />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: "column",
    alignItems: "center",
    padding: 40,
    paddingBottom: 100
  },
  buttonHolder: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 80,
    padding: 20,
    borderRadius: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  projectHolder: {},
  projectName: {
    fontSize: 40,
    color: 'red'
  }
});
