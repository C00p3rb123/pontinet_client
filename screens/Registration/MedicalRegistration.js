import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../LanguageContext";
import MedicalRegistrationForm from "../../components/Forms/RegistrationForms/MedicalRegistrationForm";
import { Colours } from "../../utils/colours";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MedicalRegistration = () => {
  const { translation } = useLanguage();
  const navigation = useNavigation();

  const handleFormSubmit = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    navigation.navigate("ClinicRegistration");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        enableResetScrollToCoords={false}
        scrollEnabled={true}
        extraHeight={150}
        extraScrollHeight={200}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/Medical_registration.png")}
          style={styles.image}
        />
        <Text style={styles.headerText}>
          {translation.screens.unAuthScreens.medicalRegistration.header}
        </Text>
        <Text style={styles.subHeaderText}>
          {translation.screens.unAuthScreens.medicalRegistration.description}
        </Text>
        <View style={styles.form}>
          <MedicalRegistrationForm onSubmit={handleFormSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default MedicalRegistration;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20, // Ensures padding at the bottom when scrolled
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20, // Adds space below the image for better visual separation
  },
  headerText: {
    color: Colours.pontinetPrimary,
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
    paddingHorizontal: 8,
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
});
