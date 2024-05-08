import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import Dropdown from "react-native-input-select";
import { Colours } from "../../../utils/colours";
import Error from "../../Error";
import { useLanguage } from "../../../LanguageContext";
import { useRegistration } from "../../../RegistrationContext";
import { useNavigation } from "@react-navigation/native";
import { useCountries } from "../../../hooks/useCountries";

const ClinicRegistrationForm = () => {
  const [clinicName, setClinicName] = useState("");
  const [clinicCountry, setClinicCountry] = useState("");
  const [clinicState, setClinicState] = useState("");
  const [clinicCity, setClinicCity] = useState("");
  const { translation } = useLanguage();
  const [clinicError, setClinicError] = useState("");
  const {
    registrationDetails,
    setRegistrationDetails,
    sendRegistrationDetails,
    clearRegistration,
  } = useRegistration();
  const navigation = useNavigation();
  const { countries, states, cities, fetchStatesData, fetchCitiesData, error } =
    useCountries();

  useEffect(() => {
    if (clinicCountry) {
      fetchStatesData(clinicCountry);
      setClinicCity("");
      setClinicState("");
    }
  }, [clinicCountry]);

  useEffect(() => {
    if (clinicState) {
      fetchCitiesData(clinicState);
    }
  }, [clinicState]);

  const onSubmit = async () => {
    setClinicError("");
    if (
      !clinicName ||
      (states.length && !clinicState) ||
      (cities.length && !clinicCity)
    ) {
      console.log(clinicCity);
      Alert.alert(
        `${translation.screens.unAuthScreens.clearRegistration.formIncomplete}`
      );
      return;
    }

    try {
      await sendRegistrationDetails();
      clearRegistration();
      navigation.navigate("Login");
    } catch (err) {
      setClinicError(
        `${translation.screens.unAuthScreens.clearRegistration.formIncomplete}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.formText}>
          {translation.screens.unAuthScreens.clinicRegistration.clinicName}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderColor: Colours.pontinetInputContainer,
          }}
          onChangeText={(value) => {
            setClinicName(value);
            setRegistrationDetails({
              ...registrationDetails,
              clinicDetails: {
                ...registrationDetails.clinicDetails,
                clinicName: value,
              },
            });
          }}
        />
      </View>
      {!error && (
        <View>
          <View>
            <Text style={styles.formText}>
              {
                translation.screens.unAuthScreens.clinicRegistration
                  .clinicCountry
              }
            </Text>
            <Dropdown
              dropdownStyle={styles.dropdown}
              placeholder={
                translation.screens.unAuthScreens.general.dropdownPlaceholder
              }
              placeholderStyle={{ fontSize: 16 }}
              options={countries}
              selectedValue={clinicCountry}
              onValueChange={(value) => {
                setClinicCountry(value);
                setRegistrationDetails({
                  ...registrationDetails,
                  clinicDetails: {
                    ...registrationDetails.clinicDetails,
                    clinicCountry: value,
                  },
                });
              }}
              isSearchable={true}
              selectedItemStyle={{ fontSize: 16 }}
            />
          </View>
          <View>
            <Text style={styles.formText}>
              {translation.screens.unAuthScreens.clinicRegistration.clinicState}
            </Text>
            <Dropdown
              dropdownStyle={styles.dropdown}
              placeholder={
                translation.screens.unAuthScreens.general.dropdownPlaceholder
              }
              placeholderStyle={{ fontSize: 16 }}
              options={states}
              selectedValue={clinicState}
              onValueChange={(value) => {
                setClinicState(value);
                setRegistrationDetails({
                  ...registrationDetails,
                  clinicDetails: {
                    ...registrationDetails.clinicDetails,
                    clinicState: value,
                  },
                });
              }}
              isSearchable={true}
              selectedItemStyle={{ fontSize: 16 }}
              disabled={!clinicCountry}
            />
          </View>
          <View>
            <Text style={styles.formText}>
              {translation.screens.unAuthScreens.clinicRegistration.clinicCity}
            </Text>
            <Dropdown
              dropdownStyle={styles.dropdown}
              placeholder={
                translation.screens.unAuthScreens.general.dropdownPlaceholder
              }
              placeholderStyle={{ fontSize: 16 }}
              options={cities}
              selectedValue={clinicCity}
              onValueChange={(value) => {
                setClinicCity(value);
                setRegistrationDetails({
                  ...registrationDetails,
                  clinicDetails: {
                    ...registrationDetails.clinicDetails,
                    clinicCity: value,
                  },
                });
              }}
              isSearchable={true}
              selectedItemStyle={{ fontSize: 16 }}
              disabled={!clinicCountry || !clinicState}
            />
          </View>
        </View>
      )}
      {error && <Error message={error} />}
      {clinicError && <Error message={clinicError} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>
            {translation.screens.unAuthScreens.general.continueButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    backgroundColor: "white",
    borderRadius: 10,
  },
});
