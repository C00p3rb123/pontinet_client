import React, { createContext, useState, useContext, Children } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        token: null,
        authenticated: false,
    });

   
    const login = async (data) => {
        const url = process.env.EXPO_PUBLIC_LOGIN_URL;
        try {
            const response = await axios.post(url, data);
            setAuthState({
                token: response.data.token,
                authenticated: true,
                
            });
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            await SecureStore.setItemAsync(
                process.env.EXPO_PUBLIC_TOKEN_KEY,
                response.data.token
            );
            
            return response;
        } catch (err) {
            console.log(err);
            throw new Error("Unable to login");
        }
        
    };
    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync(EXPO_PUBLIC_TOKEN_KEY);
            axios.defaults.headers.common["Authorization"] = "";
            setAuthState({
                token: null,
                authenticated: false,
            });
        } catch (err) {
            console.log(err);
            throw new Error("Unable to logout");
        }
    };
    const value = {
        login: login,
        logout: logout,
        authState: authState,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

    
};

export const useAuth = () => {
    return useContext(AuthContext);
};
