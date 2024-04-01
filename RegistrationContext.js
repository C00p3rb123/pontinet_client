import React, { createContext, useContext, useEffect, useState } from "react";
import english from "./languages/en-uk.json";
import spanish from "./languages/esp.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);
const url = process.env.EXPO_PUBLIC_REGISTER_URL;

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

  const sendRegistrationDetails = async () => {
    await axios.post(url, registrationDetails);
  };

  //TODO improve password security

  return (
    <RegistrationContext.Provider
      value={{
        registrationDetails,
        setRegistrationDetails,
        sendRegistrationDetails,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
