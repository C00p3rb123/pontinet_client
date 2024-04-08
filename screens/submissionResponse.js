import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const submissionResponse = () => {
  return (
    <View style={[styles.container, { height: screenHeight }]}>
    <View style={styles.header}>
      <PageTitle
        title={translation.screens.authScreens.caseInformation.title}
      />
      <Text style={{ paddingLeft: 15, fontWeight: "300", fontSize: 18 }}>
        {translation.screens.authScreens.caseInformation.case} -{" "}
        {caseDetails.paitentInformation.illnessDescription.mechanism}
      </Text>
    </View>
    </View>
  )
}

export default submissionResponse

const styles = StyleSheet.create({})