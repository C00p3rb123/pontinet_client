import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { login } from '../apis/api';
import { emailValidator, passwordValidator } from '../utils/formatting';
import Error from './Error';
import { Colours } from '../utils/colours';

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();


  const data = {
    email: email,
    password: password
  }

  const onSubmit = async () => {
    const isEmail = emailValidator(email);
    const isPassword = passwordValidator(password);
    console.log(isPassword);
    setError(null)
    if(!isEmail){
      console.log()
      setError(`Email not properly formatted`);
      return
    }
    if(!isPassword.valid){
      setError(isPassword.message)
      return
    }
    try{
      const token = await login(data);
      console.log(token);
    }catch(err) {
      setError(err.message);
    }
    
  }

  return (
    <View style={styles.con}>

        <View>
            <Text style={styles.formText}>Email</Text>
            <TextInput style={{ borderWidth: 1, padding: 5 }} onChangeText={setEmail} placeholder='Enter email address'/>
        </View>
        <View>
        <Text style={styles.formText}>Password</Text>
            <TextInput style={{ borderWidth: 1, padding: 5 }} onChangeText={setPassword} placeholder='Enter password'/>
        </View>
      {error && <Error message={error} />}
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  container:{
    maxWidth: '80%',
  },
  button: {
    backgroundColor: Colours.pontinetPrimary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center'
    

  },
  buttonText: {
    color: 'white',
    textAlign: 'center'

  },
  formText: {
    color: Colours.pontinetAccent,
    fontWeight: 'bold'
  }

})