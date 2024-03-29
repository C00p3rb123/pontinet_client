import React, { createContext, useContext, useEffect, useState } from "react";
import english from "./languages/en-uk.json";
import spanish from "./languages/esp.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const en = 'en'
  const esp = 'esp'  
  const resources = {
   en: english,
   esp: spanish
  }
  const [language, setLanguage] = useState(en);
  const [translation, setTranslation] = useState(english);
  const [isLanguageSet, setIsLanguageSet] = useState(false);
  const localStorageKey = `language`;

  const manageTranslation = async (language) => {
    if (language === en) {
      setTranslation(english);
      setIsLanguageSet(true);
      try {
        await AsyncStorage.setItem(localStorageKey, language);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setTranslation(spanish);
      setIsLanguageSet(true)
      try {
        await AsyncStorage.setItem(localStorageKey, language);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const retrieveLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem(localStorageKey);
      if (value !== null) {
        setIsLanguageSet(true);
        setTranslation(resources[value])
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const changeLanguage = (language) => {
    if(language === en){
        setLanguage(esp)
    }
    else{
        setIsLanguageSet(en)
    }
  }
  const clearLanguage = async () =>{
    try {
        await AsyncStorage.setItem(localStorageKey, '');
      } catch (err) {
        console.log(err.message);
      }
  }
  useEffect(() => {
    retrieveLanguage()
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, translation, manageTranslation, isLanguageSet }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
