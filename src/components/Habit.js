import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { deleteHabit } from "../api/firebaseMethods";
import { AntDesign } from "@expo/vector-icons";

const Habit = (props) => {
  const { title, id, details, habitGetter } = props;
  const { titleStyle, idStyle, detailsStyle, titleHolder } = styles;
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (id) => {
    deleteHabit(id);
    habitGetter();
  };

  if (expanded) {
    return (
      <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
        <View style={titleHolder}>
          <Text style={titleStyle}>{title}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => handleDelete(id)}
          >
            <AntDesign name="close" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={idStyle}>ID: {id}</Text>
        <Text style={detailsStyle}>{details}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
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
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 40,
    color: "tomato",
    margin: 10,
  },
  closeButton: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.08,
    height: Dimensions.get("window").width * 0.08,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: "center",
    alignItems: "center",
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
