import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import Dropdown from 'react-native-input-select';
import { Colours } from "../utils/colours";
import { color } from "@rneui/base";

const ClinicRegistrationForm = () => {
    const [clinicName, setClinicName] = useState();
    const [clinicCountry, setClinicCountry] = useState();
    const [clinicCity, setClinicCity] = useState();
    const [clinicSuburb, setClinicSuburb] = useState();

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

    return (
        <View style={styles.container}>
            <View style={{paddingBottom: 20}}>
                <Text style={styles.formText}>Clinic Name</Text>
                <TextInput style={{ borderWidth: 1, padding: 20, borderRadius: 10, borderColor: Colours.pontinetInputContainer}} onChangeText={setClinicName}/>
            </View>
            <View>
                <Text style={styles.formText}>Clinic Country</Text>
                <Dropdown
                    dropdownStyle={styles.dropdown}
                    placeholderStyle={{fontSize: 16}}
                    options={countries}
                    selectedValue={clinicCountry}
                    onValueChange={(value) => setClinicCountry(value)}
                    isSearchable={true}
                    selectedItemStyle={{ fontSize: 16 }}
                />
            </View>
            <View>
                <Text style={styles.formText}>Clinic City</Text>
                <Dropdown
                    dropdownStyle={styles.dropdown}
                    placeholderStyle={{fontSize: 16}}
                    options={cities}
                    selectedValue={clinicCity}
                    onValueChange={(value) => setClinicCity(value)}
                    isSearchable={true}
                    selectedItemStyle={{ fontSize: 16 }}
                />
            </View>
            <View>
                <Text style={styles.formText}>Clinic Suburb</Text>
                <Dropdown
                    dropdownStyle={styles.dropdown}
                    placeholderStyle={{fontSize: 16}}
                    options={suburbs}
                    selectedValue={clinicSuburb}
                    onValueChange={(value) => setClinicSuburb(value)}
                    isSearchable={true}
                    selectedItemStyle={{ fontSize: 16 }}
                />
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