import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DraggableFlatList from "react-native-draggable-flatlist";
import { MaterialIcons } from "@expo/vector-icons";

function DragList(props) {
  const { habits } = props;
  const [data, setData] = useState(habits);

  const renderItem = ({ item, index, drag, isActive }) => (
    <View style={styles.item}>
      <BouncyCheckbox
        style={styles.checkbox}
        isChecked={item.isChecked}
        text={item.title}
        onChange={() => {
          handleCheck(item.label);
        }}
      />
      <TouchableOpacity style={styles.iconHolder} onLongPress={drag}>
        <MaterialIcons
          style={styles.icon}
          name="drag-handle"
          size={24}
          color="#8c8c8c"
        />
      </TouchableOpacity>
    </View>
  );

  const handleCheck = (label) => {
    let updated = [...data];
    updated = updated.map((task, index) => {
      if (label === task.label) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    });
    setData(updated);
  };
  return (
    <View style={styles.screen}>
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onDragEnd={({ data }) => setData(data)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 24,
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center'
  },
  checkbox: {
    flex: 1
  },
  iconHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    alignSelf:'flex-end'
  }
});

export default DragList;
