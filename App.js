/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions} from 'react-native';
import HSTHTN from './components/HSTHTN';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';
import {StackNavigator } from 'react-navigation';
import Login from './components/login/Login'
import TestABCD from './components/TestABCD'
type Props = {};
const Application = StackNavigator({
    Home : {screen : Login},
    TestABCD : {screen :  TestABCD}},{
      navigationOptions:{
        header :null,
      }
    }
);
export default class App extends Component<Props> {
  
  
  render() {
    return (
        <Application />
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
