import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { caseUrgencyStyle } from "../utils/colours";
import { convertTime } from "../utils/formatting";
import { Colours } from "../utils/colours";
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from "../LanguageContext";

const CaseCard = ({ caseDetails }) => {
  const caseColour = caseUrgencyStyle(caseDetails.paitentInformation.referalDate);
  const formattedCreatedAt = convertTime(caseDetails.paitentInformation.referalDate);
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const {translation } = useLanguage();
  
  
  return (
    <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
      <View
        style={[
          styles.case,
          expanded && {
            backgroundColor: "white",
            shadowOffset: { width: 1, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            shadowColor: "#171717",
            borderTopColor: Colours.pontinetPrimary,
          },
        ]}
        key={Date.now()}
      >
        <Text style={styles.description}>
          {caseDetails.paitentInformation.age} yrs old | {caseDetails.paitentInformation.illnessDescription.segment} |{" "}
          {caseDetails.paitentInformation.illnessDescription.mechanism}
        </Text>
        <Text>
          <Text style={caseColour}>{`\u25cf`}</Text>{" "}
          <Text style={{ fontWeight: "bold" }}>{translation.screens.authScreens.caseSelection.submitted}</Text>{" "}
          {formattedCreatedAt}
        </Text>
        {expanded && (
          <View style={styles.expanded} >
            <View>
              <Text style={styles.header}>Segment Details</Text>
              <Text>{caseDetails.paitentInformation.illnessDescription.segment_details}</Text>
              <Text style={styles.header}>Mechanism Details</Text>
              <Text>{caseDetails.paitentInformation.illnessDescription.mechanism_details}</Text>
              <Text style={styles.header}>General Practioner</Text>
              <Text>{caseDetails.paitentInformation.gp}</Text>
              <Text style={styles.header}>Practice</Text>
              <Text>{caseDetails.paitentInformation.clinic}</Text>
            </View>
            <View>
              <View>
                <TouchableOpacity style={styles.button} onPress={() =>{navigation.navigate('CaseInformation', caseDetails)}}>
                  <Text style={styles.buttonText}>Open Case</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CaseCard;

const styles = StyleSheet.create({
  case: {
    backgroundColor: Colours.pontinetCaseBackground,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 5,
    borderRadius: 10,
  },
  description: {
    paddingBottom: 5,
  },
  button: {
    backgroundColor: Colours.pontinetPrimary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 45,
    alignSelf: 'flex-end',
    marginRight: 5,
    color: 'white'
  },
  expanded: {
    paddingTop: 5
  },
  header: {
    fontWeight: 'bold'
  }
});
