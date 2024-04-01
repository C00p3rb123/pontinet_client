import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from "react-native";
import { useLanguage } from "../LanguageContext";
import React from "react";
import { Colours } from "../utils/colours";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../AuthContext";

const Dashboard = () => {

    const screenHeight = Dimensions.get("window").height;
    const navigation = useNavigation();
    const { translation } = useLanguage();
    const { logout } = useAuth();

    return (
        <SafeAreaView style={[styles.container, { height: screenHeight }]}>
            <View style={styles.header}>
                <View style={styles.header2}>
                    <Image source={require('../assets/dashboard_header_icon.png')}/>
                    <Text> asdf</Text>
                </View>
                <View style={styles.header2}>
                    <Image source={require('../assets/dashboard_header_icon2.png')}/>
                    <Text></Text>
                </View>
            </View>
            <TouchableOpacity style={styles.newCaseButtonContainer} onPress={() => navigation.navigate('CaseSelection')}>
                <View style={styles.newCaseButton}>
                    <Image source={require('../assets/new_case_symbol.png')}/>
                    <View>
                        <Text style={styles.newCaseButtonHeader} >{translation.screens.authScreens.dashboard.newCaseButtonHeader}</Text>
                        <Text style={styles.newCaseButtonText} >{translation.screens.authScreens.dashboard.newCaseButtonText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText} >{translation.screens.authScreens.general.logout}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    header: {
        flexDirection:"row",
        backgroundColor: Colours.pontinetAccent2,
        justifyContent: "flex-start",
        width:'100%',
        paddingVertical: 5,
        paddingLeft: 20
    },
    header2: {
        flexDirection: "row"
    },
    newCaseButtonContainer: {
        paddingVertical: 10,
    },
    newCaseButton: {
        flexDirection: "row",
        width: "95%",
        backgroundColor: "white",
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowColor: "#171717",
        borderRadius: 11,
        alignSelf: "center",
        justifyContent: "flex-start",
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 5,
        borderRadius: 10,
    },
    logoutButton: {
        backgroundColor: Colours.pontinetPrimary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 45,
        width: "55%",
        alignSelf: "center",
    },
    logoutButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
    },
})