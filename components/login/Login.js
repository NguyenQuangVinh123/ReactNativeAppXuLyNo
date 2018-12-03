import React, { Component } from 'react';
import {
    Alert,
    Platform, StyleSheet, Keyboard,
    TouchableWithoutFeedback, StatusBar, Text,
    SafeAreaView, View, Image, TextInput,
    TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Button,ScrollView,RefreshControl
} from 'react-native';
import { HSTDScreen, HSTHTNScreen, HSSTHScreen, DetailsScreen, LoginScreen } from '../../screenNames';
import { createStackNavigator,StackActions } from 'react-navigation';
import { LoginStack } from '../../index'
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import HSSTH from '../HSSTH';
import CryptoJS from 'crypto-js';
import { TabNavigatorTest } from '../../index';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// import App  from "../../App"
// import {Application} from "../../App"
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            encrypted: '',
            refreshing: false,
           
        }
    }
   
    // goToHSTNTN = () => {
    //     const { navigation } = this.props;
    //     navigation.push({ HSTNTN: HSTDScreen });
    // }    
                           
    onSelect = data => {
        this.setState(data);
      };
    _signIn = () => {
        
         let pass = this.encryptFun(this.state.password);
         pass = (pass + " ").trim();
         let g = pass;
         console.log(pass);
        const { email, password } = this.state
        const userId = this.state.email;
        AsyncStorage.setItem('userId', userId);
        console.log(userId)

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
                    
                        this.props.navigation.navigate("TestABCD")

                                               
                } else {
                    Alert.alert("Xin vui lòng nhập lại đúng password hoặc email")

                }



            })

            .catch(
                (err) => {
                    console.log(err);
                })

    }
   
    // _onRefresh = () => {
    //     this.setState({refreshing: false});
    //     // test().then(() => {
    //     //   this.setState({refreshing: false});
    //     // });
    //   }
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
    test(){
        console.log("Asdsd")
    }

    componentDidMount() {

        this.props.navigation.addListener(
          'didFocus',
          payload => {
            this.forceUpdate();
          }
        );
    
    }
    componentDidMount() {
        // this.refresh();
        this.encryptFun();
        // this._onRefresh();
        // this.onGoBack()

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
            {/* <ScrollView
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
              > */}
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
                            autoCorrect ={false}
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

