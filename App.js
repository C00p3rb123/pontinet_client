import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import ClinicRegistration from "./screens/ClinicRegistration";
import CaseSelecton from "./screens/CaseSelection";
import CaseInformation from "./screens/CaseInformation";
import { StyleSheet, Image } from "react-native";

const Stack = createStackNavigator();
import { AuthProvider, useAuth } from "./AuthContext";
import UnAuthHeader from "./components/UnAuthHeader";
import AuthHeader from "./components/AuthHeader";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import LanguageSelection from "./screens/LanguageSelection";

const Tab = createBottomTabNavigator();
import Settings from "./screens/Settings";
import MedicalRegistration from "./screens/MedicalRegistration";
import { RegistrationProvider } from "./RegistrationContext";
import CaseSubmission from "./screens/CaseSubmission";
import CaseHistory from "./screens/CaseHistory";
import CaseReadOnly from "./screens/CaseReadOnly";

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <RegistrationProvider>
          <Layout />
        </RegistrationProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
export const Layout = () => {
  const { authState } = useAuth();
  const { isLanguageSet } = useLanguage();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <SafeAreaProvider>
          {authState.authenticated ? (
            <NavigationBar />
          ) : (
            <Stack.Navigator>
              <Stack.Group
                screenOptions={{
                  headerTitleAlign: 'center',
                  headerTitle: () => <UnAuthHeader />,
                  headerShadowVisible: false,
                }}
              >
                {!isLanguageSet && (
                  <Stack.Screen
                    name="LanguageSelection"
                    component={LanguageSelection}
                    options={{
                      headerBackImage: () => (
                        <Image
                          source={require("./assets/BackButton.png")}
                          style={{ marginLeft: 15 }}
                        />
                      ),
                      headerBackTitleVisible: false,
                    }}
                  />
                )}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                options={{
                  headerBackImage: () => (
                    <Image
                      source={require("./assets/BackButton.png")}
                      style={{ marginLeft: 15 }}
                    />
                  ),
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="MedicalRegistration"
                component={MedicalRegistration}
                options={{
                  headerBackImage: () => (
                    <Image
                      source={require("./assets/BackButton.png")}
                      style={{ marginLeft: 15 }}
                    />
                  ),
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="ClinicRegistration"
                component={ClinicRegistration}
                  options={{
                    headerBackImage: () => (
                      <Image
                        source={require("./assets/BackButton.png")}
                        style={{ marginLeft: 15 }}
                      />
                    ),
                    headerBackTitleVisible: false,
                  }}
                />
              </Stack.Group>
            </Stack.Navigator>
          )}
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export const NavigationBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        header: () => <AuthHeader />,
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 20 }
      }}
    >
      <Tab.Screen 
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: () => <Image source={require("./assets/home_button.png")} />,
        }}
      />
      <Tab.Screen 
        name="SettingsPage"
        component={SettingsPage}
        options={{
          tabBarIcon: () => <Image source={require("./assets/settings_button.png")} />,
        }}  
      />
    </Tab.Navigator>
  );
};

export const HomePage = () => {
  return (
    <Stack.Navigator
    initialRouteName="Dashboard"
      screenOptions={{
        header: () => null,
        headerShadowVisible: false,
      }}
    >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="CaseSelection"
          component={CaseSelecton} 
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen
          name="CaseInformation"
          component={CaseInformation}
          options={{ headerLeft: () => null }}
        />
         <Stack.Screen
          name="CaseSubmission"
          component={CaseSubmission}
          options={{ headerLeft: () => null, gestureEnabled: false }}
        />
          <Stack.Screen
          name="CaseHistory"
          component={CaseHistory}
          options={{ headerLeft: () => null }}
        />
          <Stack.Screen
          name="CaseReadOnly"
          component={CaseReadOnly}
          options={{ headerLeft: () => null }}
        />
    </Stack.Navigator>
  )
}

export const SettingsPage = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        header: () => null,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen
        name="LanguageSelection"
        component={LanguageSelection}
        options={{
          headerBackImage: () => (
            <Image
              source={require("./assets/BackButton.png")}
              style={{ marginLeft: 15 }}
            />
          ),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
