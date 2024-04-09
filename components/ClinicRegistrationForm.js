import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  TurboModuleRegistry,
} from "react-native";
import { useEffect, useState } from "react";
import Dropdown from "react-native-input-select";
import { Colours } from "../utils/colours";
import Error from "./Error";
import { useLanguage } from "../LanguageContext";
import { useRegistration } from "../RegistrationContext";
import { useNavigation } from "@react-navigation/native";
import Loader from "./Loader";
import axios from "axios";

const ClinicRegistrationForm = () => {
  const [clinicName, setClinicName] = useState("");
  const [clinicCountry, setClinicCountry] = useState("");
  const [clinicState, setClinicState] = useState("");
  const [clinicCity, setClinicCity] = useState("");
  const [error, setError] = useState(false);
  const { translation } = useLanguage();
  const {
    registrationDetails,
    setRegistrationDetails,
    sendRegistrationDetails,
    clearRegistration,
  } = useRegistration();
  const navigation = useNavigation();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {

    async function fetchCountriesData() {

      const response = await axios.get("https://api.countrystatecity.in/v1/countries", { headers: { "X-CSCAPI-KEY": "eWs4OWhpYml3b3U3Umh6aDBxZ2h6Q3hoU0RyQTdhd1BDTW1GYVFJRA==" } });
      const result = response.data;
      const tempData = result.map(e => { return { label: e.name, value: e.name, iso: e.iso2 } })
      setCountries(tempData);
    }

    fetchCountriesData().then().catch();

  }, []);


  useEffect(() => {

    setClinicState("");
    setClinicCity("");
    setStates([]);
    setCities([]);

    if (!clinicCountry.trim()) {
      setStates([]);
      return;
    }

    async function fetchStatesData() {

      const countryISOCode = countries.find(e => e.value === clinicCountry).iso;

      const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryISOCode}/states`, { headers: { "X-CSCAPI-KEY": "eWs4OWhpYml3b3U3Umh6aDBxZ2h6Q3hoU0RyQTdhd1BDTW1GYVFJRA==" } });
      const result = response.data;
      const tempData = result.map(e => { return { label: e.name, value: e.name, iso: e.iso2 } })
      setStates(tempData);
    }


    fetchStatesData().then().catch();

  }, [clinicCountry]);

  useEffect(() => {
    setClinicCity("");
    setCities([]);

    if (!clinicCountry.trim() || !clinicState.trim()) {
      setCities([]);
      return;
    }

    async function fetchCitiesData() {

      const countryISOCode = countries.find(e => e.value === clinicCountry).iso;
      const stateISOCode = states.find(e => e.value === clinicState).iso;

      const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryISOCode}/states/${stateISOCode}/cities`, { headers: { "X-CSCAPI-KEY": "eWs4OWhpYml3b3U3Umh6aDBxZ2h6Q3hoU0RyQTdhd1BDTW1GYVFJRA==" } });
      const result = response.data;
      const tempData = result.map(e => { return { label: e.name, value: e.name } })
      setCities(tempData);
    }


    fetchCitiesData().then().catch();

  }, [clinicState]);


  const onSubmit = async () => {
    if (!clinicName || !clinicCountry || !clinicCity || !clinicState) {
      Alert.alert("Form Incomplete", "Please fill out all the fields.");
      return;
    }

    //Alert.alert(clinicName + " " + clinicCountry + " " + clinicState + " " + clinicCity)
    //return;

    try {
      await sendRegistrationDetails();
      clearRegistration();
      navigation.navigate("Login");
    } catch (error) {
      setError(`${error.response.data.message}. Please contact Pontinet`);
    }
  };

  const onChange = (setter, value, attribute) => {

  }

  if (!countries.length) {
    return <Loader />;
  }

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
               clinicName: value
             }
            }
            )
          }}
        />
      </View>
      <View>
        <Text style={styles.formText}>
          {translation.screens.unAuthScreens.clinicRegistration.clinicCountry}
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
               clinicCountry: value
             }
            }
            )
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
               clinicState: value
             }
            }
            )
          }}
          isSearchable={true}
          selectedItemStyle={{ fontSize: 16 }}
          disabled={!clinicCountry.trim()}
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
               clinicCity: value
             }
            }
            )
          }}
          isSearchable={true}
          selectedItemStyle={{ fontSize: 16 }}
          disabled={!clinicCountry.trim() || !clinicState.trim()}
        />
      </View>
      {error && <Error message={error} />}
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