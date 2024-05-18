import React, {
  createContext,
  useState,
  useContext,
  Children,
  useEffect,
} from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();
// AuthProvider component to manage authentication state and provide context.
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    const retrieveTokenFromStorage = async () => {
      try {
        const token = await SecureStore.getItemAsync(
          process.env.EXPO_PUBLIC_TOKEN_KEY
        );
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({
            token: token,
            authenticated: true,
          });
          const userDetails = await axios.get(process.env.EXPO_PUBLIC_USER_URL);
          setUser({
            name: userDetails.data.name,
            clinic: userDetails.data.clinic,
            country: userDetails.data.country,
          });
        }
      } catch (err) {
        console.error(err);
        throw new Error("Unable to retrieve token from storage");
      }
    };
    retrieveTokenFromStorage();
  }, []);
  //Function to handle user login.
  const login = async (data) => {
    const url = process.env.EXPO_PUBLIC_LOGIN_URL;
    try {
      const response = await axios.post(url, data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync(
        process.env.EXPO_PUBLIC_TOKEN_KEY,
        response.data.token
      );
      await setAuthState({
        token: response.data.token,
        authenticated: true,
      });
      const userDetails = await axios.get(process.env.EXPO_PUBLIC_USER_URL);
      await setUser({
        name: userDetails.data.name,
        clinic: userDetails.data.clinic,
        country: userDetails.data.country,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Unable to login");
    }
  };
  //Function to handle user logout.
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY);
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
    user: user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
//Hook to use the authentication context.
export const useAuth = () => {
  return useContext(AuthContext);
};
