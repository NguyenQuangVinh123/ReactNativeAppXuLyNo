import React, { Component } from 'react';
import {Alert,
    Platform, StyleSheet, Keyboard,
    TouchableWithoutFeedback, StatusBar, Text,
    SafeAreaView, View, Image, TextInput,
    TouchableOpacity, AsyncStorage, KeyboardAvoidingView,Button
} from 'react-native';
import { HSTDScreen,HSTHTNScreen, HSSTHScreen, DetailsScreen,LoginScreen } from '../../screenNames';
import { createStackNavigator } from 'react-navigation';
import {LoginStack} from '../../index'
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import HSSTH from '../HSSTH';
// import TestABCD from '../TestABCD'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        }
    }
    // goToHSTNTN = () => {
    //     const { navigation } = this.props;
    //     navigation.push({ HSTNTN: HSTDScreen });
    // }
    _signIn = () => {
        const {email,password} = this.state
        // if (!EMAIL_REGEX.test(this.state.email)) {
        //     Alert.alert('Dữ liệu lỗi', 'Email nhập vào không đúng định dạng!');
        //     return;
        // }
        // if (!this.state.password) {
        //     Alert.alert('Dữ liệu lỗi', 'Password không được để trống!');
        //     return;
        // }
        
        //   this.setState({ loading: true });
        //   setTimeout(() => goToServices(), 1000);
        fetch("http://10.160.4.55:8822/Login", {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": this.state.email,
                "password": this.state.password
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // if (!EMAIL_REGEX.test(this.state.email)) {
                //     Alert.alert('Dữ liệu lỗi', 'Email nhập vào không đúng định dạng!');
                //     return;
                // }
               
                if(responseJson.result == 1){  
                    // AsyncStorage.setItem('user',responseJson.user)

                    this.props.navigation.navigate('TestABCD');
                   
                    
                }else{
                    alert("sai password")
                }
              

            })
            
            .catch(
                (err) => {
                    console.log(err);
                })
      
    }
    // componentDidMount() {
    //     this._loadInitialState().done();
    // }
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
                        <TouchableOpacity style={styles.submit} onPress={this._signIn}>
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