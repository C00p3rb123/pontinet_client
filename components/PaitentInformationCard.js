import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { convertDate } from "../utils/formatting";

const PaitentInformationCard = ({caseDetails}) => {
  const [isExpaned, setIsExpanded] = useState(false);
  const date = convertDate(caseDetails.paitentInformation.referalDate);
  return (
    <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpaned)}>
      <View style={styles.paitentInformation}>
        <View style={styles.column}>
          <Text style={styles.title}>Paitent Information</Text>
          <Text style={styles.date}>
            <Text style={styles.title}>Referral Date: </Text>
            {date}
          </Text>
          {isExpaned && (
            <View style={styles.column}>
              <Text style={styles.subTitle}>
                Segment:{" "}
                {caseDetails.paitentInformation.illnessDescription.segment}
              </Text>
              <Text style={styles.information}>
              {
                  caseDetails.paitentInformation.illnessDescription
                    .segment_details
                } {" "}
              </Text>
              <Text style={styles.subTitle}>Mechanism Details</Text>
              <Text style={styles.information}>
              {
                  caseDetails.paitentInformation.illnessDescription
                    .mechanism_details
                }
              </Text>
              <Text style={styles.subTitle}>General Practioner</Text>
              <Text style={styles.information}>
                {caseDetails.paitentInformation.gp}
              </Text>
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
