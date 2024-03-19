import React from 'react';
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import Signup from "./screens/SignUp"; // Ensure this matches the export name
import { StyleSheet } from 'react-native';

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
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // This line hides the header
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
      </Stack.Navigator>
    </SafeAreaProvider>
  </NavigationContainer>  
  )
}

const styles = StyleSheet.create({

});


//   <NavigationContainer>
      // <SafeAreaProvider>
        {/* <Stack.Navigator */}
          // initialRouteName="Login"
          // screenOptions={{
            // headerShown: false, // This line hides the header
          // }}
        // >
          {/* <Stack.Screen name="Login" component={Login} /> */}
          {/* <Stack.Screen name="SignUp" component={Signup} /> */}
        {/* </Stack.Navigator> */}
      {/* </SafeAreaProvider> */}
    // </NavigationContainer>   