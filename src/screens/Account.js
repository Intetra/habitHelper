import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { loggingOut } from "../api/firebaseMethods";
import { getUserInfo } from "../api/firebaseMethods";
import { useStateIfMounted } from "use-state-if-mounted";

export default function Account({ navigation }) {
  const [info, setInfo] = useStateIfMounted({ email: "", firstName: "", lastName: "" });

  useEffect(() => {
      const getInfo = async () => {
        setInfo(await getUserInfo());
      };
      getInfo();
  }, []);

  const handlePress = () => {
    loggingOut();
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{info.email}</Text>
      <Text style={styles.text}>
        Hi, {info.firstName} {info.lastName}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    padding: 5,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "tomato",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
    marginTop: "2%",
    marginBottom: "10%",
    fontWeight: "bold",
    color: "black",
  },
  titleText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
});
