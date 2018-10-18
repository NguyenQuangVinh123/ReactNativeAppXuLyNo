import React, { Component } from 'react';
import { Platform, StyleSheet,Keyboard, 
    TouchableWithoutFeedback, StatusBar, Text, 
    SafeAreaView, View, Image, TextInput, 
    TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native';
    
    // const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
           
        }
    }
    LOGIN = () =>{
        // if (!EMAIL_REGEX.test(this.state.email)) {
        //     Alert.alert('Dữ liệu lỗi', 'Email nhập vào không đúng định dạng!');
        //     return;
        //   }
        //   if (!this.state.password) {
        //     Alert.alert('Dữ liệu lỗi', 'Password không được để trống!');
        //     return;
        //   }
        //   if (this.state.email !== 'Test@gmail.com' || this.state.password !== '123123') {
        //     Alert.alert('Dữ liệu lỗi', 'Password không chính xác!');
        //     return;
        //   }
        //   this.setState({ loading: true });
        //   setTimeout(() => goToServices(), 1000);
        fetch("http://api",{
            "method" : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "EMAIL" : this.state.email,
                "PASSWORD": this.state.password
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>{

        })
        .catch(
            (err)=>{
            console.log(err);
        })
    }
    componentDidMount() {
        this._loadInitialState().done();
    }
    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('email');
        if (value !== null) {
            this.props.navigation.navigate('LoginSuccess');
        }
    }
    render() { 
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView keyboardVerticalOffset={-80} behavior="padding" style={styles.container} >
                    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                        <View style={styles.header}>
                            <View style={styles.header}>
                                <Image style={styles.logo}
                                    source={require('../image/logo_green.png')}
                                />
                            </View>
                            <View style={styles.form}>
                                <View style={styles.loginform}>
                                    <TextInput style={styles.textInput} placeholderTextColor={'green'} placeholder='TÊN ĐĂNG NHẬP' onChangeText={(email) => this.setState({ email })}
                                        underlineColorAndroid='transparent' keyboardType='email-address' onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                        returnKeyType='next' autoCorrect={false} />
                                    <TextInput style={styles.textInput} placeholder='MẬT KHẨU' placeholderTextColor={'green'} secureTextEntry={true} onChangeText={(password) => this.setState({ password })}
                                        underlineColorAndroid='transparent' ref={"txtPassword"} returnKeyType='go' autoCorrect={false} />
                                    <TouchableOpacity style={styles.btn} onPress={()=>{this.LOGIN}}>
                                        <Text style={{ color: '#fff', fontSize: 20 }}>ĐĂNG NHẬP</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> 
                        </View>  
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'column',
    },
    btn: {
        marginLeft: 70,
        marginRight: 70,
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#0b3b22',
        padding: 6,
        alignItems: 'center'
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 50,
        top: 40,
        width: 270,
        resizeMode: 'contain',
        height: 270,
    },
    loginform: {
        marginTop: 150,
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
    },
    textInput: {
        fontSize: 12,
        borderRadius: 5,
        alignSelf: 'stretch',
        padding: 14,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    header: {
        flex: 40,
        backgroundColor: '#ffffff',
    },
    form: {
        flex: 60,
        backgroundColor: '#05713a',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});