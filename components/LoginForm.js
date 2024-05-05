import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { emailValidator, passwordValidator } from "../utils/formatting";
import Error from "./Error";
import { Colours } from "../utils/colours";
import { useLanguage } from "../LanguageContext";

/**
 *
 * @returns LoginForm returns the form for logging in and handles the.
 */

const LoginForm = ({ handleSubmit }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { translation } = useLanguage();

  const data = {
    email: email,
    password: password,
  };

  /**
   *
   * @returns
   */
  const onSubmit = async () => {
    const isEmail = emailValidator(email);
    const isPassword = passwordValidator(password);
    setError(null);
    if (!isEmail) {
      setError(`Email not properly formatted`);
      return;
    }
    if (!isPassword.valid) {
      setError(isPassword.message);
      return;
    }
    try {
      await handleSubmit(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.formText}>Email</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            borderColor: Colours.pontinetInputContainer,
          }}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          placeholder={
            translation.screens.unAuthScreens.general.emailPlaceholder
          }
        />
      </View>
      <View>
        <Text style={styles.formText}>
          {translation.screens.unAuthScreens.general.password}
        </Text>
        <TextInput
          secureTextEntry={true}
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            borderColor: Colours.pontinetInputContainer,
          }}
          onChangeText={setPassword}
          placeholder={
            translation.screens.unAuthScreens.general.passwordPlaceholder
          }
        />
      </View>
      {error && <Error message={error} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>
            {translation.screens.unAuthScreens.general.button}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  button: {
    backgroundColor: Colours.pontinetPrimary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 45,
    width: "55%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  formText: {
    color: Colours.pontinetAccent,
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 12,
  },
});
