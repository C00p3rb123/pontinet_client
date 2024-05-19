import { StyleSheet, Text, View } from "react-native";
import React from "react";
//Error component to display error messages.
const Error = ({ message }) => {
  return (
    <View>
      <Text style={styles.error}>{message}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
