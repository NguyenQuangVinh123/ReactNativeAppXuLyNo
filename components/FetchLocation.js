import React, { Component } from 'react';
import { Button,Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native';

const fetchLocation = props =>{

    return(
        <View>
        <Button   onPress= {props.onGetLocation} title="Get Location" />
           
    
        </View>
    );
};

export default fetchLocation;