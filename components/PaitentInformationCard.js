import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";

const PaitentInformationCard = () => {
  const [isExpaned, setIsExpanded] = useState(false);
  const caseDetails = {
    age: 24,
    segment: "Hand",
    mechanism: "Wrist Sprain",
    createdAt: "2024-03-22T05:44:34.008+00:00",
  };
  return (
    <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpaned)}>
      <View style={styles.paitentInformation}>
        <View style={styles.column}>
          <Text>Paitent Information</Text>
          <Text>Referral Date: {caseDetails.createdAt}</Text>
          {isExpaned && (
            <View>
              <Text>Age: {caseDetails.age} years old </Text>
              <Text>Segment: {caseDetails.segment}</Text>
              <Text>Mechanism: {caseDetails.mechanism}</Text>
            </View>
          )}
        </View>
        <Text style={styles.arrow}>{isExpaned ? `\u2303` : `\u2304`}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PaitentInformationCard;

const styles = StyleSheet.create({
  paitentInformation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 8,
    paddingBottom: 8,
    width: '100%'
  },
  arrow: {
    fontSize: 20,
    paddingRight: 5,
    justifyContent: 'flex-start'
  },
  column: {
    paddingTop: 8
  },
});
