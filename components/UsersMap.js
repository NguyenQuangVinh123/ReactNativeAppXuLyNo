import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
const usersMap = props => {
    let userLocationMarker = null;
    if (props.userLocation) {
        userLocationMarker = <MapView.Marker coordinate={props.userLocation} />;

    }
    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                initialRegion={{                 
                        latitude: 10.83333,
                        longitude: 106.63278,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                    }}
                    region = {props.userLocation}
                    >               
                {userLocationMarker} 
               
            </MapView>
        </View>
    );
}
// const { width, height } = Dimensions.get('window')
// const SCREEN_HEIGHT = height;
// const SCREEN_WIDTH = width;
// const ASPECT_RATIO = width / height;
// const LATTITUDE_DELTA = 0.0422;
// const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
// constructor(props) {
//     super(props)
//     this.state = {
//         userLocation: null,
//         initialPosition: {
//             latitude: 0,
//             longitude: 0,
//             latitudeDelta: 0,
//             longitudeDelta: 0
//         },
//         markerPosition: {
//             latitude: 0,
//             longitude: 0
//         }
//     }
// }
// wathID: ?number = null

// componentDidMount() {
//     navigator.geolocation.getCurrentPosition(position => {
//         var lat = parseFloat(position.coords.latitude)
//         var long = parseFloat(position.coords.longitude)

//         var initialRegion = {
//             latitude: lat,
//             longitude: long,
//             latitudeDelta: LATTITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//         }

//         this.setState({ initialPosition: initialRegion })
//         this.setState({ markerPosition: initialRegion })
//     }, (error) => alert(JSON.stringify(error)),
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
//     this.wathID = navigator.geolocation.watchPosition((position) => {
//         var lat = parseFloat(position.coords.latitude)
//         var long = parseFloat(position.coords.longitude)

//         var lastRegion = {
//             latitude: lat,
//             longitude: long,
//             latitudeDelta: LATTITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//         }

//         this.setState({ initialPosition: lastRegion })
//         this.setState({ markerPosition: lastRegion })

//     })
// }
// componentWillMount() {
//     navigator.geolocation.clearWatch(this.wathID)
// }




export default usersMap;



const styles = StyleSheet.create({
    mapContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        width: "100%",
        height: 200

    },
    map: {
        width: "100%",
        height: "100%"
        // flex: 1,
        // width,
        // height 
    },
})
