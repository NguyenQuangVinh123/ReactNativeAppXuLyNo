import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native';
import Button from 'react-native-button';
import { HSTHTNScreen } from '../screenNames';
import Header from './Header';
import flatListData from '../data/flatListData';
import { PostWork } from '../networking/Server';
import { refreshDataFromServer } from './HSTHTN';
// import ImagePicker from 'react-native-image-picker';
import FetchLocation from './FetchLocation';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';

import UsersMap from './UsersMap'

const options = {
    title: 'Chọn loaị',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class Details_HSTHTN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            // avatarSource: null,
            avatarSource1: null,
            userLocation: null
        }

    }

    getUserLocationHandler = () => {
        // navigator.geolocation.getCurrentPosition(position =>{
        //   console.log(position);
        // }, err => console.log(err));
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                userLocation: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            });
            // fetch('', {
            //     method: "POST",
            //     body: JSON.stringify({
            //         latitude: position.coords.latitude,
            //         longitudeitude: position.coords.longitude,
            //     })
            // })
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err))

        }
            , err => console.log(err));
    }


    // show = (x) => {
    //     // var x = [];
    //     ImagePicker.openCamera({
    //         width: 100,
    //         height: 100,
    //         cropping: true,
    //         mediType  : 'photo'
    //     }).then(image => {
    //        const test = image.path;
    //         console.log(test);
    //         // alert(image);
    //         // var img = <Image source={
    //         //     "file:///data/user/0/com.appxulyno_final/cache/react-native-image-crop-picker/5a7844f5-50ed-436d-90c4-4c2048d0fd10.jpg"
    //         // } style={{ height: 200, width: 200 }} />
    //         // x.push(image.path);
    //         // this.setState({ result: 'a' })
    //     });
    //     //   return x;
    // }
    imagepickershow = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log(response.path);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource1: source,
                });
            }
        });
    }
    back = () => {
        this.props.navigation.goBack();
    }

    render() {
        let img = this.state.avatarSource1 == null ? null : <Image source={this.state.avatarSource1} style={{ height: 200, width: 200 }} />

        let img2 = this.state.avatarSource2 == null ? null : <Image source={this.state.avatarSource2} style={{ height: 100, width: 100 }} />
        var arr = []
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header />
                </View>
                <View style={styles.tab}>

                    <Button style={styles.tab1}
                        disabled={true}
                    >HS TH TRONG NGÀY</Button>
                    <Button
                        disabled={true}

                        style={styles.tab2} onPress={() => {
                            navigation.navigate(HSTDScreen);
                        }}>
                        HS TỒN ĐỌNG
                        </Button>
                    <Button
                        disabled={true}
                        style={styles.tab3} onPress={() => {
                            navigation.navigate(HSSTHScreen);
                        }}>
                        HS SẼ THỰC HIỆN
                        </Button>
                    {/* <TabNavigatorTest /> */}
                    {/* <TabNavigatorTestABC /> */}

                </View>
                <View style={styles.bodycontent}>
                    {/* <View style={{ flexDirection: "row" }}>

                    </View> */}
                    <View style={styles.column1}>
                        <TouchableOpacity onPress={this.back} style={{ paddingLeft: 10, paddingBottom: 10 }}>

                            <Image
                                source={require('../image/backarrow.png')}
                                style={{ width: 35, height: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: "#579631" }}>CIF 0001</Text>

                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{ paddingRight: 40 }}>
                                <Text style={{ color: "black", fontWeight: "bold" }}>Tên:</Text></View><View style={{ fontWeight: "normal" }}><Text>Nguyễn Văn A</Text></View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ paddingRight: 20 }}><Text style={{ color: "black", fontWeight: "bold" }}>Địa chỉ:</Text></View>
                            <View style={{ fontWeight: "normal" }}><Text style={{ fontWeight: "normal" }}>350/2 Nguyễn Văn Lượng,p16,quận Gò Vấp, TPHCM</Text></View>
                        </View>


                        <Text style={{ color: "black", fontWeight: "bold" }}>Phương án: <Text style={{ fontWeight: "normal" }}>Đôn đốc</Text></Text>
                        <TextInput style={{ height: 100, width: "90%", borderColor: 'red', borderWidth: 1 }}
                            onChangeText={(text) => this.setState(() => {
                                return {
                                    result: text
                                };
                            })}
                            multiline={true} autoFocus={false} returnKeyType="done" onSubmitEditing={Keyboard.dismiss}
                        />
                    </View>
                </View>
            </View>
        )
    }