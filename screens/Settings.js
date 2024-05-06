import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from "react-native";
import { useLanguage } from "../LanguageContext";
import React from "react";
import { Colours } from "../utils/colours";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../AuthContext";


const Settings = () => {

    const screenHeight = Dimensions.get("window").height;
    const navigation = useNavigation();
    const { translation } = useLanguage();
    const { logout } = useAuth();

    return (
        <SafeAreaView style={[styles.container, { height: screenHeight }]}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LanguageSelection')}>
                    <Text style={styles.buttonText}>{translation.screens.authScreens.general.languageButton}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{name: "HomePage"}]
                    })
                    logout();
                }}>
                    <Text style={styles.buttonText} >{translation.screens.authScreens.general.logout}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
    buttonContainer: {
        paddingVertical: 50
    },
    button: {
        backgroundColor: Colours.pontinetPrimary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 45,
        width: "55%",
        alignSelf: "center",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
    },
})