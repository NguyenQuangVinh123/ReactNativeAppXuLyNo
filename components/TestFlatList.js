import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import Button from 'react-native-button';
import { HSTDScreen, HSSTHScreen, DetailsScreen } from '../screenNames';
import Header from './Header';
import flatListData from '../data/flatListData';
import TabNavigatorTestABC from '..';
import TestABCD from './TestABCD';
import { TabBar } from '..'
import {getListCongViec} from '../networking/Server';
class FlatListItem_HSTHTN extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <View style={{ backgroundColor: this.props.index % 2 == 0 ? "#e5e5e5" : "#ffffff" }}>
                <View style={styles.bodycontent}>
                    <View style={styles.column1}>
                        <Text style={styles.firstrowtext}>CIF: {item.CIF} <Text style={{ color: "black", fontWeight: "normal" }}> | 22/10/2018</Text></Text>
                        <Text style={{ color: "black", fontWeight: "bold", paddingBottom: 8 }}>Tên: <Text style={{ fontWeight: "normal" }}>{item.CUST_NAME}</Text></Text>
                        {/* <Text style={{ color: "black", fontWeight: "bold", paddingBottom: 8 }}>Địa chỉ: <Text style={{ fontWeight: "normal" }}>350/2 Nguyễn Văn Lượng,p16,quận Gò Vấp, TPHCM</Text></Text> */}
                        <Text style={{ color: "black", fontWeight: "bold", paddingBottom: 8 }}>Phương án: <Text style={{ fontWeight: "normal" }}>{this.props.item.SOLUTION_NAME}</Text></Text>
                    </View>
                    <View style={styles.column2}>
                        <Image style={styles.icon}
                            source={require('../image/running.png')}
                        />
                        <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#4dbc3a", marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate(DetailsScreen)}><Text style={{ color: "white" }}>Xem</Text></TouchableOpacity>

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


export default class TestFlatList extends Component {
    // static navigationOptions = ({navigation})=>{
    //     const { params = {}} = navigation.state;
    //     let tabBarLabel = 'HSTHTN';

    // }
    constructor(props) {
        super(props);
        this.state = ({
            ListWorkFromServer: []
        });

    }
    
    componentDidMount() {
        this.refreshDataFromServer();
    }
    // onRefresh = () => {
    //     this.refreshDataFromServer();

    // }

    refreshDataFromServer = () => {
        // this.setState({ refreshing: true });
        getListCongViec().then((Items) => {
            console.log(Items);
            this.setState({ ListWorkFromServer: Items });
            // this.setState({ refreshing: false });

        }).catch((error) => {
           
            this.setState({ ListWorkFromServer: [] });
            // this.setState({ refreshing: false });

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
                    {/* <TabNavigatorTest /> */}
                    {/* <TabNavigatorTestABC /> */}

                </View>
                <View style={styles.content}>
                    <FlatList
                        ref={"flatList"}
                        data={this.state.ListWorkFromServer}
                        
                        renderItem={({ item, index }) => {
                            return (<FlatListItem_HSTHTN navigation={this.props.navigation} item={item} index={index} parentFlatList={this} ></FlatListItem_HSTHTN>);
                        }}
                       


                    // refreshControl={
                    //     <RefreshControl 
                    //         refreshing = {this.state.refreshing}
                    //         onRefresh = {this.onRefresh}

                    //     />
                    // }
                    >
                    </FlatList>
                    {/* <View
                            style={{
                                borderBottomColor: 'green',
                                width: "100%",
                                borderBottomWidth: 1,
                            }}
                        /> */}
                    {/* <TouchableOpacity style={{ marginTop: 20, marginBottom: 20 }} onPress={this.signIn}>
                                <Text style={{ color: 'red' }}>Take Picture</Text>
                            </TouchableOpacity> */}
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
        paddingBottom: 20,
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
        width: "85%",
    },
    column2: {
        flexDirection: "column",

    },
    icon: {
        marginLeft: 10,
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10
    },
    tab3: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#004b24',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10
    },
});