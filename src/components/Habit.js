import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const Habit = (props) => {
  const { title, id, details } = props;
  const { titleStyle, idStyle, detailsStyle } = styles;
  const [ expanded, setExpanded ] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  if (expanded) {
    return (
      <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={idStyle}>ID: {id}</Text>
        <Text style={detailsStyle}>{details}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
        <Text style={titleStyle}>{title}</Text>
      </TouchableOpacity>
    )
  }


};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  titleStyle: {
    fontSize: 40,
    color: "tomato",
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
