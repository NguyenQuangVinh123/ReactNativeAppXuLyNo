import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';

export default class Header extends Component {
   
    logout = () => {
        console.log("abc")
        alert("abc");
        // this.props.navigation.goBack();
      };
    
    render() {
        
        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                    source={require('../image/logo.png')}
                />
                <View style={{ width: 20, height: 20, position:'absolute',bottom:20,left:"95%"}}>
                    <TouchableOpacity
                    onPress={this.logout }
                    style={{ paddingLeft: 15,position:'absolute',bottom:20}}
                    >
                    <Image
                        source={require("../image/logout.png")}
                        style={{ width: 20, height: 20}}
                    />
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    logo: {
        
        height : 55,
        resizeMode: 'contain',
        width : 200,
        paddingTop: 20,
        paddingBottom : 20,
    },
})