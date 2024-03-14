import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import AccountHeader from "../components/AccountHeader";
import Form from "../components/LoginForm";
import { Colours } from "../utils/colours";
import CheckBox from "expo-checkbox";

const Signup = () => {
    const [isSelected, setSelection] = useState(false);
    const screenHeight = Dimensions.get('window').height
    //TODO: Wire up server & store JWT
    //TODO: Style
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
  return (
    <SafeAreaView>
      <View style={[styles.container, {height: screenHeight}]}>
        <AccountHeader />
        {!isKeyboardVisible && <Image source={require('../assets/medical_professionals.png')}></Image> }
        <Text style={styles.headerText}>Account Details</Text>
        <Text style={styles.subHeaderText}>This will be your login details when you need to login at a later date</Text>
        <View style={styles.form}>
          <Form />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>By signing up, you agree to PontiNet Terms of Service 
            View Privacy policy</Text>
          <CheckBox value={isSelected} onValueChange={(value) => setSelection(value)} /><Text>I agree to the Pontinet’s Terms of services</Text>
        </View>        
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
  },
  headerText:{
    color: Colours.pontinetPrimary,
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15
  },
  subHeaderText:{
    color: Colours.pontinetSeconday,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form:{
    width: '75%',
    paddingVertical: 20
  },
  footer: {
    paddingVertical: 20,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 3,
  }
});
