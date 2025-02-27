import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colours } from "../utils/colours";
import { useLanguage } from "../LanguageContext";
import { useNavigation } from "@react-navigation/native";
import CountryFlag from "react-native-country-flag";
import { useAuth } from "../AuthContext";

//Component to display the language selection screen.
//Allows the user to select between English and Spanish.
const LanguageSelection = () => {
  const { manageTranslation, translation } = useLanguage();
  const screenHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const english = "en";
  const spanish = "esp";
  const { authState } = useAuth();
  // Handle language selection.
  //Set the selected language and navigate to the appropriate screen based on authentication state.
  const onSubmit = (language) => {
    manageTranslation(language);
    authState.authenticated
      ? navigation.navigate("Settings")
      : navigation.navigate("Login");
  };
  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <View style={styles.topContainer}>
          <Image source={require("../assets/medical_professionals.png")} />
          <Text style={styles.headerText}>
            {translation.screens.unAuthScreens.general.selectOption}
          </Text>
        </View>
        <View style={styles.selection}>
          <TouchableOpacity
            style={{ width: "50%" }}
            onPress={() => onSubmit(english)}
          >
            <View style={styles.button}>
              <CountryFlag isoCode="gb" size={25} />
              <Text style={styles.buttonText}>English</Text>
            </View>
          </TouchableOpacity>

          <Text>or</Text>
          <TouchableOpacity
            style={{ width: "50%" }}
            onPress={() => onSubmit(spanish)}
          >
            <View style={styles.button}>
              <CountryFlag isoCode="es" size={25} />
              <Text style={styles.buttonText}>Español</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LanguageSelection;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  headerText: {
    color: Colours.pontinetPrimary,
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 15,
  },
  selection: {
    width: "100%",
    alignItems: "center",
    flex: 2,
    justifyContent: "flex-start",
    gap: 10,
  },
  button: {
    backgroundColor: Colours.pontinetPrimary,
    borderRadius: 45,
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 4,
  },
  topContainer: {
    alignItems: "center",
    flex: 1,
  },
});
