import { StyleSheet, View, Image } from 'react-native'
import React from 'react'

const AccountHeader = () => {
  return (
   
       <View style={styles.container}>
            <Image source={require('../assets/pontinet_logo.png')}>
            </Image>
        </View>    
  )
}

export default AccountHeader

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:10
  }
  
})