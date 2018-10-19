/** @format */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
// import App from './App';
import Splash from './components/Splash';
import Login from './components/Login';
import HSTHTN from './components/HSTHTN';
import HSTD from './components/HSTD';
import HSSTH from './components/HSSTH';
import { name as appName } from './app.json';
import { StackNavigator } from 'react-navigation';
import Details from './components/Details'
import UsersMap from './components/UsersMap'
// import { TabNavigator } from 'react-navigation';
import {  HSTHTNScreen,
    HSTDScreen,
    HSSTHScreen } from './screenNames';
const App1 = StackNavigator({
    HSTHTNScreen: {
        screen: HSTHTN,
        navigationOptions: {
            headerTitle: 'Trong Đêm',
        }
    },
    HSTDScreen: {
        screen: HSTD,
        navigationOptions: {
            headerTitle: 'Tồn đọng',
        }
    },
    HSSTHScreen: {
        screen: HSSTH,
        navigationOptions: {
            headerTitle: 'Thuc hiện',
        }
    },
});
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { currentScreen: 'Splash' };
        console.log('Start doing some task for 3 seconds');
        setTimeout(() => {
            console.log('Done some task for 3 seconds');
            this.setState({ currentScreen: 'Login' })

        }, 2000)
    }
    render() {
        const { currentScreen } = this.state
        let maninScreen = currentScreen === 'Splash' ? <Splash /> : <Login />
        return maninScreen
    }
}
AppRegistry.registerComponent(appName, () => Details);
