import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Platform, Alert } from 'react-native';
const apiGetListViec = 'http://10.160.4.55:8822/GetScheduleAppointment'; // api get 
const apiPostWork = ''; // api post
async function getListCongViec() {
    try {
        
       let response =  await fetch(apiGetListViec, {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": 'gdv.01',
                "sessionCode": '20181026090330',
            })
            
        });
        let responseJson = await response.json();
        if(responseJson.result == 1){
            return  responseJson.Data.Items;
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

// getListCongViec = () => {
//     fetch("http://10.160.4.55:8822/GetScheduleAppointment", {
//         "method": "POST",
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             "userId": 'gdv.01',
//             "sessionCode": '20181026090330',
//         })
//     })
//         .then((response) => response.json())
//         .then((responseJson) => {

//             if (responseJson.result == 1) {
//                 return responseJson.Data.Items;
//             } else {
//                 alert("sai password")
//             }


//         })

//         .catch(
//             (err) => {
//                 console.log(err);
//             })

// }

// Post new data
async function PostWork(params) {
    try {
        let response = await fetch(apiPostWork, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)


        });
        let responseJson = await response.json();
        return responseJson.result; // "result" là trường check Json
    } catch (err) {
        console.log(`Error is :${error}`);
    }
}


export { PostWork };
export { getListCongViec };