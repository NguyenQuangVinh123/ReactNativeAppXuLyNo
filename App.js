/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions} from 'react-native';
import HSTNTN from './components/HSTHTN';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';


type Props = {};
export default class App extends Component<Props> {
  
  // state = {
  //   userLocation: null
  // }
  // getUserLocationHandler = () => {
  //   // navigator.geolocation.getCurrentPosition(position =>{
  //   //   console.log(position);
  //   // }, err => console.log(err));
  //   navigator.geolocation.getCurrentPosition(position => {
  //     this.setState({
  //       userLocation: {
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }
  //     });
      // fetch('',{
      //    method : "POST",
      //    body : JSON.stringify({
      //     latitude: position.coords.latitude,
      //     longitudeitude: position.coords.longitude,
      //    })
      // })
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
      
  //   }
  //   , err => console.log(err));
  // }
  render() {
    return (
      <View style={styles.container}>
        {/* <HSTNTN /> */}
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation={this.state.userLocation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
