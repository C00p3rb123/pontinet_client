import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import AccountHeader from "../components/AccountHeader";
import Form from "../components/LoginForm";

const Login = () => {
    const formHeaders = ["Email", "Password"]; 
    //TODO: Wire up server & store JWT
    //TODO: Style
  return (
    <SafeAreaView>
      <View>
        <AccountHeader />
        <Image styles={styles.imageContainer} source={require('../assets/medical_professionals.png')}></Image>
        <Text>Account Login</Text>
        <Text>Bridging gaps together, bringing medical excellence everywhere</Text>
        <Form titles={formHeaders}/>
        <Text>Don't have an account?</Text>
        <Text>Sign up now</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({

});
