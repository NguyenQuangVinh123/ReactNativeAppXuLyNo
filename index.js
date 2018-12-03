/** @format */
import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity } from 'react-native';
import App from './App';
import Splash from './components/Splash';
import HSTHTN from './components/HSTHTN';
import HSTD from './components/HSTD';
import HSSTH from './components/HSSTH';
import DetailsHSSTH from './components/DetailsHSSTH';
import { name as appName } from './app.json';
import { StackNavigator, TabNavigator, createStackNavigator, createTabNavigator, TabBarBottom, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Details from './components/Details'
import UsersMap from './components/UsersMap'
import { HSTHTNScreen, HSTDScreen, HSSTHScreen, DetailsScreen,DetailsHSSTHScreen,LoginScreen } from './screenNames';
// import TestABCD from './components/TestABCD';
import Login from './components/login/Login'
import TestABCD from './components/TestABCD';
const HSTHTNStack = createStackNavigator({
    HSTHTNScreen: {
        screen: HSTHTN, navigationOptions: {
            header: null
        }
    },
    DetailsScreen: {
        screen: Details, navigationOptions: {
            header: null
        }
    },
 
    // maninScreen :{
    //     screen: Main, navigationOptions: {
    //         header: null
    //     } 
    // }
    
    
}, {
    initialRouteName: 'HSTHTNScreen',
  });
//   const LoginStack  = createStackNavigator({

//   });
const HSTDStack = createStackNavigator({
    HSTDScreen: {
        screen: HSTD, navigationOptions: {
            header: null
        }
    },
    DetailsScreen: {
        screen: Details, navigationOptions: {
            header: null
        }
    },
   
});
const HSSTHStack = createStackNavigator({
    HSSTHScreen: {
        screen: HSSTH, navigationOptions: {
            header: null,

        }
    },
    DetailsHSSTHScreen: {
        screen: DetailsHSSTH, navigationOptions: {
            header: null
        }
    },
});


const TabNavigatorTest = createTabNavigator({
    HSTHTN: {
        screen: HSTHTNStack, navigationOptions: {
            title: "HS TH TRONG NGÀY",
        }
    },
    HSTD: {
        screen: HSTDStack, navigationOptions: {
            title: "HS TỒN ĐỌNG",

        }
    },
    HSSTH: {
        screen: HSSTHStack, navigationOptions: {
            title: "HS SẼ THỰC HIỆN",

        }
    },

}, {
        tabBarComponent: TabBar,
        tabBarPosition: "top",
        swipeEnabled: true,
        animationEnabled: true,
        tabStyle: {

        },
        tabBarOptions: {
            activeBackgroundColor: "red",
            inactiveBackgroundColor: "yellow",
            labelStyle: {
                fontSize: 10,
                fontWeight: 'bold',
                justifyContent: "space-between",
                paddingBottom: 10,

            },

            // style : {
            //     backgroundColor: 'transparent',
            //     borderTopWidth: 0,
            //     position: 'absolute',
            //     left: 50,
            //     right: 50,
            //     bottom: 20,
            //     height: 100
            // },
            // tabStyle : {
            //     position : "absolute",
            //     width : "100%",
            //     height : 70,
            //     top : 90,
            //  }

        },
    });
export { TabNavigatorTest, TabBar };
class TabBar extends Component {
    render() {
        return <View style={{}} />
    }
}
// class UserStore {
//   constructor(){
//    if(! UserStore.instance){
//      this._data = [
        
//      ];
//      UserStore.instance = this;
//    }

//    return UserStore.instance;
//   }

//  //rest is the same code as preceding example

// }

// const instance = new UserStore();
// Object.freeze(instance);

// export default instance;
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
        let maninScreen = currentScreen === 'Splash' ? <Splash /> : <App />
        return maninScreen
    }
}
export default Main;
AppRegistry.registerComponent(appName, () => Main);
