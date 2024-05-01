import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colours } from "../utils/colours";
import { useNavigation } from "@react-navigation/native";

const PageTitle = ({ title, showBackButton = true }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/BackButton.png")} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 15,
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    color: Colours.black,
  },
});
