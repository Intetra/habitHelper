import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

const Habit = (props) => {
  const { title, id, details } = props
  const { titleStyle, idStyle, detailsStyle } = styles

  const handlePress = () => {
    Alert.alert("Habit pressed.");
  };

  return (
    <TouchableOpacity
      style={styles.habitHolder}
      onPress={() => handlePress()}
    >
      <Text style={titleStyle}>{title}</Text>
      <Text style={idStyle}>ID: {id}</Text>
      <Text style={detailsStyle}>{details}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {},
  titleStyle: {
    fontSize: 40,
    color: "tomato",
    margin: 10,
  },
  idStyle: {
    fontSize: 20,
    margin: 5
  },
  detailsStyle: {
    fontSize: 30,
  }
})

export default Habit
