import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';

export default class Header extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                    source={require('../image/logo.png')}
                />
                {/* <Text>sdasd</Text> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    
    logo: {
        
        height : 55,
        resizeMode: 'contain',
        width : 300
        
    },
})