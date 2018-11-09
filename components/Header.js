import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator, createStackNavigator, createTabNavigator, TabBarBottom, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Login from './login/Login'
import { HSTDScreen, HSSTHScreen, DetailsScreen,LoginScreen } from '../screenNames';

import App from '../App';
import {Application} from '../App'
export default class Header extends Component {
   
    logout = () => {
        AsyncStorage.clear();
        this.props.parent.navigate("Home");
      };
    
    render() {
        
        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                    source={require('../image/logo.png')}
                />
                <View style={{  position:'absolute',bottom:20,left:"50%"}}>
                    <TouchableOpacity
                    onPress={this.logout}
                    style={{ paddingLeft: 15,position:'absolute',bottom:20}}
                    >
                    <Image
                        source={require("../image/logout.png")}
                        style={{ width: 25, height: 25}}
                    />
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
   
    logo: {
        
        height : 50,
        resizeMode: 'contain',
        width : 200,
        marginTop: 20,
        marginBottom : 20,
    },
})