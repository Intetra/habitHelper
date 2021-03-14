import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { deleteHabit, completeHabit } from "../api/firebaseMethods";
import { AntDesign, Feather } from "@expo/vector-icons";
import EditModal from "../screens/habitCRUD/EditModal";

const Habit = (props) => {
  const {
    title,
    id,
    details,
    habitGetter,
    creationDate,
    completed,
    date,
  } = props;
  const { titleStyle, idStyle, detailsStyle, titleHolder } = styles;
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //modal display switch
  const updateModalVisible = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  //habit display switch
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async (id) => {
    await deleteHabit(id);
    await habitGetter();
  };

  const handleUpdate = () => {
    setModalVisible(true);
  };

  const handleComplete = async (id) => {
    await completeHabit(id, date);
    await habitGetter();
  };

  if (expanded) {
    return (
      <TouchableOpacity style={styles.container} onPress={() => handleExpand()}>
        <View style={titleHolder}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleComplete(id)}
          >
            <AntDesign name="checkcircleo" size={24} color="green" />
          </TouchableOpacity>
          <Text style={titleStyle}>{title}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleUpdate(id, title, details)}
          >
            <Feather name="edit" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDelete(id)}
          >
            <AntDesign name="close" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={idStyle}>ID: {id}</Text>
        <Text style={idStyle}>Creation Date: {creationDate}</Text>
        <Text style={detailsStyle}>{details}</Text>
        <Text style={idStyle}>{completed.toString()}</Text>
        <EditModal
          id={id}
          title={title}
          details={details}
          modalVisible={modalVisible}
          habitGetter={() => {
            habitGetter();
          }}
          updateModalVisible={() => {
            updateModalVisible();
          }}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[styles.container, { flexDirection: "row" }]}
        onPress={() => handleExpand()}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleComplete(id)}
        >
          <AntDesign name="checkcircleo" size={24} color="green" />
        </TouchableOpacity>
        <Text style={titleStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
  titleHolder: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 40,
    color: "tomato",
    margin: 10,
  },
  button: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.09,
    height: Dimensions.get("window").width * 0.09,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  idStyle: {
    fontSize: 12,
    margin: 5,
  },
  detailsStyle: {
    fontSize: 30,
  },
});

export default Habit;
