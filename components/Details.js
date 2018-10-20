import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native';
import Button from 'react-native-button';
import { HSTHTNScreen } from '../screenNames';
import Header from './Header';
import flatListData from '../data/flatListData';
import { PostWork } from '../networking/Server';
import { refreshDataFromServer } from './HSTHTN';
// import ImagePicker from 'react-native-image-picker';
import UsersMap from './UsersMap'

// const options = {
//     title: 'Select Avatar',
//     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//     storageOptions: {
//         skipBackup: true,
//         path: 'images',
//     },
// };

export default class Details_HSTHTN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            avatarSource1 : null,
            avatarSource2 : null,
        }
    }
    show = () => {
        ImagePicker.showImagePicker(options, (response) => {
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

    render() {
        let img = this.state.avatarSource1 == null ? null : <Image source={this.state.avatarSource1} style={{height : 200,width : 200}} />
        let img2 = this.state.avatarSource2 == null ? null : <Image source={this.state.avatarSource2} style={{height : 100,width : 100}} />

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header />
                </View>
                <View style={styles.bodycontent}>

                    <View style={styles.column1}>

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
                        <UsersMap />
                        <Button style={{ fontSize: 16, color: 'red' }}
                            onPress={() => {
                                if (this.state.result.length == 0) {
                                    alert("Bạn phải điền thông tin kết quả thực hiện");
                                    return;
                                }
                                const result1 = {
                                    key: "",
                                    name: "",
                                    imageUpload: "",
                                    kq: this.state.result,
                                };

                                PostWork(result1).then((result) => {
                                    if (result === 'ok') {
                                        this.props.parentFlatList.refreshDataFromServer();
                                    }
                                });
                            }}
                        >Save
                        </Button>
                        <View >
                            <TouchableOpacity onPress={this.show.bind(this)}>
                                <Text style={{ color: 'red' }}>Take Picture</Text>
                            </TouchableOpacity>
                            {img}
                            {img2}
                        </View>
                    </View>
                    <View style={styles.column2}>
                        <Image style={styles.icon}
                            source={require('../image/running.png')}
                        />

                    </View>

                </View>
                {/* <View style={styles.map1}></View> */}

            </View>
        )
    }
}


const styles = StyleSheet.create({
    map1:{
        
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    firstrowtext: {
        fontWeight: 'bold',
        color: 'green',
        fontSize: 16,
    },

    bodycontent: {
        flex: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 20,
    },
    column1: {
        width: "70%",
        flexDirection: "column",

    },
    column2: {
        flexDirection: "column",

    },
    icon: {
        width: 30,
        height: 30
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 15,
        backgroundColor: "#008b43",
    },
    tab: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: '600',
    },
    content: {


        flex: 85,
    },
    tab1: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#002411',
        padding: 10,
    },
    logo: {
        position: 'absolute',
        width: 200,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab2: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#004b24',
        padding: 10,
    },
    tab3: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#004b24',
        padding: 10,
    },
});