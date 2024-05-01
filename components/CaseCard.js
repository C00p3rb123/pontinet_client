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
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../LanguageContext";

const CaseCard = ({ caseDetails }) => {
  const caseColour = caseUrgencyStyle(caseDetails.patientInformation.referralDate);
  const formattedCreatedAt = convertTime(caseDetails.patientInformation.referralDate);
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const { translation } = useLanguage();

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
            elevation: 10,
          },
        ]}
        key={Date.now()}
      >
        <Text style={styles.description}>
          {caseDetails.patientInformation.age} yrs old | {caseDetails.patientInformation.illnessDescription.segment} |{" "}
          {caseDetails.patientInformation.illnessDescription.mechanism}
        </Text>
        <Text>
          <Text style={caseColour}>{`\u25cf`}</Text>{" "}
          <Text style={{ fontWeight: "bold" }}>
            {translation.screens.authScreens.caseSelection.submitted}
          </Text>{" "}
          {formattedCreatedAt}
        </Text>
        {expanded && (
          <View style={styles.expanded}>
            <View>
              <Text style={styles.header}>Segment Details</Text>
              <Text>
                {
                  caseDetails.patientInformation.illnessDescription
                    .segment_details
                }
              </Text>
              <Text style={styles.header}>Mechanism Details</Text>
              <Text>{caseDetails.patientInformation.illnessDescription.mechanism_details}</Text>
              <Text style={styles.header}>General Practioner</Text>
              <Text>{caseDetails.patientInformation.gp}</Text>
              <Text style={styles.header}>Practice</Text>
              <Text>{caseDetails.patientInformation.clinic}</Text>
            </View>
            <View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("CaseInformation", caseDetails);
                  }}
                >
                  <Text style={styles.buttonText}>{translation.screens.authScreens.caseSelection.openCase}</Text>
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
    alignSelf: "flex-end",
    marginRight: 5,
    color: "white",
  },
  expanded: {
    paddingTop: 5,
  },
  header: {
    fontWeight: "bold",
  },
});
