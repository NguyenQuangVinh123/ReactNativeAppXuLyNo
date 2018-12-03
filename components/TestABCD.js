import React, { Component } from 'react';
import {SafeAreaView,Platform,View,TouchableOpacity,Text,StyleSheet,Image} from 'react-native';
import { TabNavigatorTest } from '../index';
import Button from 'react-native-button';
import Header from './Header';

export default class TestABCD extends Component {
    
    render() {
        return (
            <View style={styles.container}>
       
       <View style={styles.header}>
                    <Header parent = {this.props.navigation} />
                </View>
                
                <TabNavigatorTest 
                    
                />   
                {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Home")}}>
                    <Text>Go Back</Text>
                </TouchableOpacity> */}
                </View>
           
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo: {      
        height : 50,
        resizeMode: 'contain',
        width : 200,
        marginTop: 50,
        marginBottom : 20,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        // flex:  Platform.OS === "ios" ? 0.5 : 1,
        backgroundColor: "#008b43",
    },

})



