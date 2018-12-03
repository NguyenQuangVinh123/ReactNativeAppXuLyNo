import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Platform, Alert, AsyncStorage } from 'react-native';
const apiGetListViec = 'http://10.160.4.49:8822/GetScheduleAppointment'; // api get
const apiPostWork = 'http://10.160.4.49:8822/CompleteAppointment'; // api post
const apiGetDetailsListViec = 'http://10.160.4.49:8822/GetAppointmentDetail';
const apiPostImage = "http://10.160.4.49:8822/UploadImage";
getSessionId = async () => {
    let sessionID = '';
    try {
        sessionID = await AsyncStorage.getItem('sessionID') || 'none';
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
    return sessionID;
}
// console.log(getSessionId);
// console.log(getUserId);
async function getListCongViec_Current() {
    try {
        //  getUserId = async () => {
        //     let userId = '';
        //     try {
        //         userId = await AsyncStorage.getItem('userId') || 'none';
        //     } catch (error) {
        //         // Error retrieving data
        //         console.log(error.message);
        //     }
        //     return userId;
        // }
        // getSessionId = async () => {
        //     let sessionID = '';
        //     try {
        //         sessionID = await AsyncStorage.getItem('sessionID') || 'none';
        //     } catch (error) {
        //         // Error retrieving data
        //         console.log(error.message);
        //     }
        //     return sessionID;
        // }
        // const { getUserId, getSessionId } = this.state;
        const value1 = await AsyncStorage.getItem('userId');
        const value2 = await AsyncStorage.getItem('sessionID');
        
        // var b = AsyncStorage.getItem('userId');
        let response = await fetch(apiGetListViec, {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": value1,
                "sessionCode": value2,
                // "userId": "gdv.01",
                // "sessionCode": "ryzwlxi1/F1TkHPzqKKzWLiJ8XZpiJ+LmubUU923rkM=",
            })

        });
        let responseJson = await response.json();
       
        var array_current = responseJson.Data.Items.filter(t=>{
            return t.TYPE == "CURRENT";
        }) 
        if(responseJson.result == 1 && array_current != null){
            return array_current;

        }
     
        // return array_current;

        // for(var i = 0 ; i < responseJson.Data.Items.length; i++ ){
        //     if (responseJson.result == 1 && responseJson.Data.Items["TYPE"] == "CURRENT")  {
        //         console.log(responseJson.Data.Items );
        //         // return responseJson.Data.Items.TYPE == "BACKLOG";
        //     }
        // }
       

        // .then((response) => response.json())
        // .then((responseJson) => {

        //     if (responseJson.result == 1) {
        //         // console.log(responseJson.Data.Items)
        //         return  responseJson.Data.Items;
        //     }
        // })
        // .catch(
        //     (err) => {
        //         console.log(err);
        //     })
    } catch (err) {
        console.log(`Error is :${error}`);
    }
}
async function getListCongViec_BACKLOG() {
    try {
        //  getUserId = async () => {
        //     let userId = '';
        //     try {
        //         userId = await AsyncStorage.getItem('userId') || 'none';
        //     } catch (error) {
        //         // Error retrieving data
        //         console.log(error.message);
        //     }
        //     return userId;
        // }
        // getSessionId = async () => {
        //     let sessionID = '';
        //     try {
        //         sessionID = await AsyncStorage.getItem('sessionID') || 'none';
        //     } catch (error) {
        //         // Error retrieving data
        //         console.log(error.message);
        //     }
        //     return sessionID;
        // }
        // const { getUserId, getSessionId } = this.state;
        const value1 = await AsyncStorage.getItem('userId');
        const value2 = await AsyncStorage.getItem('sessionID');
        
        // var b = AsyncStorage.getItem('userId');
        let response = await fetch(apiGetListViec, {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": value1,
                "sessionCode": value2,
                // "userId": "gdv.01",
                // "sessionCode": "ryzwlxi1/F1TkHPzqKKzWLiJ8XZpiJ+LmubUU923rkM=",
            })

        });
        let responseJson = await response.json();
        
        var array_backlog = responseJson.Data.Items.filter(t=>{
            return t.TYPE == "BACKLOG";
        }) 
        if(responseJson.result == 1 && array_backlog != null){
            return array_backlog;

        }

        // for(var i = 0 ; i < responseJson.Data.Items.length; i++ ){
        //     if (responseJson.result == 1 && responseJson.Data.Items.TYPE =="BACKLOG")  {
        //         console.log(responseJson.Data.Items );
        //         // return responseJson.Data.Items.TYPE == "BACKLOG";
        //     }
        // }
       

        // .then((response) => response.json())
        // .then((responseJson) => {

        //     if (responseJson.result == 1) {
        //         // console.log(responseJson.Data.Items)
        //         return  responseJson.Data.Items;
        //     }
        // })
        // .catch(
        //     (err) => {
        //         console.log(err);
        //     })
    } catch (err) {
        console.log(`Error is :${error}`);
    }
}

async function getListCongViec_WISH() {
    try {
        //  getUserId = async () => {
        //     let userId = '';
        //     try {
        //         userId = await AsyncStorage.getItem('userId') || 'none';
        //     } catch (error) {
        //         // Error retrieving data
        //         console.log(error.message);
        //     }
        //     return userId;
        // }
        // getSessionId = async () => {
        //     let sessionID = '';
        //     try {
        //         sessionID = await AsyncStorage.getItem('sessionID') || 'none';
        //     } catch (error) {
        //         // Error retrieving data
        //         console.log(error.message);
        //     }
        //     return sessionID;
        // }
        // const { getUserId, getSessionId } = this.state;
        const value1 = await AsyncStorage.getItem('userId');
        const value2 = await AsyncStorage.getItem('sessionID');
       
        // var b = AsyncStorage.getItem('userId');
        let response = await fetch(apiGetListViec, {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": value1,
                "sessionCode": value2,
                // "userId": "gdv.01",
                // "sessionCode": "ryzwlxi1/F1TkHPzqKKzWLiJ8XZpiJ+LmubUU923rkM=",
            })

        });
        let responseJson = await response.json();
        var array_wish = responseJson.Data.Items.filter(t=>{
            return t.TYPE == "WISH";
        }) 
        if(responseJson.result == 1 && array_wish != null){
            return array_wish;

        }
        // console.log(responseJson.Data.Items.TYPE);
        // if (responseJson.result == 1 ) {

        //     return responseJson.Data.Items.TYPE == "WISH";
        // }

        // .then((response) => response.json())
        // .then((responseJson) => {

        //     if (responseJson.result == 1) {
        //         // console.log(responseJson.Data.Items)
        //         return  responseJson.Data.Items;
        //     }
        // })
        // .catch(
        //     (err) => {
        //         console.log(err);
        //     })
    } catch (err) {
        console.log(`Error is :${error}`);
    }
}

// getlistdetails cong viec
async function getListDetailsCongViec() {
    try {

        const value1 = await AsyncStorage.getItem('userId');
        const value2 = await AsyncStorage.getItem('sessionID');
        const value3 = await AsyncStorage.getItem('loanloanItemID');
        // var b = AsyncStorage.getItem('userId');
        let response = await fetch(apiGetDetailsListViec, {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": value1,
                "sessionCode": value2,
                "loanItemId": value3

            })

        });
        let responseJson = await response.json();
        if (responseJson.result == 1) {
            return responseJson.Data.Items;
        }

        // .then((response) => response.json())
        // .then((responseJson) => {

        //     if (responseJson.result == 1) {
        //         // console.log(responseJson.Data.Items)
        //         return  responseJson.Data.Items;
        //     }
        // })
        // .catch(
        //     (err) => {
        //         console.log(err);
        //     })
    } catch (err) {
        console.log(`Error is :${error}`);
    }
}
// Post new data
async function PostWork(params) {
    try {
        const value3 = await AsyncStorage.getItem('userId');
        const value4 = await AsyncStorage.getItem('sessionID');
        const value5 = await AsyncStorage.getItem('loanItemId');

        let response = await fetch(apiPostWork, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": value3,
                "sessionCode": value4,
                "loanItemId": value5,
                "result": params.result,
                "latitude": params.latitude,
                "longitude": params.longitude,
                "paymentDate": params.paymentDate
                
            }),
            // JSON.stringify(params)


        });
        let responseJson = await response.json();
        
        return responseJson.result; // "result" là trường check Json
    } catch (err) {
        console.log(`Error is :${error}`);
    }
}
async function PostImage(params) {
    try {
        const value6 = await AsyncStorage.getItem('userId');
        const value7 = await AsyncStorage.getItem('sessionID');
        const value8 = await AsyncStorage.getItem('loanItemId');

        let response = await fetch(apiPostImage, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": value6,
                "sessionCode": value7,
                "loanItemId": value8,
                "fileType" : params.fileType,
                "imageFile" : params.imageFile 
                
            }),
           
            

        });
        
        let responseJson = await response.json();
        
        return responseJson.result; // "result" là trường check Json
    } catch (err) {
        console.log(`Error is :${error}`);
    }
}


export { PostWork };
export { getListCongViec_Current };
export { getListCongViec_BACKLOG };

export { getListCongViec_WISH };

export { PostImage };
