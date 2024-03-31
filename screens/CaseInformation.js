import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import React, { useState } from "react";
import { Colours } from "../utils/colours";
import PaitentInformationCard from "../components/PaitentInformationCard";
import PageTitle from "../components/PageTitle";
import { useLanguage } from "../LanguageContext";
import CaseResponseCard from "../components/CaseResponseCard";
import { ScrollView } from "react-native-gesture-handler";

const CaseInformation = ({ route }) => {
  const screenHeight = Dimensions.get("window").height;
  const caseDetails = route.params;
  const titles = [
    `Diagnostic Impression`,
    `On-site Procedure`,
    `On=site Medication`,
    `General Indications`,
    `Medication`,
    `Referral/Follow up`,
  ];
  const [diagnosticImpression, setDiagnosticImpression] = useState("");
  const [onSiteProcedure, setOnSitreProcedue] = useState("");
  const [onSiteMedication, setOnSiteMedication] = useState("");
  const [generalIndications, setGeneralIndications] = useState("");
  const [medication, setMedication] = useState("");
  const [referral, setReferral] = useState("");
  const { translation } = useLanguage();

  console.log(diagnosticImpression);
  return (
    <SafeAreaView>
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
        <View style={styles.caseInformation}>
          <ScrollView>
          <View style={styles.paitnentInformation}>
            <PaitentInformationCard caseDetails={caseDetails} />
          </View>
          <View>

          </View>
          </ScrollView>
         
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
    justifyContent: "center",
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
  },
});
