import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions } from "react-native";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { useAuth } from "../AuthContext";

const AuthHeader = () => {
  const {translation} = useLanguage()
  const screenWidth = Dimensions.get("window").width;
  const {user} = useAuth()
  return (
    <SafeAreaView>
      <View style={[styles.container, {width:screenWidth}]}>
        <View>
          <Image source={require("../assets/pontinet_logo_small.png")} />
        </View>
        <View style ={styles.profile}>
          <Image source={require("../assets/Vector.png")} />
          <Text> {translation.screens.authScreens.general.hello}, {user.name} </Text>
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
        paddingLeft: 5,
        paddingRight: 10
    },
    profile:{
        flexDirection: 'row',
        alignItems: 'center'
    }
});

