import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Keyboard, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colours } from "../utils/colours";
import MedicalRegistrationForm from "../components/MedicalRegistrationForm";
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from "../LanguageContext";

const MedicalRegistration = () => {
    const screenHeight = Dimensions.get('window').height;
    const { translation } = useLanguage();
    const navigation = useNavigation();
    const handleFormSubmit = () => {
      navigation.navigate('ClinicRegistration');
  };

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={[styles.scrollView, {height: screenHeight}]} contentInset={styles.inset}>
                    <Image source={require('../assets/Medical_registration.png')} />
                    <Text style={styles.headerText}>{translation.screens.unAuthScreens.medicalRegistration.header}</Text>
                    <Text style={styles.subHeaderText}>{translation.screens.unAuthScreens.medicalRegistration.description}</Text>
                    <View style={styles.form}>
                      <MedicalRegistrationForm onSubmit={handleFormSubmit} />
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MedicalRegistration;

const styles = StyleSheet.create({
  container:{
      alignItems:'center',
  },
  scrollView: {
      alignItems:'center',
  },
  headerText:{
      color: Colours.pontinetPrimary,
      fontSize: 32,
      fontWeight: 'bold',
      paddingTop: 15,
      paddingBottom: 15,
      textAlign: 'center'
  },
  subHeaderText:{
      color: Colours.pontinetSeconday,
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 20,
  },
  form: {
      width: '80%',
      paddingVertical: 20
  },
  inset: {
      top: 0,
      bottom: 350
  }
});