import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { updateHabit } from '../../api/firebaseMethods'

export default function EditModal(props) {
  const { id, title, details, modalVisible, updateModalVisible, habitGetter } = props;
  const { centeredView, modalView, textStyle, openButton } = styles;

  const EditHabitForm = () => {
    const [newTitle, setNewTitle] = useState(title);
    const [newDetails, setNewDetails] = useState(details);

    const emptyState = () => {
      setNewTitle("");
      setNewDetails("");
    };

    const handlePress = () => {
        updateHabit(id, newTitle, newDetails);
        emptyState();
        updateModalVisible();
        habitGetter();
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Update Habit</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Title*"
          defaultValue={title}
          onChangeText={(name) => setNewTitle(name)}
        />
        <TextInput
          style={[styles.textInput, styles.textInput2]}
          placeholder="Details*"
          defaultValue={details}
          onChangeText={(name) => setNewDetails(name)}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Commit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={centeredView}>
          <View style={modalView}>
            <EditHabitForm />
            <TouchableHighlight
              style={openButton}
              onPress={() => {
                updateModalVisible();
              }}
            >
              <Text style={textStyle}>
                <AntDesign name="close" size={24} color="white" />
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: '100%'
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%'
  },
  openButton: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  //styles for form
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  header: {
    height: "20%",
    fontSize: 40,
    margin: 10,
  },
  textInput: {
    width: '100%',
    flex: 1,
    borderWidth: 2,
    marginBottom: 5
  },
  textInput2: {
    flex: 4,
  },
  button: {
    flex: 1,
    width: '80%',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#2E6194',
    padding: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});
