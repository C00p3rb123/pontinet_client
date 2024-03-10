import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import { login } from '../apis/api';
import { emailValidator, passwordValidator } from '../utils/formatting';
import Error from './Error';

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
    <View>      
        <View>
            <Text>Email</Text>
            <TextInput style={{ borderWidth: 1, padding: 5 }} onChangeText={setEmail}/>
        </View>
        <View>
        <Text>Password</Text>
            <TextInput style={{ borderWidth: 1, padding: 5 }} onChangeText={setPassword}/>
        </View>
      {error && <Error message={error} />}
      <Button title="Confirm" onPress={onSubmit} />
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({

})