import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import Dropdown from 'react-native-input-select';
import { Colours } from "../utils/colours";
import { useLanguage } from "../LanguageContext";
import { useRegistration } from "../RegistrationContext";

const ClinicRegistrationForm = () => {
    const [clinicName, setClinicName] = useState('');
    const [clinicCountry, setClinicCountry] = useState('');
    const [clinicCity, setClinicCity] = useState('');
    const [clinicSuburb, setClinicSuburb] = useState('');
    const { translation } = useLanguage();
    const { registrationDetails, setRegistrationDetails } = useRegistration();

    const countries = [
        { label: 'Nigeria', value: 'NG' },
        { label: 'Åland Islands', value: 'AX' },
        { label: 'Algeria', value: 'DZ' },
        { label: 'American Samoa', value: 'AS' },
        { label: 'Andorra', value: 'AD' },
    ];

    const cities = [
        { label: 'Nigeria', value: 'NG' },
        { label: 'Åland Islands', value: 'AX' },
        { label: 'Algeria', value: 'DZ' },
        { label: 'American Samoa', value: 'AS' },
        { label: 'Andorra', value: 'AD' },
    ];

    const suburbs = [
        { label: 'Nigeria', value: 'NG' },
        { label: 'Åland Islands', value: 'AX' },
        { label: 'Algeria', value: 'DZ' },
        { label: 'American Samoa', value: 'AS' },
        { label: 'Andorra', value: 'AD' },
    ];

    const onSubmit = () => {
        if (!clinicName || !clinicCountry || !clinicCity || !clinicSuburb) {
            Alert.alert("Form Incomplete", "Please fill out all the fields.");
            return;
        }

        setRegistrationDetails(previousDetails => {
            consoel.log(previousDetails)
            }
        );
        console.log(registrationDetails)
        // Add any further logic here, such as navigation to the next screen
    };

    return (
        <View style={styles.container}>
            <View style={{paddingBottom: 20}}>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.clinicRegistration.clinicName}</Text>
                <TextInput style={{ borderWidth: 1, padding: 20, borderRadius: 10, borderColor: Colours.pontinetInputContainer}} onChangeText={setClinicName}/>
            </View>
            <View>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.clinicRegistration.clinicCountry}</Text>
                <Dropdown
                    dropdownStyle={styles.dropdown}
                    placeholder={translation.screens.unAuthScreens.general.dropdownPlaceholder}
                    placeholderStyle={{fontSize: 16}}
                    options={countries}
                    selectedValue={clinicCountry}
                    onValueChange={(value) => setClinicCountry(value)}
                    isSearchable={true}
                    selectedItemStyle={{ fontSize: 16 }}
                />
            </View>
            <View>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.clinicRegistration.clinicCity}</Text>
                <Dropdown
                    dropdownStyle={styles.dropdown}
                    placeholder={translation.screens.unAuthScreens.general.dropdownPlaceholder}
                    placeholderStyle={{fontSize: 16}}
                    options={cities}
                    selectedValue={clinicCity}
                    onValueChange={(value) => setClinicCity(value)}
                    isSearchable={true}
                    selectedItemStyle={{ fontSize: 16 }}
                />
            </View>
            <View>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.clinicRegistration.clinicSuburb}</Text>
                <Dropdown
                    dropdownStyle={styles.dropdown}
                    placeholder={translation.screens.unAuthScreens.general.dropdownPlaceholder}
                    placeholderStyle={{fontSize: 16}}
                    options={suburbs}
                    selectedValue={clinicSuburb}
                    onValueChange={(value) => setClinicSuburb(value)}
                    isSearchable={true}
                    selectedItemStyle={{ fontSize: 16 }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>{translation.screens.unAuthScreens.general.continueButton}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ClinicRegistrationForm;

const styles = StyleSheet.create({
    container: {
      maxWidth: "100%",
    },
    buttonContainer: {
      paddingVertical: 20,
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
    formText: {
      color: Colours.pontinetAccent,
      fontWeight: "bold",
      fontSize: 16,
      paddingVertical: 12,
    },
    dropdown: {
        borderColor: Colours.pontinetInputContainer,
        color: Colours.pontinetAccent,
        backgroundColor: 'white',
        borderRadius: 10
    },
  });