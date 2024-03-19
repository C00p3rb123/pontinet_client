import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Keyboard, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AccountHeader from "../components/AccountHeader";
import Form from "../components/LoginForm";
import { Colours } from "../utils/colours";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../AuthContext";

/**
 * 
 * @returns The login screen which includes the AccountHeader and Account Form components. 
 */
const Login = () => {
    const navigation = useNavigation();
    const formHeaders = ["Email", "Password"];
    const screenHeight = Dimensions.get('window').height;
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const {login} = useAuth()

    useEffect(() => {
      // When the login screen mounts two listeners are initiated
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
      
      //Upon exit of this screen the listeners are removed. 
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    return (
        <SafeAreaView>
            <View style={[styles.container, {height: screenHeight}]}>
                <AccountHeader />
                {!isKeyboardVisible && <Image source={require('../assets/login.png')} />}
                <Text style={styles.headerText}>Account Login</Text>
                <Text style={styles.subHeaderText}>Bridging gaps together, bringing medical excellence everywhere</Text>
                <View style={styles.form}>
                    <Form handleSubmit={login} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={[styles.footerText, {color: 'blue'}]}>Sign up now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerText: {
        color: Colours.pontinetPrimary,
        fontSize: 32,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 15
    },
    subHeaderText: {
        color: Colours.pontinetSeconday,
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    form: {
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
