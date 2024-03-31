import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import Dropdown from 'react-native-input-select';
import { Colours } from "../utils/colours";
import { useLanguage } from "../LanguageContext";
import { useRegistration } from "../RegistrationContext";
import { useNavigation } from '@react-navigation/native';

const MedicalRegistrationForm = () => {
    const navigation = useNavigation();
    const [drName, setDrName] = useState('');
    const [specialisation, setSpecialisation] = useState('');
    const [subSpecialisation, setSubSpecialisation] = useState('');
    const [registrationId, setRegistrationId] = useState('');
    const [registrationCouncil, setRegistrationCouncil] = useState('');
    const [whatsAppMobileNumber, setWhatsAppMobileNumber] = useState('');
    const { translation } = useLanguage();
    const { registrationDetails, setRegistrationDetails } = useRegistration();

    

    // Placeholder data for dropdowns, replace with your actual data
    const specialisationsOptions = [
        { label: 'Specialisation 1', value: 'spec1' },
        { label: 'Specialisation 2', value: 'spec2' },
        // Add more as needed
    ];

    const subSpecialisationsOptions = [
        { label: 'Sub-Specialisation 1', value: 'subSpec1' },
        { label: 'Sub-Specialisation 2', value: 'subSpec2' },
        // Add more as needed
    ];

    const registrationCouncilsOptions = [
        { label: 'Council 1', value: 'council1' },
        { label: 'Council 2', value: 'council2' },
        // Add more as needed
    ];

    const handleSubmit = () => {
        if (!drName || !specialisation || !subSpecialisation || !registrationId || !registrationCouncil || !whatsAppMobileNumber) {
            Alert.alert("Form Incomplete", "Please fill out all the fields.");
            return;
        }

        setRegistrationDetails(previousDetails => ({
            ...registrationDetails,
            registrationDetails: {
                name: drName,
                specialisation: specialisation,
                subSpecialisation: subSpecialisation,
                registrationId: registrationId,
                registrationCouncil: registrationCouncil,
                mobileNumber: whatsAppMobileNumber
            }
        }));
        
        console.log(registrationDetails);
        navigation.navigate("ClinicRegistration");
        
    };

    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 20 }}>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.medicalRegistration.drName}</Text>
                <TextInput style={{ borderWidth: 1, padding: 20, borderRadius: 10, borderColor: Colours.pontinetInputContainer}} onChangeText={setDrName}/>
            </View>
            <View>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.medicalRegistration.specialisation}</Text>
                <Dropdown
                    dropdownStyle={styles.dropdown}
                    placeholderStyle={{ fontSize: 16 }}
                    options={specialisationsOptions}
                    selectedValue={specialisation}
                    onValueChange={setSpecialisation}
                    isSearchable={true}
                    selectedItemStyle={{ fontSize: 16 }}
                    placeholder={translation.screens.unAuthScreens.general.dropdownPlaceholder}
                />
            </View>

            <View>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.medicalRegistration.subSpecialisation}</Text>
                <Dropdown
                    dropdownStyle={styles.dropdown}
                    placeholderStyle={{ fontSize: 16 }}
                    options={subSpecialisationsOptions}
                    selectedValue={subSpecialisation}
                    onValueChange={setSubSpecialisation}
                    isSearchable={true}
                    selectedItemStyle={{ fontSize: 16 }}
                    placeholder={translation.screens.unAuthScreens.general.dropdownPlaceholder}
                />
            </View>

            <View style={{ paddingBottom: 20 }}>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.medicalRegistration.registrationId}</Text>
                <TextInput style={{ borderWidth: 1, padding: 20, borderRadius: 10, borderColor: Colours.pontinetInputContainer}} onChangeText={setRegistrationId}/> 
            </View>

            <View>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.medicalRegistration.registrationCouncil}</Text>
                <Dropdown
                    dropdownStyle={styles.dropdown}
                    placeholderStyle={{ fontSize: 16 }}
                    options={registrationCouncilsOptions}
                    selectedValue={registrationCouncil}
                    onValueChange={setRegistrationCouncil}
                    isSearchable={true}
                    selectedItemStyle={{ fontSize: 16 }}
                    placeholder={translation.screens.unAuthScreens.general.dropdownPlaceholder}
                />
            </View>

            <View style={{ paddingBottom: 20 }}>
                <Text style={styles.formText}>{translation.screens.unAuthScreens.medicalRegistration.whatsAppMobileNumber}</Text>
                <TextInput  style={{ borderWidth: 1, padding: 20, borderRadius: 10, borderColor: Colours.pontinetInputContainer}} onChangeText={setWhatsAppMobileNumber}/>
                <Text style={styles.whatsAppDescription}>{translation.screens.unAuthScreens.medicalRegistration.whatsAppDescription}</Text>
            </View>
            

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{translation.screens.unAuthScreens.general.continueButton}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MedicalRegistrationForm;

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
    whatsAppDescription: {
        fontSize: 16, 
        color: Colours.pontinetSeconday,
        marginTop: 10, 
    },
  });
