import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../LanguageContext';

export const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [countryIso, setCountryIso] = useState('') ;
    const [error, setError] = useState('');
    const {translation} = useLanguage();

    const apiKey = process.env.EXPO_PUBLIC_CSCAPI_KEY
    const fetchCountriesData = async () => {
        
        try{
            const response = await axios.get(
                "https://api.countrystatecity.in/v1/countries",
                {
                  headers: {
                    "X-CSCAPI-KEY": apiKey,
                  },
                }
              );
              const result = response.data;
              const tempData = result.map((country) => {
                return { label: country.name, value: country.name, iso: country.iso2 };
              });
              setCountries(tempData);
        }catch(err){
            setError(translation.screens.unAuthScreens.clinicRegistration.noCountries);
        }
        
      }
    
      const  fetchStatesData = async (country) => {
        try{
            setCities([]);
            setStates([]);
            setCountryIso('')
            const countryISOCode = countries.find(
              (e) => e.value === country
            ).iso;
            const response = await axios.get(
              `https://api.countrystatecity.in/v1/countries/${countryISOCode}/states`,
              {
                headers: {
                  "X-CSCAPI-KEY": apiKey,
                },
              }
            );
            const result = response.data;

            const tempData = result.map((state) => {
              return {  label: state.name, value: state.name, iso: state.iso2 };
            });
            setStates(tempData);
            setCountryIso(countryISOCode);
            setError('');
          }catch(err){
            setError(translation.screens.unAuthScreens.clinicRegistration.noCountries);
          }
        }
       
    
      const fetchCitiesData = async (state) => {
        try{
            const stateISOCode = states.find((e) => e.value === state).iso;
    
            const response = await axios.get(
              `https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateISOCode}/cities`,
              {
                headers: {
                  "X-CSCAPI-KEY": apiKey,
                },
              }
            );
            const result = response.data;
            const tempData = result.map((city) => {
              return { label: city.name, value: city.name, };
            });
            setCities(tempData);
            
        }catch(err){
            setError(translation.screens.unAuthScreens.clinicRegistration.noCountries);
        }
      
      }
      useEffect( () => {
       fetchCountriesData()
      },[])
      
      return {fetchCountriesData, fetchStatesData, fetchCitiesData, countries, states, cities, error}
}



