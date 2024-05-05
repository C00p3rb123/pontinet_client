import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert
  } from "react-native";
  import React, { useState } from "react";
  import { Colours } from "../utils/colours";
  import PatientInformationCard from "../components/PatientInformationCard";
  import PageTitle from "../components/PageTitle";
  import { useLanguage } from "../LanguageContext";
  import CaseResponseCard from "../components/CaseResponseCard";
  import { ScrollView } from "react-native-gesture-handler";
  import axios from "axios";
  import { useAuth } from "../AuthContext";
  import { useNavigation } from "@react-navigation/native";
  import { useImage } from "../hooks/useImage";
  import { useDocuments } from "../hooks/useDocuments";
  
  const CaseReadOnly = ({ route }) => {
    const caseDetails = route.params;
 
    const [error, setError] = useState(false);
    const { translation } = useLanguage();
    const navigation = useNavigation();
    const { image } = useImage();
    const [imageSelected, setImageSelected] = useState(false);
    const [documentSelected, isDocumentSelected] = useState()
    const { selectDocument, document } = useDocuments();
    const { user } = useAuth();

    const titles = [
        `${translation.screens.authScreens.caseInformation.diagnosticImpression}`,
        `${translation.screens.authScreens.caseInformation.onSiteProcedure}`,
        `${translation.screens.authScreens.caseInformation.onSiteMedication}`,
        `${translation.screens.authScreens.caseInformation.other}`,
        `${translation.screens.authScreens.caseInformation.generalIndications}`,
        `${translation.screens.authScreens.caseInformation.medication}`,
        `${translation.screens.authScreens.caseInformation.referral}`,
        `${translation.screens.authScreens.caseInformation.other}`,
        
    ]
    const information = 
    [caseDetails.specialistResponse.generalInstructions.diagnosticImpression,
      caseDetails.specialistResponse.generalInstructions.onSiteProcedure,
      caseDetails.specialistResponse.generalInstructions.onSiteMedication,
      caseDetails.specialistResponse.generalInstructions.other,
      caseDetails.specialistResponse.dischargeInstructions.generalIndications,
      caseDetails.specialistResponse.dischargeInstructions.medication,
      caseDetails.specialistResponse.dischargeInstructions.referral,
      caseDetails.specialistResponse.dischargeInstructions.other,
    ]

    return (
      <SafeAreaView>
        <View>
          <View style={styles.header}>
            <PageTitle
              title={translation.screens.authScreens.caseInformation.title}
            />
            <Text style={{ paddingLeft: 15, fontWeight: "300", fontSize: 18 }}>
              {translation.screens.authScreens.caseInformation.case} -{" "}
              {caseDetails.patientInformation.illnessDescription.segment}
            </Text>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
            <View style={{ ...styles.caseInformation }}>
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
                  {translation.screens.authScreens.caseInformation.dischargeInstructions}
                </Text>
                {titles.map((title, i) => {
                  if (i <= 2) {
                    return (
                      <CaseResponseCard
                        key={title+i}
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
                  {translation.screens.authScreens.caseInformation.dischargeInstructions}
                </Text>
                {titles.map((title, i) => {
                  if (i > 2) {
                    return (
                      <CaseResponseCard
                        key={title+i}
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
                <Text style={styles.buttonText}>{translation.screens.authScreens.caseReadOnly.return}</Text>
              </TouchableOpacity>
              {error && <Error message={error}/>}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  
  export default CaseReadOnly;
  
  const styles = StyleSheet.create({
    header: {
      gap: 15,
      justifyContent: "center",
    },
    caseInformation: {
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
      marginBottom: 20
    },
    buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 20,
    },
  });
  