import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Image } from 'react-native';

export default class Splash extends Component {
    constructor(props){
        super(props);
       
    }
    render() {
        return (
            <View style={styles.container}>
              
                
                
                  <Image style={styles.background}
                    source={require('../image/loading.png')}
                    
                />
                <Image style={styles.logo}
                source={require('../image/logo.png')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    background :{
        resizeMode : 'center',
    },
    logo :{
        position: 'absolute',
        width: 200,
        height : 70,
        justifyContent : 'center',
        alignItems : 'center',
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