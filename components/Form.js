import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React from 'react'

const Form = ({titles}) => {
  return (
    <View>
      {titles.map((header) => (
        <View>
            <Text>{header}</Text>
            <TextInput style={{ borderWidth: 1, padding: 5 }}/>
        </View>
      ))}
      <Button title="Confirm" onPress={() => console.log('Submitted')} />
    </View>
  )
}

export default Form

const styles = StyleSheet.create({})