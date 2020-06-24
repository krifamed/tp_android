import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default class Spinner extends React.Component{
  render(){
    return(
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#ff5a66" />
      </View>
    );
  }
}
const styles= StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center'
},
});
