import React, { createContext, useContext, useEffect, useState } from "react";
import english from "./languages/en-uk.json";
import spanish from "./languages/esp.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext();
//Hook to use the language context.

export const useLanguage = () => useContext(LanguageContext);
//LanguageProvider component to manage language state and provide context.

export const LanguageProvider = ({ children }) => {
  const en = "en";
  const esp = "esp";
  const resources = {
    en: english,
    esp: spanish,
  };
  const [language, setLanguage] = useState(en);
  const [translation, setTranslation] = useState(english);
  const [isLanguageSet, setIsLanguageSet] = useState(false);
  const localStorageKey = `language`;
  // Manages translation based on the selected language.
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
      setIsLanguageSet(true);
      try {
        await AsyncStorage.setItem(localStorageKey, language);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  //Retrieves the stored language from AsyncStorage.
  const retrieveLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem(localStorageKey);
      if (value !== null) {
        setIsLanguageSet(true);
        setTranslation(resources[value]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  //Changes the current language.
  const changeLanguage = (language) => {
    if (language === en) {
      setTranslation(spanish);
      setLanguage(esp);
    } else {
      setTranslation(english);
      setLanguage(en);
    }
    setIsLanguageSet(true);
  };
  //Clears the stored language from AsyncStorage.
  const clearLanguage = async () => {
    try {
      await AsyncStorage.setItem(localStorageKey, "");
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    retrieveLanguage();
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, translation, manageTranslation, isLanguageSet }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
