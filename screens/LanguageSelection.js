import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LanguageSelection = () => {
  return (
    <SafeAreaView>
    <View style={[styles.container, {height: screenHeight}]}>
        <Image source={require('../assets/medical_professionals.png')} />
        <Text style={styles.headerText}>Please Select and Option</Text>
        
    </View>
</SafeAreaView>
  )
}

export default LanguageSelection
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