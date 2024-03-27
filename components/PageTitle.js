import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colours } from '../utils/colours'

const PageTitle = ({title}) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/BackButton.png")} />
      <Text style= {styles.title}>{title}</Text>
    </View>
  )
}

export default PageTitle

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        paddingLeft: 15,
        gap: 8
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: Colours.black,
    }
})