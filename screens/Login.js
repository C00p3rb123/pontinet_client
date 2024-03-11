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
        {!isKeyboardVisible && <Image styles={styles.image} source={require('../assets/login.png')}></Image> }        
        <Text style={styles.headerText}>Account Login</Text>
        <Text style={styles.subHeaderText}>Bridging gaps together, bringing medical excellence everywhere</Text>
        <View style={styles.form}>
          <Form titles={formHeaders} styles={width=100}/>
        </View>        
        <Text>Don't have an account?</Text>
        <Text>Sign up now</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container:{
    alignItems:"center",
  },
  headerText:{
    color: Colours.pontinetPrimary,
    fontSize: 30,
    fontWeight: 'bold'


  },
  subHeaderText:{
    color: Colours.pontinetSeconday,
    textAlign: 'center'
  },
  form:{
    width: '80%'
  },



});
