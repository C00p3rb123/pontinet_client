import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { Colours } from "../../../utils/colours";
import { useLanguage } from "../../../LanguageContext";
import { useRegistration } from "../../../RegistrationContext";
import { useNavigation } from "@react-navigation/native";

// Component for medical registration form
const MedicalRegistrationForm = () => {
  const navigation = useNavigation();
  // State variables for form inputs
  const [drName, setDrName] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [subSpecialisation, setSubSpecialisation] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [registrationCouncil, setRegistrationCouncil] = useState("");
  const [whatsAppMobileNumber, setWhatsAppMobileNumber] = useState("");
  const { translation } = useLanguage();
  const { registrationDetails, setRegistrationDetails } = useRegistration();

  // Handle form submission
  // This function validates the form inputs, ensuring all required fields are filled.
  // If any field is missing, it shows an alert message.
  // On successful validation, it updates the registration details in context and navigates to the next screen.
  const handleSubmit = () => {
    if (
      !drName ||
      !specialisation ||
      !subSpecialisation ||
      !registrationId ||
      !registrationCouncil ||
      !whatsAppMobileNumber
    ) {
      Alert.alert(
        translation.screens.unAuthScreens.medicalRegistration.formIncomplete,
        translation.screens.unAuthScreens.medicalRegistration.fillOutFields
      );
      return;
    }

    setRegistrationDetails({
      ...registrationDetails,
      registrationDetails: {
        name: drName,
        specialisation: specialisation,
        subSpecialisation: subSpecialisation,
        registrationId: registrationId,
        registrationCouncil: registrationCouncil,
        mobileNumber: whatsAppMobileNumber,
      },
    });

    console.log(registrationDetails);
    navigation.navigate("ClinicRegistration");
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.formText}>
          {translation.screens.unAuthScreens.medicalRegistration.drName}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderColor: Colours.pontinetInputContainer,
          }}
          onChangeText={setDrName}
        />
      </View>
      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.formText}>
          {translation.screens.unAuthScreens.medicalRegistration.specialisation}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderColor: Colours.pontinetInputContainer,
          }}
          onChangeText={setSpecialisation}
        />
      </View>

      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.formText}>
          {
            translation.screens.unAuthScreens.medicalRegistration
              .subSpecialisation
          }
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderColor: Colours.pontinetInputContainer,
          }}
          onChangeText={setSubSpecialisation}
        />
      </View>

      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.formText}>
          {translation.screens.unAuthScreens.medicalRegistration.registrationId}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderColor: Colours.pontinetInputContainer,
          }}
          onChangeText={setRegistrationId}
        />
      </View>

      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.formText}>
          {
            translation.screens.unAuthScreens.medicalRegistration
              .registrationCouncil
          }
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderColor: Colours.pontinetInputContainer,
          }}
          onChangeText={setRegistrationCouncil}
        />
      </View>

      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.formText}>
          {
            translation.screens.unAuthScreens.medicalRegistration
              .whatsAppMobileNumber
          }
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderColor: Colours.pontinetInputContainer,
          }}
          onChangeText={setWhatsAppMobileNumber}
        />
        <Text style={styles.whatsAppDescription}>
          {
            translation.screens.unAuthScreens.medicalRegistration
              .whatsAppDescription
          }
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {translation.screens.unAuthScreens.general.continueButton}
          </Text>
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
    backgroundColor: "white",
    borderRadius: 10,
  },
  whatsAppDescription: {
    fontSize: 16,
    color: Colours.pontinetSeconday,
    marginTop: 10,
  },
});
