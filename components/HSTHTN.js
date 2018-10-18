import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList,RefreshControl } from 'react-native';
import Button from 'react-native-button';
import { HSTDScreen, HSSTHScreen } from '../screenNames';
import Header from './Header';
import flatListData from '../data/flatListData';
import {getListCongViec} from '../networking/Server';
class FlatListItem_HSTHTN extends Component {
    render() {
        return (
            <View style={{ backgroundColor: this.props.index % 2 == 0 ? "#e5e5e5" : "#ffffff" }}>
                <View style={styles.bodycontent}>
                    <View style={styles.column1}>
                        <Text style={styles.firstrowtext}>CIF 0001 <Text style={{ color: "black", fontWeight: 'normal' }}> | 22/10/2018</Text></Text>
                        <View style={{ flexDirection: "row",marginBottom : 10,marginTop : 15 }}>
                            <View style={{ }}>
                                <Text style={{ color: "black", fontWeight: "bold" }}>Tên:</Text>
                                </View><View style={{ fontWeight: "normal" }}><Text>Nguyễn Văn A</Text></View>
                        </View>
                        <View style={{ flexDirection: "row", width: "80%" }}>
                            <View style={{  }}><Text style={{ color: "black", fontWeight: "bold" }}>Địa chỉ:</Text></View>
                            <View style={{ fontWeight: "normal"}}><Text style={{ fontWeight: "normal" }}>350/2 Nguyễn Văn Lượng,p16,quận Gò Vấp, TPHCM</Text></View>
                        </View>


                        <Text style={{ color: "black", fontWeight: "bold" }}>Phương án: <Text style={{ fontWeight: "normal" }}>Đôn đốc</Text></Text>
                    </View>
                    <View style={styles.column2}>
                        <Image style={styles.icon}
                            source={require('../image/running.png')}
                        />
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "green", marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity><Text>Xem</Text></TouchableOpacity>

                        </View>

                    </View>

                </View>
                <View
                    style={{
                        borderBottomColor: 'green',
                        width: "100%",
                        borderBottomWidth: 1,
                    }}
                />
            </View>
        );
    }
}


export default class HSTHTN extends Component {
    // static navigationOptions = ({navigation})=>{
    //     const { params = {}} = navigation.state;
    //     let tabBarLabel = 'HSTHTN';

    // }
    constructor(props){
        super(props);
        this.state =({
            // refreshing = false,
            ListWorkFromServer: []
        });
        
    }
    componentDidMount(){
        this.refreshDataFromServer();
    }
    onRefresh = ()=>{
        this.refreshDataFromServer();

    }

    refreshDataFromServer = () =>{
        this.setState({refreshing : true}); 
        getListCongViec().then((works)=>{
            this.setState({ListWorkFromServer : works});
            this.setState({refreshing : false}); 

        }).catch((error)=>{
            this.setState({ListWorkFromServer : []});
            this.setState({refreshing : false}); 

        });
    }
    render() {
        const { navigation } = this.props;
        // let dataScence = {
        //     name: "Star Wars",
        //     year : 1997
        // }
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Header />
                </View>
                <View style={styles.tab}>
                    <Button style={styles.tab1}
                        disabled={true}
                    >HS TH TRONG NGÀY</Button>
                    <Button
                        style={styles.tab2} onPress={() => {
                            navigation.navigate(HSTDScreen);
                        }}>
                        HS TỒN ĐỌNG
                </Button>
                    <Button
                        style={styles.tab3} onPress={() => {
                            navigation.navigate(HSSTHScreen);
                        }}>
                        HS SẼ THỰC HIỆN
                </Button>
                </View>
                <View style={styles.content}>
                    <FlatList data={flatListData} 
                     /* data = {this.state.ListWorkFromServer} */
                        renderItem={({ item, index }) => {
                            return (<FlatListItem_HSTHTN item={item} index={index} ></FlatListItem_HSTHTN>);
                        }}

                        // keyExtractor={(item,index)=>item.name}
                        // refreshControl={
                        //     <RefreshControl 
                        //         refreshing = {this.state.refreshing}
                        //         onRefresh = {this.onRefresh}
                            
                        //     />
                        // }
                    >
                    </FlatList>
                    <View
                        style={{
                            borderBottomColor: 'green',
                            width: "100%",
                            borderBottomWidth: 1,
                        }}
                    />

                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    firstrowtext: {
        fontWeight: 'bold',
        color: 'green',
        fontSize: 16,
    },

    bodycontent: {

        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 20,
    },
    column1: {
        flexDirection: "column",

    },
    column2: {
        flexDirection: "column",

    },
    icon: {
        width: 30,
        height: 30
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 10,
        backgroundColor: "#008b43",
    },
    tab: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: '600',
    },
    content: {


        flex: 85,
    },
    tab1: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#002411',
        padding: 10,
    },
    logo: {
        position: 'absolute',
        width: 200,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab2: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#004b24',
        padding: 10,
    },
    tab3: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#004b24',
        padding: 10,
    },
});