import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Login />
      </SafeAreaProvider>
    </NavigationContainer>   
  );
}

const styles = StyleSheet.create({

});
