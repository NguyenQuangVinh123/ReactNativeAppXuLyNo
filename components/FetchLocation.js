import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native';

const fetchLocation = props => {

    return (
        

        <View style={styles.takepicture}>
            <TouchableOpacity style={{
                flexDirection: "row",
                justifyContent: 'space-around',
                alignItems: 'center',
              

            }} onPress={props.onGetLocation} >
                <Image
                    source={require('../image/location.png')}
                    style={{ width: 28, height: 40 }} />
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>VỊ TRÍ TÀI SẢN</Text>
            </TouchableOpacity>

        </View>
    );
};
const styles = StyleSheet.create({
    takepicture: {
        padding: 10,
        backgroundColor: "#00783d",
        marginTop: 10,

    },
})
export default fetchLocation;