import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React from "react";
import { Colours } from "../utils/colours";
import PatientInformationCard from "../components/PatientInformationCard";
import PageTitle from "../components/PageTitle";
import { useLanguage } from "../LanguageContext";

const CaseInformation = ({route}) => {

  const screenHeight = Dimensions.get("window").height;
  const caseDetails  = route.params;
  const {translation } = useLanguage();
  
  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <View style={styles.header}>
          <PageTitle title={translation.screens.authScreens.caseInformation.title} />
          <Text style={{paddingLeft: 15, fontWeight: '300', fontSize: 18}}>{translation.screens.authScreens.caseInformation.case} - {caseDetails.patientInformation.illnessDescription.mechanism}</Text>
        </View>
        <View style={styles.caseInformation}>          
            <View style={styles.paitnentInformation}>
                <PatientInformationCard caseDetails={caseDetails} />
            </View>
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaseInformation;

const styles = StyleSheet.create({
  container: {},
  header: {
    flex: 1,
    gap: 15,
    justifyContent: 'center',
  },
  caseInformation: {
    flex: 4,
    backgroundColor: Colours.pontinetCaseBackground,
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  paitnentInformation: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
  }
});
