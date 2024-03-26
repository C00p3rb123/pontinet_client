import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colours } from "../utils/colours";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import PaitentInformationCard from "../components/PaitentInformationCard";
import AccountHeader from "../components/AccountHeader";
import PageTitle from "../components/PageTitle";

const CaseInformation = ({route}) => {

  const screenHeight = Dimensions.get("window").height;
  const caseDetails  = route.params;
  const title = `Open Case`
  
  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <View style={styles.header}>
          <AccountHeader />
          <PageTitle title={title} />
          <Text style={{paddingLeft: 15, fontWeight: '300', fontSize: 18}}>Case - {caseDetails.paitentInformation.illnessDescription.mechanism}</Text>
        </View>
        <View style={styles.caseInformation}>          
            <View style={styles.paitnentInformation}>
                <PaitentInformationCard caseDetails={caseDetails} />
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
    gap: 15

  },
  caseInformation: {
    flex: 4,
    backgroundColor: Colours.pontinetCaseBackground,
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  paitnentInformation: {
    backgroundColor: "white",
    marginTop: 20,
    width: "95%",
    borderRadius: 10,
    flexDirection: "row",
  }
});
