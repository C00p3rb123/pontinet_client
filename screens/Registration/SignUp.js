import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SignUpForm from "../../components/Forms/RegistrationForms/SignUpForm";
import { Colours } from "../../utils/colours";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../LanguageContext";

//Component to display the sign-up screen.
//Contains a form for user registration.
const SignUp = () => {
  const screenHeight = Dimensions.get("window").height;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { translation } = useLanguage();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        {!isKeyboardVisible && (
          <Image source={require("../../assets/medical_professionals.png")} />
        )}
        <Text style={styles.headerText}>
          {translation.screens.unAuthScreens.signup.accountDetails}
        </Text>
        <Text style={styles.subHeaderText}>
          {translation.screens.unAuthScreens.signup.memo}
        </Text>
        <View style={styles.form}>
          <SignUpForm />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  headerText: {
    color: Colours.pontinetPrimary,
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 15,
  },
  subHeaderText: {
    color: Colours.pontinetSeconday,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  form: {
    width: "75%",
    paddingVertical: 20,
  },
});
