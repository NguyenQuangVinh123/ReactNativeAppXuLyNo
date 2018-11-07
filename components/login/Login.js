import React, { Component } from 'react';
import {
    Alert,
    Platform, StyleSheet, Keyboard,
    TouchableWithoutFeedback, StatusBar, Text,
    SafeAreaView, View, Image, TextInput,
    TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Button
} from 'react-native';
import { HSTDScreen, HSTHTNScreen, HSSTHScreen, DetailsScreen, LoginScreen } from '../../screenNames';
import { createStackNavigator } from 'react-navigation';
import { LoginStack } from '../../index'
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import HSSTH from '../HSSTH';
import CryptoJS from 'crypto-js';
// import TestABCD from '../TestABCD'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            encrypted: '',
        }
    }
    // goToHSTNTN = () => {
    //     const { navigation } = this.props;
    //     navigation.push({ HSTNTN: HSTDScreen });
    // }    

    _signIn = () => {
         let pass = this.encryptFun(this.state.password);
         pass = (pass + " ").trim();
         let g = pass;
         console.log(pass);
        const { email, password } = this.state
        const userId = this.state.email;
        AsyncStorage.setItem('userId', userId);
        // const saveUserId = async userId => {
        //     try {
        //         await AsyncStorage.setItem('userId', userId);

        //     } catch (error) {
        //         // Error retrieving data
        //         console.log(error.message);
        //     }
        // };
        // console.log(saveUserId);

        fetch("http://10.160.4.49:8822/Login", {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": this.state.email,
                "password": g
            })


        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                console.log(responseJson.result);

                if (responseJson.result == 1) {
                  
                  

                    const sessionID = responseJson.Data.sessionCode;
                   
                    AsyncStorage.setItem('sessionID', sessionID);

                    return this.props.navigation.navigate('TestABCD');



                } else {
                    Alert.alert("Xin vui lòng nhập lại đúng password hoặc email")

                }



            })

            .catch(
                (err) => {
                    console.log(err);
                })

    }

    encryptFun(data) {
        var key = CryptoJS.enc.Latin1.parse('99XuLyN0@OCB2018');
        var iv = CryptoJS.enc.Latin1.parse('13579abc@EFG2468');
        var pass = CryptoJS.AES.encrypt(
            data,
            key,
            {
                iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
            });
        return pass;
        // alert( encrypted);
        // var decrypted = CryptoJS.AES.decrypt(encrypted,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
        // console.log('decrypted: '+decrypted.toString(CryptoJS.enc.Utf8));
    }


    componentDidMount() {
        this.encryptFun();
    }
    // _loadInitialState = async () => {
    //     var value = await AsyncStorage.getItem('email');
    //     if (value !== null) {
    //         this.props.navigation.navigate("TestABCD");
    //     }
    // }
    render() {
        return (
            <KeyboardAvoidingView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
                style={styles.container}
                behavior="padding"
            >
                <StatusBar hidden />
                <View style={styles.logoWrapper}>
                    <Image resizeMode="stretch" source={require('../../image/logo_green.png')} style={styles.logo} />
                </View>

                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.form}>
                        <Text style={styles.title}>VUI LÒNG ĐIỀN THÔNG TIN ĐĂNG NHẬP</Text>
                        <TextInput
                            placeholder="TÊN ĐĂNG NHẬP"
                            style={styles.input}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onChangeText={email => this.setState({ email })}
                            onSubmitEditing={() => this.passwordDom.focus()}
                            placeholderTextColor="#05713a"
                        />
                        <TextInput
                            ref={ref => {
                                this.passwordDom = ref;
                            }}
                            placeholder="MẬT KHẨU"
                            style={styles.input}
                            secureTextEntry
                            returnKeyType="go"
                            onChangeText={password => this.setState({ password })}
                            onSubmitEditing={this._signIn}
                            placeholderTextColor="#05713a"
                        />
                        <TouchableOpacity style={styles.submit} onPress={() => {
                            this._signIn()
                            if (this.state.password.length == 0 && this.state.email.length == 0) {
                                Alert.alert("Vui lòng nhập email và password")
                            }
                            if (this.state.password.length == 0 && this.state.email.length != 0) {
                                Alert.alert("Xin vui lòng nhập password ")

                            }
                            if (this.state.email.length == 0 && this.state.password.length != 0) {
                                Alert.alert("Xin vui lòng nhập email")
                            }


                        }}>
                            <Text style={styles.submitText}>ĐĂNG NHẬP</Text>
                            {this.state.loading && <ActivityIndicator style={{ marginLeft: 5 }} color="#fff" />}
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        )
    }
}

// const styles = StyleSheet.create({
//     // container: {
//     //     flex: 1,
//     //     flexDirection : 'column',
//     // },
//     // btn: {
//     //     marginLeft: 70,
//     //     marginRight: 70,
//     //     borderRadius: 5,
//     //     justifyContent: 'center',
//     //     marginTop: 10,
//     //     backgroundColor: '#0b3b22',
//     //     padding: 6,
//     //     alignItems: 'center'
//     // },
//     // logo: {
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     //     position: 'absolute',
//     //     left: 50,
//     //     top: 40,
//     //     width: 270,
//     //     resizeMode: 'contain',
//     //     height: 270,
//     // },
//     // loginform: {
//     //     marginTop: 150,

//     //     marginLeft: 30,
//     //     marginRight: 30,
//     // },
//     // textInput: {
//     //     fontSize: 12,
//     //     borderRadius: 5,
//     //     alignSelf: 'stretch',
//     //     padding: 14,
//     //     marginBottom: 20,
//     //     backgroundColor: '#fff',
//     // },
//     // header: {
//     //     flex: 40,
//     //     backgroundColor: '#ffffff',
//     // },
//     // form: {
//     //     flex: 60,
//     //     backgroundColor: '#05713a',
//     // },
//     // welcome: {
//     //     fontSize: 20,
//     //     textAlign: 'center',
//     //     margin: 10,
//     // },
//     // instructions: {
//     //     textAlign: 'center',
//     //     color: '#333333',
//     //     marginBottom: 5,
//     // },
//     container: {
//         backgroundColor: '#fff',
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//       },
//       title: {
//         width: dims.screenWidth * 0.8,
//         color: '#fff',
//         textAlign: 'center',
//         fontSize: responsiveFont(dims.fontTextSize),
//         marginBottom: dims.defaultPadding,
//         fontFamily: 'OpenSans-Bold',
//         fontWeight: '400'
//       },
//       touch: {
//         backgroundColor: 'green'
//       },
//       form: {
//         width: dims.screenWidth,
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor: '#05713a',
//         alignItems: 'center'
//       },
//       input: {
//         padding: 7,
//         fontSize: responsiveFont(dims.fontTextSize - 0.2),
//         backgroundColor: '#fff',
//         width: dims.screenWidth * 0.8,
//         borderRadius: 2,
//         marginBottom: dims.defaultPadding,
//         fontFamily: 'OpenSans-Light'
//       },
//       logoWrapper: {
//         height: IMAGE_HEIGHT,
//         width: dims.screenWidth,
//         justifyContent: 'center',
//         alignItems: 'center'
//       },
//       logo: {
//         resizeMode: 'center',
//         width: '80%',
//         height: '80%',
//         alignSelf: 'center'
//       },
//       register: {
//         marginBottom: 20,
//         width: dims.screenWidth - 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 50,
//         backgroundColor: '#ffae'
//       },
//       submit: {
//         backgroundColor: '#0b3b22',
//         padding: 7,
//         paddingHorizontal: 20,
//         borderRadius: 2,
//         alignSelf: 'center',
//         marginTop: dims.defaultPadding,
//         flexDirection: 'row'
//       },
//       submitText: {
//         fontSize: responsiveFont(dims.fontInputSize + 0.2),
//         color: '#fff',
//         fontWeight: '500'
//       }
// });