import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colours } from "../../utils/colours";
import PatientInformationCard from "../../components/Cards/PatientInformationCard";
import PageTitle from "../../components/PageTitle";
import { useLanguage } from "../../LanguageContext";
import CaseInputCard from "../../components/Cards/CaseInputCard";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

//Component to display the case response details.
//Shows patient information and the response details provided by the specialist.

const CaseResponse = ({ route }) => {
  const caseDetails = route.params;

  const [error, setError] = useState(false);
  const { translation } = useLanguage();
  const navigation = useNavigation();
  // Titles for input fields
  const titles = [
    `${translation.screens.authScreens.caseReply.diagnosticImpression}`,
    `${translation.screens.authScreens.caseReply.onSiteProcedure}`,
    `${translation.screens.authScreens.caseReply.onSiteMedication}`,
    `${translation.screens.authScreens.caseReply.other}`,
    `${translation.screens.authScreens.caseReply.generalIndications}`,
    `${translation.screens.authScreens.caseReply.medication}`,
    `${translation.screens.authScreens.caseReply.referral}`,
    `${translation.screens.authScreens.caseReply.other}`,
  ];
  // Corresponding information for the input fields
  const information = [
    caseDetails.specialistResponse.generalInstructions.diagnosticImpression,
    caseDetails.specialistResponse.generalInstructions.onSiteProcedure,
    caseDetails.specialistResponse.generalInstructions.onSiteMedication,
    caseDetails.specialistResponse.generalInstructions.other,
    caseDetails.specialistResponse.dischargeInstructions.generalIndications,
    caseDetails.specialistResponse.dischargeInstructions.medication,
    caseDetails.specialistResponse.dischargeInstructions.referral,
    caseDetails.specialistResponse.dischargeInstructions.other,
  ];

  return (
    <SafeAreaView>
      <View>
        <View style={styles.header}>
          <PageTitle title={translation.screens.authScreens.caseReply.title} />
          <Text style={{ paddingLeft: 15, fontWeight: "300", fontSize: 18 }}>
            {translation.screens.authScreens.caseReply.case} -{" "}
            {caseDetails.patientInformation.illnessDescription.segment}
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
          <View style={{ ...styles.caseReply }}>
            <View style={styles.paitnentInformation}>
              <PatientInformationCard caseDetails={caseDetails} />
            </View>
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 18,
                  marginTop: 20,
                }}
              >
                {
                  translation.screens.authScreens.caseReply
                    .dischargeInstructions
                }
              </Text>
              {titles.map((title, i) => {
                if (i <= 2) {
                  return (
                    <CaseInputCard
                      key={title + i}
                      title={title}
                      readOnly={true}
                      caseDetails={information[i]}
                    />
                  );
                }
              })}
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 18,
                  marginTop: 20,
                }}
              >
                {
                  translation.screens.authScreens.caseReply
                    .dischargeInstructions
                }
              </Text>
              {titles.map((title, i) => {
                if (i > 2) {
                  return (
                    <CaseInputCard
                      key={title + i}
                      title={title}
                      readOnly={true}
                      caseDetails={information[i]}
                    />
                  );
                }
              })}
            </View>
            <TouchableOpacity
              style={{ ...styles.button, marginTop: 30, alignSelf: "center" }}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <Text style={styles.buttonText}>
                {translation.screens.authScreens.caseResponse.return}
              </Text>
            </TouchableOpacity>
            {error && <Error message={error} />}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CaseResponse;

const styles = StyleSheet.create({
  header: {
    gap: 15,
    justifyContent: "center",
  },
  caseReply: {
    backgroundColor: Colours.pontinetCaseBackground,
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  paitnentInformation: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: "#171717",
  },
  additionalButtons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignContent: "center",
    gap: 30,
    marginTop: 30,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: Colours.pontinetPrimary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 45,
    alignSelf: "flex-end",
    marginRight: 5,
    color: "white",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
