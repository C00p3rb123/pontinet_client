import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Keyboard, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AccountHeader from "../components/AccountHeader";
import Form from "../components/LoginForm";
import { Colours } from "../utils/colours";
import CheckBox from "expo-checkbox";

const Signup = () => {
    const [isSelected, setSelection] = useState(false);
    const screenHeight = Dimensions.get('window').height;
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

    // Dummy handlers for your links
    const handleTermsOfServicePress = () => {
        console.log("Terms of Service Pressed");
        // Implement your navigation or link handling logic here
    };

    const handlePrivacyPolicyPress = () => {
        console.log("Privacy Policy Pressed");
        // Implement your navigation or link handling logic here
    };
    const template = () => {
        console.log(`Not implemented`);
    }

    return (
        <SafeAreaView>
            <View style={[styles.container, {height: screenHeight}]}>
                <AccountHeader />
                {!isKeyboardVisible && <Image source={require('../assets/medical_professionals.png')} />}
                <Text style={styles.headerText}>Account Details</Text>
                <Text style={styles.subHeaderText}>This will be your login details when you need to login at a later date</Text>
                <View style={styles.form}>
                    <Form handleSubmit={template} />
                </View>
                <View style={styles.termsContainer}>
                    <Text style={styles.footerText}>
                        By signing up, you agree to
                        <Text style={styles.linkText} onPress={handleTermsOfServicePress}> Terms of Service </Text>
                        and
                        <Text style={styles.linkText} onPress={handlePrivacyPolicyPress}> View Privacy Policy</Text>
                    </Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox} />
                    <Text style={styles.checkboxLabel}>I agree to the Pontinet’s Terms of services</Text>
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
    termsContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 16,
        paddingVertical: 3,
        textAlign: 'center',
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 8,
    },
    checkboxLabel: {
        fontSize: 16,
    }
});
