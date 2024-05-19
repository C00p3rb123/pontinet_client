import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
// Component to display input or read-only case details
// This component is used on the CaseReply and CaseResponse screens.
// It serves to display input fields for case details when editing or
// readonly fields when viewing existing case details.
const CaseInputCard = ({
  title,
  onChangeText,
  readOnly = false,
  caseDetails = null,
}) => {
  return (
    <View style={styles.paitnentInformation}>
      <Text style={styles.title}>{title}</Text>
      {!readOnly && (
        <TextInput style={styles.response} onChangeText={onChangeText} />
      )}
      {readOnly && caseDetails && (
        <Text style={styles.readOnly}>{caseDetails}</Text>
      )}
    </View>
  );
};

export default CaseInputCard;

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
    textAlign: "left",
    paddingLeft: 10,
  },
  readOnly: {
    marginBottom: 16,
    marginTop: 4,
    marginStart: 12,
    minHeight: 40,
    marginEnd: 12,
    textAlign: "left",
    paddingLeft: 10,
    fontSize: 16,
  },
});
