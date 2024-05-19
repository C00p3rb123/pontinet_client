import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Colours } from "../../utils/colours";
import ClinicRegistrationForm from "../../components/Forms/RegistrationForms/ClinicRegistrationForm";
import { useLanguage } from "../../LanguageContext";

//Component to display the clinic registration screen.
//Contains a form for clinic registration details.
const ClinicRegistration = () => {
  const { translation } = useLanguage();

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        contentInset={styles.inset}
      >
        <Image source={require("../../assets/clinic.png")} />
        <Text style={styles.headerText}>
          {translation.screens.unAuthScreens.clinicRegistration.clinicDetails}
        </Text>
        <Text style={styles.subHeaderText}>
          {translation.screens.unAuthScreens.clinicRegistration.memo}
        </Text>
        <View style={styles.form}>
          <ClinicRegistrationForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClinicRegistration;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
  },
  headerText: {
    color: Colours.pontinetPrimary,
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
  },
  subHeaderText: {
    color: Colours.pontinetSeconday,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  form: {
    width: "80%",
    paddingVertical: 20,
  },
  inset: {
    top: 0,
    bottom: 10,
  },
});
