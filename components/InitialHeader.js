import { StyleSheet, View, Image } from 'react-native'
import React from 'react'

const InitialHeader = () => {
  return (
   
       <View style={styles.container}>
            <Image source={require('../assets/pontinet_logo.png')}>
            </Image>
        </View>    
  )
}

export default InitialHeader

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:10
  }
  
})