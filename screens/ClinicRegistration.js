import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Keyboard, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colours } from "../utils/colours";
import ClinicRegistrationForm from "../components/ClinicRegistrationForm";

const ClinicRegistration = () => {
    const screenHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={[styles.scrollView, {height: screenHeight}]} contentInset={styles.inset}>
                <Image source={require('../assets/clinic.png')} />
                <Text style={styles.headerText}>Your Clinic Details</Text>
                <Text style={styles.subHeaderText}>You are nearly there, please let us know your clinic details</Text>
                <View style={styles.form}>
                    <ClinicRegistrationForm />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ClinicRegistration;

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
        bottom: 100
    }
});