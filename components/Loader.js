import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colours } from '../utils/colours'

const Loader = () => {
  return (
    <View style={styles.container}> 
     <ActivityIndicator size={"large"} color={Colours.pontinetPrimary} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    }
})