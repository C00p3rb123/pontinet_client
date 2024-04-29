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
<<<<<<< Updated upstream
import { useNavigation } from '@react-navigation/native';
=======
import { useNavigation } from "@react-navigation/native";
import { useImage } from "../hooks/useImage";
import { useDocuments } from "../hooks/useDocuments";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  const {user} = useAuth();
=======
  const { pickImage, image } = useImage();
  const [imageSelected, setImageSelected] = useState(false);
  const [documentSelected, isDocumentSelected] = useState()
  const { selectDocument, document } = useDocuments();
  const { user } = useAuth();
>>>>>>> Stashed changes

  const setters = [
    setDiagnosticImpression,
    setOnSitreProcedue,
    setOnSiteMedication,
    setGeneralIndications,
    setMedication,
    setReferral,
  ];

<<<<<<< Updated upstream
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
    specialist: {
      name: user.name
=======
  const onSubmit = async () => {
    console.log(caseDetails._id);
    const data = {
      id: caseDetails._id,
      generalInstructions: {
        diagnosticImpression: diagnosticImpression,
        onSiteProcedure: onSiteProcedure,
        onSiteMedication: onSiteMedication,
      },
      dischargeInstructions: {
        generalIndications: generalIndications,
        medication: medication,
        referalDetails: referral,
      },
      specialist: {
        name: user.name
      }
    };

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_CASES_URL}/send`,
        data
      );
      if (response.data.message) {
        const subtitle =
          caseDetails.paitentInformation.illnessDescription.segment;
        navigation.navigate("CaseSubmission", subtitle);
      }
    } catch (err) {
      setError(true);
>>>>>>> Stashed changes
    }
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
<<<<<<< Updated upstream
            <View></View>
            <View style={styles.additionalButtons}>
              <TouchableOpacity>
                <Text>Add image +</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Add report +</Text>
=======
            {image && (
              <View>
                <TouchableOpacity
                  style={[!imageSelected && styles.button, { marginTop: 20 }]}
                  onPress={() => setImageSelected(!imageSelected)}
                >
                  {imageSelected ? (
                    <Image
                      source={{ uri: image.uri }}
                      style={{
                        width: 200, // Adjust the width and height as needed
                        height: 200,
                        marginVertical: 20,
                      }}
                    ></Image>
                  ) : (
                    <Text style={styles.buttonText}>View Image</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
            
            <View style={styles.additionalButtons}>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.buttonText}>Add Image</Text>
                  <Image
                    style={{
                      marginStart: 5,
                      height: 25,
                      width: 15,
                      marginTop: 0,
                    }}
                    source={require("../assets/Addsign.png")}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={selectDocument}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.buttonText}>Add Report</Text>
                  <Image
                    style={{
                      marginStart: 5,
                      height: 25,
                      width: 15,
                      marginTop: 0,
                    }}
                    source={require("../assets/Addsign.png")}
                  />
                </View>
>>>>>>> Stashed changes
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
