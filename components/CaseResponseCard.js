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
    width: "100%", // Set width to 100% of its parent container
    borderRadius: 10,
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: "#171717",
  },
  title: {
    fontSize: 16,
    paddingVertical: 5,
    fontWeight: "bold",
    marginStart: 12,
    marginTop: 8,
    marginEnd: 12,
  },
  response: {
    borderWidth: 1,
    borderColor: "#A0A0A0BB",
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 4,
    marginStart: 12,
    minHeight: 40,
    marginEnd: 12,
  },
});
