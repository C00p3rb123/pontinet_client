import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import CaseSelecton from "./screens/CaseSelection";
import CaseInformation from "./screens/CaseInformation";
import { StyleSheet, Image } from "react-native";

const Stack = createStackNavigator();
import { AuthProvider, useAuth } from "./AuthContext";
import UnAuthHeader from "./components/UnAuthHeader";
import AuthHeader from "./components/AuthHeader";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import LanguageSelection from "./screens/LanguageSelection";

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Layout></Layout>
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
        <Stack.Navigator>
          {authState.authenticated ? (
            <Stack.Group
              screenOptions={{
                headerTitle: () => <AuthHeader />,
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen name="CaseSelection" component={CaseSelecton} />
              <Stack.Screen
                name="CaseInformation"
                component={CaseInformation}
                options={{ headerLeft: () => null }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group
              screenOptions={{
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
                component={Signup}
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
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
