import React, { createContext, useContext, useEffect, useState } from "react";
import english from "./languages/en-uk.json";
import spanish from "./languages/esp.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
    const [registrationDetails, setRegistrationDetails] = useState({
        email: '',
        password: '',
        mobile: '',
        type: '',
        clinicId: '',
        registrationDetails: {
            name: '', 
            specialisation: '', 
            subSpecialisation: '',
            registrationId: '',
            registrationCouncil: '',
            mobileNumber: ''
        },
        clinicDetails: { // Add clinic details here
            clinicName: '',
            clinicCountry: '',
            clinicCity: '',
            clinicSuburb: ''
        }
    });

    //TODO: Improve password security

    return (
        <RegistrationContext.Provider
          value={{ registrationDetails, setRegistrationDetails }}
        >
          {children}
        </RegistrationContext.Provider>
      );
};