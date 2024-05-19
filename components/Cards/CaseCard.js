// Component to display case details in the CaseSelection screen
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { caseUrgencyStyle } from "../../utils/colours";
import { convertTime } from "../../utils/formatting";
import { Colours } from "../../utils/colours";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../LanguageContext";
import ImageView from "react-native-image-viewing";

// Component to display case details
const CaseCard = ({ caseDetails }) => {
  const caseColour = caseUrgencyStyle(caseDetails.createdAt);
  const formattedCreatedAt = convertTime(caseDetails.createdAt);
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const { translation } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);


  const images = [
    {
      uri: caseDetails.patientInformation.extraInformation ? caseDetails.patientInformation.extraInformation : ""
    }
  ]
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
        <View>
          <ImageView images={images} visible={isVisible} onRequestClose={() => setIsVisible(false)} />
        </View>
        <Text style={styles.description}>
          {caseDetails.patientInformation.age} yrs old |{" "}
          {caseDetails.patientInformation.illnessDescription.segment} |{" "}
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
              <Text style={styles.header}>
                {translation.screens.authScreens.caseSelection.segmentDetails}
              </Text>
              <Text>
                {
                  caseDetails.patientInformation.illnessDescription
                    .segmentDetails
                }
              </Text>
              <Text style={styles.header}>
                {translation.screens.authScreens.caseSelection.mechanismDetails}
              </Text>
              <Text>
                {
                  caseDetails.patientInformation.illnessDescription
                    .mechanismDetails
                }
              </Text>
              <Text style={styles.header}>
                {translation.screens.authScreens.caseSelection.gp}
              </Text>
              <Text>{caseDetails.patientInformation.gp}</Text>
              <Text style={styles.header}>
                {translation.screens.authScreens.caseSelection.practice}
              </Text>
              <Text>{caseDetails.patientInformation.clinic}</Text>
            </View>
            <View style={styles.buttonRow}>
            <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setIsVisible(true)
                    setExpanded(!expanded)
                  }}
                >
                  <Text style={styles.buttonText}>{translation.screens.authScreens.caseSelection.openImage}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("CaseReply", caseDetails);
                    setExpanded(!expanded);
                  }}
                >
                  <Text style={styles.buttonText}>
                    {translation.screens.authScreens.caseSelection.openCase}
                  </Text>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
    }
});
