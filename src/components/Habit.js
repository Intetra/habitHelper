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
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import EditModal from "../screens/habitCRUD/EditModal";

class Habit extends React.Component {
  _isMounted = false

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      modalVisisble: false
    };
  }

  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
    this.setState = (state, callback) => {
        return;
    };
  }

  render() {
    const {
      title,
      id,
      details,
      creationDate,
      completed,
      timesCompleted,
      date,
      drag,
    } = this.props;

    const { titleStyle, idStyle, detailsStyle, buttonsHolder } = styles;

    //modal display switch
    function updateModalVisible() {
      if (this._isMounted) {
        if (modalVisible) {
          this.setState({
            ...this.state,
            modalVisible: false
          })
        } else {
          this.setState({
            ...this.state,
            modalVisible: true
          })
        }
      }

    };

    //habit display switch
    function handleExpand() {
      if (this._isMounted) {
        this.setState({
          ...this.state,
          expanded: !this.state.expanded
        })
      }

    };

    const handleDelete = (id) => {
      deleteHabit(id);
    };

    function handleUpdate() {
      if (this._isMounted) {
        this.setState({
          ...this.state,
          modalVisible: true
        })
      }

    };

    const handleComplete = (id) => {
      completeHabit(id, date);
    };

    let pluralizer = "s";
    if (timesCompleted === 1) {
      pluralizer = "";
    }

    if (this.state.expanded) {
      return (
        <View style={styles.container}>
        <Text style={titleStyle}>{title}</Text>
          <View style={buttonsHolder}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleComplete(id)}
            >
              <AntDesign name="checkcircleo" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleExpand()}
            >
              <Entypo name="add-to-list" size={24} color="black" />
            </TouchableOpacity>
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
          <Text style={idStyle}>{completed ? "Complete" : "Incomplete"}</Text>
          <Text
            style={detailsStyle}
          >{`Completed ${timesCompleted} time${pluralizer}`}</Text>

          <EditModal
            id={id}
            title={title}
            details={details}
            modalVisible={modalVisible}
            updateModalVisible={() => {
              updateModalVisible();
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={[styles.smallContainer, { flexDirection: "row" }]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleComplete(id)}
          >
            <AntDesign name="checkcircleo" size={24} color="green" />
          </TouchableOpacity>
          <Text style={titleStyle}>{title}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleExpand()}
          >
            <Entypo name="add-to-list" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPressIn={drag}
          >
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };
}


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
  smallContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonsHolder: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 34,
    color: "black",
    margin: 10,
  },
  button: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.12,
    height: Dimensions.get("window").width * 0.12,
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
