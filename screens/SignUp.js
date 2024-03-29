import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Keyboard, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { Colours } from "../utils/colours";
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const navigation = useNavigation();
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

    
    const handleSubmitPress = () => {
        navigation.navigate('ClinicRegistration');
    }

    return (
        <SafeAreaView>
            <View style={[styles.container, {height: screenHeight}]}>
                {!isKeyboardVisible && <Image source={require('../assets/medical_professionals.png')} />}
                <Text style={styles.headerText}>Account Details</Text>
                <Text style={styles.subHeaderText}>This will be your login details when you need to login at a later date</Text>
                <View style={styles.form}>
                    <SignUpForm handleSubmit={handleSubmitPress} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;

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
});
