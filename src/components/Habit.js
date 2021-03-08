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
        <Text style={idStyle}>{id}</Text>
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    fontSize: 40,
    color: "tomato",
    margin: 10,
  },
  idStyle: {
    fontSize: 20,
    margin: 5,
  },
  detailsStyle: {
    fontSize: 30,
  },
});

export default Habit;
