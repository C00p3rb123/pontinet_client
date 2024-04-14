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
import PageTitle from "../components/PageTitle";
import { useLanguage } from "../LanguageContext";

import { useNavigation } from '@react-navigation/native';

const CaseSubmission = ({ subtitle }) => {
  const screenHeight = Dimensions.get("window").height;
  const { translation } = useLanguage();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <View style={styles.header}>
          <PageTitle
            title={translation.screens.authScreens.caseInformation.title}
          />
          <Text style={{ paddingLeft: 15, fontWeight: "300", fontSize: 18 }}>
            {translation.screens.authScreens.caseInformation.case} - {subtitle}
          </Text>
        </View>
        <View>
          <Text>{translation.screens.authScreens.caseSubmission.thankyou}</Text>
          <Text>
            {translation.screens.authScreens.caseSubmission.appreciate}
          </Text>
          <Text>{translation.screens.authScreens.caseSubmission.next}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <Text style={styles.buttonText}>
              {translation.screens.authScreens.caseSubmission.return}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("CaseSelection")}>
            <Text>
              {translation.screens.authScreens.caseSubmission.moreCases}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaseSubmission;

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
