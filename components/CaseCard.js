import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { caseUrgencyStyle } from '../utils/colours'
import { convertTime } from '../utils/formatting'
import { Colours } from '../utils/colours'

const CaseCard = ({caseDetails}) => {
  const caseColour = caseUrgencyStyle(caseDetails.createdAt);
  const formattedCreatedAt = convertTime(caseDetails.createdAt);

  return (
    <View style={styles.case} key={Date.now()}>
    <Text style={styles.description}>
      {caseDetails.age} yrs old | {caseDetails.segment} |{" "}
      {caseDetails.mechanism}
    </Text>
    <Text>
      <Text style={caseColour}>{`\u25cf`}</Text>{" "}
      <Text style={{ fontWeight: "bold" }}>Submitted:</Text>{" "}
      {formattedCreatedAt}
    </Text>
  </View>
  )
}

export default CaseCard

const styles = StyleSheet.create({
    case: {
        backgroundColor: Colours.pontinetCaseBackground,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 3,
        borderRadius: 10,
      },
      description: {
        paddingBottom: 5,
      },
})