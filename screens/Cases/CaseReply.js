import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
import { Colours } from "../../utils/colours";
import PatientInformationCard from "../../components/Cards/PatientInformationCard";
import PageTitle from "../../components/PageTitle";
import { useLanguage } from "../../LanguageContext";
import CaseInputCard from "../../components/Cards/CaseInputCard";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useImage } from "../../hooks/useImage";
import { useDocuments } from "../../hooks/useDocuments";

const CaseReply = ({ route }) => {
  const caseDetails = route.params;

  const notApplicable = `N/A`;
  const [diagnosticImpression, setDiagnosticImpression] = useState(notApplicable);
  const [onSiteProcedure, setOnSitreProcedue] = useState(notApplicable);
  const [onSiteMedication, setOnSiteMedication] = useState(notApplicable);
  const [generalIndications, setGeneralIndications] = useState(notApplicable);
  const [medication, setMedication] = useState(notApplicable);
  const [referral, setReferral] = useState(notApplicable);
  const [addtionalGeneralInstructions, setAddtionalGeneralInstructions] = useState(notApplicable);
  const [addtionalDischargeInstructions, setAddtionalDischargeInstructions] = useState(notApplicable);
  const [error, setError] = useState(false);
  const { translation } = useLanguage();
  const navigation = useNavigation();
  const { pickImage, image } = useImage();
  const [imageSelected, setImageSelected] = useState(false);
  const [documentSelected, isDocumentSelected] = useState()
  const { selectDocument, document } = useDocuments();
  const { user } = useAuth();

  const titles = [
    `${translation.screens.authScreens.caseReply.diagnosticImpression}`,
    `${translation.screens.authScreens.caseReply.onSiteProcedure}`,
    `${translation.screens.authScreens.caseReply.onSiteMedication}`,
    `${translation.screens.authScreens.caseReply.generalIndications}`,
    `${translation.screens.authScreens.caseReply.medication}`,
    `${translation.screens.authScreens.caseReply.referral}`,
    
  ];

  const setters = [
    setDiagnosticImpression,
    setOnSitreProcedue,
    setOnSiteMedication,
    setGeneralIndications,
    setMedication,
    setReferral,
  ];

  const onSubmit = async () => {
    Alert.alert(
      `${translation.screens.authScreens.caseReply.confirmSubmission}`,
      `${translation.screens.authScreens.caseReply.confirmation}`,
      [
        {
          text: `${translation.screens.authScreens.general.cancel}`,
          style: 'cancel',
          onPress: () => console.log('Submission canceled'),
        },
        {
          text: `${translation.screens.authScreens.general.submit}`,
          onPress: async () => {
            const data = {
              id: caseDetails._id,
              generalInstructions: {
                diagnosticImpression: diagnosticImpression,
                onSiteProcedure: onSiteProcedure,
                onSiteMedication: onSiteMedication,
                other: addtionalGeneralInstructions,
              },
              dischargeInstructions: {
                generalIndications: generalIndications,
                medication: medication,
                referralDetails: referral,
                other: addtionalDischargeInstructions,
              },
              specialist: {
                name: user.name
              }
            };
            
            try {
              console.log(caseDetails)
              const response = await axios.post(
                `${process.env.EXPO_PUBLIC_CASES_URL}/send`,
                data
              );
              if (response.data.message) {
                const subtitle =
                  caseDetails.patientInformation.illnessDescription.segment;
                navigation.navigate("CaseSubmission", subtitle);
              }
            } catch (err) {
              setError(true);
            }
          },
        },
      ],
      { cancelable: true, onDismiss: () => console.log('Alert dismissed') }
    );
  };
  //TODO A MODAL TO CONFIRM
  return (
    <SafeAreaView>
      <View>
        <View style={styles.header}>
          <PageTitle
            title={translation.screens.authScreens.caseReply.title}
          />
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
                {translation.screens.authScreens.caseReply.generalInstructions}
              </Text>
              {titles.map((title, i) => {
                if (i <= 2) {
                  return (
                    <CaseInputCard
                      key={title}
                      title={title}
                      onChangeText={setters[i]}
                    />
                  );
                }
                
              })}
              <View><CaseInputCard title={translation.screens.authScreens.caseInformation.other} onChangeText={setAddtionalDischargeInstructions} /></View>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 18,
                  marginTop: 20,
                }}
              >
                {translation.screens.authScreens.caseReply.dischargeInstructions}
              </Text>
              {titles.map((title, i) => {
                if (i > 2) {
                  return (
                    <CaseInputCard
                      key={title}
                      title={title}
                      onChangeText={setters[i]}
                    />
                  );
                }
                
              })}
              <View><CaseInputCard title={translation.screens.authScreens.caseInformation.other} onChangeText={setAddtionalDischargeInstructions} /></View>
            </View>
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
                    <Text style={styles.buttonText}>{translation.screens.authScreens.caseInformation.viewImage}</Text>
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
                  <Text style={styles.buttonText}>{translation.screens.authScreens.caseInformation.addImage}</Text>
                  <Image
                    style={{
                      marginStart: 5,
                      height: 25,
                      width: 15,
                      marginTop: 0,
                    }}
                    source={require("../../assets/Addsign.png")}
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
                  <Text style={styles.buttonText}>{translation.screens.authScreens.caseInformation.addReport}</Text>
                  <Image
                    style={{
                      marginStart: 5,
                      height: 25,
                      width: 15,
                      marginTop: 0,
                    }}
                    source={require("../../assets/Addsign.png")}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.buttonText}>{translation.screens.authScreens.caseInformation.camera}</Text>
                  <Image
                    style={{
                      marginStart: 7,
                      height: 25,
                      width: 25,
                      marginTop: 0,
                    }}
                    source={require("../../assets/camera.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{ ...styles.button, marginTop: 30, alignSelf: "center" }}
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>{translation.screens.authScreens.caseInformation.submitCase}</Text>
            </TouchableOpacity>
            {error && <Error message={error}/>}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CaseReply;

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
    marginBottom: 20
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
