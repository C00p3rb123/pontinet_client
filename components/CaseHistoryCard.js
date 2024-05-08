import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { caseUrgencyStyle } from "../utils/colours";
  import { convertTime } from "../utils/formatting";
  import { Colours } from "../utils/colours";
  import { useNavigation } from '@react-navigation/native';
  import { useLanguage } from "../LanguageContext";

  //caseDetails: 

  
  const CaseHistoryCard = ({ caseDetails }) => {
    const formattedCreatedAt = convertTime(caseDetails.updatedAt);    
    const [expanded, setExpanded] = useState(false);
    const navigation = useNavigation();
    const {translation } = useLanguage();    
        
    return (
      <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
        <View
          style={[
            styles.case,
            expanded && {
              backgroundColor: "white",
              shadowOffset: { width: 1, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              shadowColor: "#171717",
              borderTopColor: Colours.pontinetPrimary,
              elevation: 10
            },
          ]}
          key={Date.now()}
        >
          <Text style={styles.description}>
            {caseDetails.patientInformation.gp}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>{translation.screens.authScreens.caseSelection.submitted}</Text>{" "}
            {formattedCreatedAt}
          </Text>
          <Text style={[styles.description, {paddingTop: 5}]}>{caseDetails.patientInformation.age} | {caseDetails.patientInformation.illnessDescription.segment} |  {caseDetails.patientInformation.illnessDescription.mechanism}  </Text>
          {expanded && (
            <View style={styles.expanded} >
                <TouchableOpacity style={styles.button} onPress={() =>{
                  navigation.navigate("CaseReadOnly", caseDetails);
                  setExpanded(!expanded);
                } }>
                    <Text>{translation.screens.authScreens.caseHistory.adviceGiven}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => Alert.alert(translation.screens.authScreens.caseHistory.incorrectPermissions, translation.screens.authScreens.caseHistory.contact, [], { cancelable: true })}>
                    <Text>{translation.screens.authScreens.caseHistory.reopenCase}</Text>
                </TouchableOpacity>
            </View>
            
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  export default CaseHistoryCard;
  
  const styles = StyleSheet.create({
    case: {
      backgroundColor: Colours.pontinetCaseBackground,
      paddingLeft: 10,
      paddingBottom: 10,
      paddingTop: 5,
      borderRadius: 10,
      alignItems: 'flex-start',
      
    },
    description: {
      paddingBottom: 5,
      fontSize: 16
    },
    button: {
      backgroundColor: Colours.pontinetPrimary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 45,
      alignSelf: 'flex-end',
      marginRight: 5,
      color: 'white'
    },
    expanded: {
      paddingTop: 10,
      flexDirection: 'row'
    },
    header: {
      fontWeight: 'bold'
    }
  });
  