import React from 'react';
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import Signup from "./screens/SignUp"; // Ensure this matches the export name

const Stack = createStackNavigator();
import { AuthProvider, useAuth } from "./AuthContext";

export default function App() {
  
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
      
  );
}
export const Layout = () => {
  const {authState, logout} = useAuth();
  return(
    <NavigationContainer>
        <SafeAreaProvider>
          <Login />
        </SafeAreaProvider>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({

});
