import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Colours } from "../utils/colours";

const CaseResponseCard = ({ title, onChangeText }) => {
  return (
    <View style={styles.paitnentInformation}>
      <Text style={styles.title}>{title}</Text>
      <TextInput style={styles.response} onChangeText={onChangeText} />
    </View>
  );
};

export default CaseResponseCard;

const styles = StyleSheet.create({
  paitnentInformation: {
    backgroundColor: "white",
    marginTop: 20,
    width: "100%"
  },
  title: {
    fontSize:16,
    paddingVertical: 5,
    fontWeight: 'bold'
  },
  response:{
    borderWidth: 1
  }
});
