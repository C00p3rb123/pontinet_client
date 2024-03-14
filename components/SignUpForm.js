import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import Error from "./Error";
import { emailValidator, passwordValidator } from "../utils/formatting";
import { Colours } from "../utils/colours";

const SignUpForm = ({ onSignUpSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = () => {
        const emailValid = emailValidator(email);
        const passwordValid = passwordValidator(password);

        if (!emailValid) {
            setError("Invalid email format");
            return;
        }

        if (!passwordValid.valid) {
            setError(passwordValid.message);
            return;
        }

        // If everything is valid, you can handle the sign-up logic here
        console.log("Signed up with:", email, password);
        onSignUpSuccess(); // Call the prop function to handle successful sign up
    };

    return (
        <View style={styles.container}>
            {/* Email Input */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {/* Password Input */}
            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
            />
            {/* Error Message */}
            {error && <Error message={error} />}
            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
    },
    label: {
        color: Colours.pontinetAccent,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: Colours.pontinetInputContainer,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: Colours.pontinetPrimary,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default SignUpForm;
