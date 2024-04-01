import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import { emailValidator, passwordValidator } from '../utils/formatting';
import Error from './Error';
import { Colours } from '../utils/colours';
import CheckBox from 'expo-checkbox';
import { useLanguage } from "../LanguageContext";
import { useRegistration } from '../RegistrationContext';
import { useNavigation } from '@react-navigation/native';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [isSelected, setSelection] = useState(false);
  const {translation} = useLanguage();
  const {registrationDetails, setRegistrationDetails} = useRegistration();
  const navigation = useNavigation(); 
  //ONCE the button is clicked changed the registrationDetails corresponding values. 
  //EG on the signup form - once clicked the registrationDetails email and password values are updated. 

  const onSubmit = async () => {
      const isEmail = emailValidator(email);
      const isPassword = passwordValidator(password);
      
      setError(null);
      if (!isEmail) {
          setError(`Email not properly formatted`);
          return;
      }
      if (!isPassword.valid) {
          setError(isPassword.message);
          return;
      }

      
      setRegistrationDetails({
          ...registrationDetails, 
          email: email, 
          password: password, 
          type: 'SP'
      });
      navigation.navigate("MedicalRegistration")
  };

    // Dummy handlers for your links
    const handleTermsOfServicePress = () => {
        console.log("Terms of Service Pressed");
        // Implement your navigation or link handling logic here
    };

    const handlePrivacyPolicyPress = () => {
        console.log("Privacy Policy Pressed");
        // Implement your navigation or link handling logic here
    };

    return (
      <View style={styles.con}>
        <View>
            <Text style={styles.formText}>{translation.screens.unAuthScreens.general.email}</Text>
            <TextInput style={{ borderWidth: 1, padding: 15, borderRadius: 10, borderColor: Colours.pontinetInputContainer}} onChangeText={setEmail} placeholder={translation.screens.unAuthScreens.general.emailPlaceholder}/>
        </View>
        <View>
          <Text style={styles.formText}>{translation.screens.unAuthScreens.general.password}</Text>
          <TextInput
          secureTextEntry={true}
          style={{ borderWidth: 1, padding: 15, borderRadius: 10, borderColor: Colours.pontinetInputContainer}}
          onChangeText={setPassword}
          placeholder={translation.screens.unAuthScreens.general.passwordPlaceholder}
          />
        </View>
        {error && <Error message={error} />}
        <View style={styles.termsContainer}>
          <Text style={styles.footerText}>
            {translation.screens.unAuthScreens.signup.agreement} {}
            <Text style={styles.linkText} onPress={handleTermsOfServicePress}>{translation.screens.unAuthScreens.signup.terms}</Text>
            {} {translation.screens.unAuthScreens.general.and} {}
            <Text style={styles.linkText} onPress={handlePrivacyPolicyPress}>{translation.screens.unAuthScreens.signup.privacyPolicy}</Text>
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
            <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox} />
            <Text style={styles.checkboxLabel}>{translation.screens.unAuthScreens.signup.check}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>{translation.screens.unAuthScreens.general.button}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default SignUpForm;

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