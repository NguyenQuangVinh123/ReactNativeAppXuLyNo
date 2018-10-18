import React, {Component} from 'react';
import {AppRegistry,SectionList,StyleSheet,Text, View,Platform,Alert} from 'react-native';
const  apiGetListViec = ''; // api get 
const apiPostWork = ''; // api post
async function getListCongViec(){
    try{
        let response = await fetcht(apiGetListViec);
        let responseJson = await response.json();
        return responseJson.data; // "data" là trường của Json
    }catch(err){
        console.log(`Error is :${error}`);
    }
}

// Post new data
async function PostWork(params){
    try{
        let response = await fetcht(apiPostWork,{
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(params)

            
        });
        let responseJson = await response.json();
        return responseJson.result; // "result" là trường check Json
    }catch(err){
        console.log(`Error is :${error}`);
    }
}


export {PostWork};
export {getListCongViec};