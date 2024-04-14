import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colours } from "../utils/colours";
import PaitentInformationCard from "../components/PaitentInformationCard";
import PageTitle from "../components/PageTitle";
import { useLanguage } from "../LanguageContext";
import CaseResponseCard from "../components/CaseResponseCard";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios"
import { useAuth } from "../AuthContext";
import { useNavigation } from '@react-navigation/native';

const CaseInformation = ({ route }) => {
  const screenHeight = Dimensions.get("window").height;
  const caseDetails = route.params;
  const titles = [
    `Diagnostic Impression`,
    `On-site Procedure`,
    `On-site Medication`,
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
  const [error, setError] = useState(false);
  const { translation } = useLanguage();
  const navigation = useNavigation();
  const {user} = useAuth();

  const setters = [
    setDiagnosticImpression,
    setOnSitreProcedue,
    setOnSiteMedication,
    setGeneralIndications,
    setMedication,
    setReferral,
  ];

const onSubmit = async () => {
  const data = {
    id: caseDetails._id,
    generalInstructions: {
      diagnosticImpression: diagnosticImpression,
      onSiteProcedure: onSiteProcedure,
      onSiteMedication: onSiteMedication
    },
    dischargeInstructions: {
      generalIndications: generalIndications,
      medication: medication,
      referalDetails: referral,
    },
    specialist: user.name
  }
  try{
    const response = await axios.post(`${process.env.EXPO_PUBLIC_CASES_URL}/send`, data);
    if(response.data.message){
      const subtitle = caseDetails.paitentInformation.illnessDescription.segment
      navigation.navigate("CaseSubmission", subtitle );
    }
  }catch(err){
    setError(true)
  }
}
  //TODO A MODAL TO CONFIRM
  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <View style={styles.header}>
          <PageTitle
            title={translation.screens.authScreens.caseInformation.title}
          />
          <Text style={{ paddingLeft: 15, fontWeight: "300", fontSize: 18 }}>
            {translation.screens.authScreens.caseInformation.case} -{" "}
            {caseDetails.paitentInformation.illnessDescription.segment}
          </Text>
        </View>
        <ScrollView style={styles.scrollView}>  
        <View style={styles.caseInformation}>
                
            <View style={styles.paitnentInformation}>
              <PaitentInformationCard caseDetails={caseDetails} />
            </View>
            <View>
              <Text>General Instructions</Text>
              {titles.map((title, i) => {
                if (i <= 2) {
                  return (
                    <CaseResponseCard key={title} title={title} onChangeText={setters[i]} />
                  );
                }
              })}
              <Text>Discharge Instructions</Text>
              {titles.map((title, i) => {
                if (i > 2) {
                  return (
                    <CaseResponseCard key={title} title={title} onChangeText={setters[i]} />
                  );
                }
              })}
            </View>
            <View></View>
            <View style={styles.additionalButtons}>
              <TouchableOpacity>
                <Text>Add image +</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Add report +</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Camera</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onSubmit}>
              <Text>Submit</Text>
            </TouchableOpacity>            
            </View>
            </ScrollView>  
               
      </View>
    </SafeAreaView>
  );
};

export default CaseInformation;

const styles = StyleSheet.create({
  container: {},
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
  },
  additionalButtons: {
    flexDirection: "row",
  },
 
});
