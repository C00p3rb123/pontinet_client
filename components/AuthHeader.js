import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import { useLanguage } from "../LanguageContext";

const AuthHeader = () => {
  const {translation} = useLanguage()
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Image source={require("../assets/pontinet_logo_small.png")} />
        </View>
        <View style ={styles.profile}>
          <Image source={require("../assets/Vector.png")} />
          <Text> {translation.screens.authScreens.hello}, Rachel </Text>
          <Image source={require("../assets/profile_pic.png")} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'100%',
        paddingVertical: 5,
    },
    profile:{
        flexDirection: 'row',
        alignItems: 'center'
    }
});

