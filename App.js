import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login";
import SignUp from "./screens/Registration/SignUp";
import Dashboard from "./screens/Dashboard";
import ClinicRegistration from "./screens/Registration/ClinicRegistration";
import CaseSelecton from "./screens/Cases/CaseSelection";
import CaseReply from "./screens/Cases/CaseReply";
import { StyleSheet, Image, Platform } from "react-native";
import { AuthProvider, useAuth } from "./AuthContext";
import UnAuthHeader from "./components/Headers/UnAuthHeader";
import AuthHeader from "./components/Headers/AuthHeader";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import LanguageSelection from "./screens/LanguageSelection";
import Settings from "./screens/Settings";
import MedicalRegistration from "./screens/Registration/MedicalRegistration";
import { RegistrationProvider } from "./RegistrationContext";
import CaseSubmission from "./screens/Cases/CaseSubmission";
import CaseHistory from "./screens/Cases/CaseHistory";
import CaseResponse from "./screens/Cases/CaseResponse";

//Main application component.
//Wraps the application with providers for authentication, language, and registration contexts.
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
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
//Layout component to manage navigation based on authentication and language selection status.
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
                headerTitleAlign: "center",
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
//Navigation bar component for authenticated users.
//Provides bottom tab navigation with icons.
export const NavigationBar = () => {
  return (
    <Tab.Navigator
      firstRoute="HomePage"
      screenOptions={{
        header: () => <AuthHeader />,
        tabBarShowLabel: false,
        tabBarStyle: { height: 60, paddingTop: Platform.OS === "ios" ? 20 : 0 },
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Dashboard");
          },
        })}
        options={{
          tabBarIcon: () => (
            <Image
              style={{ height: 30, width: 30 }}
              source={require("./assets/home_button.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsPage"
        component={SettingsPage}
        options={{
          tabBarIcon: () => (
            <Image
              style={{ height: 35, width: 35 }}
              source={require("./assets/settings_button.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
//Home page component.
//Manages navigation stack for home-related screens.
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
        name="CaseReply"
        component={CaseReply}
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
        name="CaseResponse"
        component={CaseResponse}
        options={{ headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
};
//Settings page component.
//Manages navigation stack for settings-related screens.
export const SettingsPage = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        header: () => null,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
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
};

const styles = StyleSheet.create({});
