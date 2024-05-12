import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { convertDate } from "../../utils/formatting";
import { useLanguage } from "../../LanguageContext";

const PatientInformationCard = ({caseDetails}) => {
  const [isExpaned, setIsExpanded] = useState(false);
  const date = convertDate(caseDetails.patientInformation.referralDate);
  const {translation} = useLanguage()
  return (
    <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpaned)}>
      <View style={styles.patientInformation}>
        <View style={styles.column}>
          <Text style={styles.title}>{translation.screens.authScreens.caseReply.patientInformation}</Text>
          <Text style={styles.date}>
            <Text style={styles.title}>{translation.screens.authScreens.caseReply.referralDate}</Text>
            {date}
          </Text>
          {isExpaned && (
            <View style={styles.column}>
              <Text style={styles.subTitle}>
              {translation.screens.authScreens.caseReply.segment}:{" "}
                {caseDetails.patientInformation.illnessDescription.segment}
              </Text>
              <Text style={styles.information}>
              {
                  caseDetails.patientInformation.illnessDescription
                    .segmentDetails
                } {" "}
              </Text>
              <Text style={styles.subTitle}>{translation.screens.authScreens.caseSelection.mechanismDetails}</Text>
              <Text style={styles.information}>
              {
                  caseDetails.patientInformation.illnessDescription
                    .mechanismDetails
                }
              </Text>
              <Text style={styles.subTitle}>{translation.screens.authScreens.caseSelection.gp}</Text>
              <Text style={styles.information}>
                {caseDetails.patientInformation.gp}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.arrow}>{isExpaned ? `\u2303` : `\u2304`}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PatientInformationCard;

const styles = StyleSheet.create({
  patientInformation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 8,
    width: "100%",
  },
  arrow: {
    fontSize: 20,
    paddingTop: 5,
    paddingRight: 5,
    },
  column: {
    paddingTop: 8,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "300"
  },
  information:{
    fontSize: 15,
    paddingLeft: 10
  }
});
