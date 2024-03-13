import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import AccountHeader from "../components/AccountHeader";
import Form from "../components/LoginForm";
import { Colours } from "../utils/colours";

const Login = () => {
    const formHeaders = ["Email", "Password"]; 
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
        {!isKeyboardVisible && <Image source={require('../assets/login.png')}></Image> }
        <Text style={styles.headerText}>Account Login</Text>
        <Text style={styles.subHeaderText}>Bridging gaps together, bringing medical excellence everywhere</Text>
        <View style={styles.form}>
          <Form titles={formHeaders}/>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Text style={styles.footerText}>Sign up now</Text>
        </View>        
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
