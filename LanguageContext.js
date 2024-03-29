import React, { createContext, useContext, useEffect, useState } from 'react';
import english from "./languages/en-uk.json"
import spanish from "./languages/esp.json"
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [translation, setTranslation] = useState(english)

    const returnLanguage = () => {
        if(language === 'esp'){
            setTranslation(spanish)
            
        }
        else{
            setTranslation(english);
            
        }        
    };
    useEffect(() => {
        returnLanguage();
    }, [])

    return (
        <LanguageContext.Provider value={{ language, translation, returnLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
