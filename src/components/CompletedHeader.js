import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

//header component for the completed habits list
const CompletedHeader = (props) => {
  const { expanded } = props
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Completed</Text>
      <MaterialCommunityIcons name={`arrow-${expanded?'up':'down'}-drop-circle-outline`} size={26} color="#8c8c8c" />
    </View>

  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginRight: 20,
    color: '#8c8c8c'
  },
})

export default CompletedHeader
