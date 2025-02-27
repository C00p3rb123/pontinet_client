import React, { createContext, useContext, useEffect, useState } from "react";
import english from "./languages/en-uk.json";
import spanish from "./languages/esp.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const RegistrationContext = createContext();
//Hook to use the registration context.

export const useRegistration = () => useContext(RegistrationContext);
const url = process.env.EXPO_PUBLIC_REGISTER_URL;
//RegistrationProvider component to manage registration state and provide context.
export const RegistrationProvider = ({ children }) => {
  const [registrationDetails, setRegistrationDetails] = useState({
    email: "",
    password: "",
    mobile: "",
    type: "",
    clinicId: "",
    registrationDetails: {
      name: "",
      specialisation: "",
      subSpecialisation: "",
      registrationId: "",
      registrationCouncil: "",
      mobileNumber: "",
    },
  });
  //Sends the registration details to the server.
  const sendRegistrationDetails = async () => {
    await axios.post(url, registrationDetails);
  };
  //Clears the registration details state.
  const clearRegistration = () => {
    setRegistrationDetails({
      email: "",
      password: "",
      mobile: "",
      type: "",
      clinicId: "",
      registrationDetails: {
        name: "",
        specialisation: "",
        subSpecialisation: "",
        registrationId: "",
        registrationCouncil: "",
        mobileNumber: "",
      },
      clinicDetails: {
        clinicName: "",
        clinicCountry: "",
        clinicState: "",
        clinicCity: "",
      },
    });
  };
  //TODO improve password security

  return (
    <RegistrationContext.Provider
      value={{
        registrationDetails,
        setRegistrationDetails,
        sendRegistrationDetails,
        clearRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
