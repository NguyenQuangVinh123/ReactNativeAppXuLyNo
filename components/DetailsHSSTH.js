import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    TouchableHighlight,
    TextInput,
    Keyboard
} from "react-native";
import Button from "react-native-button";
import { HSTHTNScreen } from "../screenNames";
import Header from "./Header";
import { PostWork, PostImage } from "../networking/Server";
import { refreshDataFromServer } from "./HSTHTN";
import FetchLocation from "./FetchLocation";
import ImagePicker from "react-native-image-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import NumberFormat from "react-number-format";



export default class DetailsHSSTH extends Component {



    back = () => {
        this.props.navigation.goBack();
    }


    render() {



        const { navigation } = this.props;
        const cif = navigation.getParam('cif');
        const name = navigation.getParam('cust_name');
        const solution = navigation.getParam('solution');
        const date = navigation.getParam('date');
        let current_balance = navigation.getParam('current_balance');
        let current_pr = navigation.getParam('current_pr');
        let number_current_balance = Number(current_balance).toLocaleString();
        let number_current_pr = Number(current_pr).toLocaleString();

        return (
            <ScrollView style={{ backgroundColor: '#fff' }}
                maximumZoomScale={3}
                minimumZoomScale={0.2}
                keyboardDismissMode='on-drag'


            >
                <View style={styles.container}>

                    <View style={styles.tab}>

                        <Button style={styles.tab1}
                            disabled={true}
                        >HS TH TRONG NGÀY</Button>
                        <Button
                            disabled={true}

                            style={styles.tab2} onPress={() => {
                                navigation.navigate(HSTDScreen);
                            }}>
                            HS TỒN ĐỌNG
                        </Button>
                        <Button
                            disabled={true}
                            style={styles.tab3} onPress={() => {
                                navigation.navigate(HSSTHScreen);
                            }}>
                            HS SẼ THỰC HIỆN
                        </Button>
                        {/* <TabNavigatorTest /> */}
                        {/* <TabNavigatorTestABC /> */}

                    </View>
                    <View style={styles.bodycontent}>
                        <View style={styles.arrow}>
                            <TouchableOpacity onPress={this.back} style={{ paddingLeft: 10, paddingBottom: 10 }}>
                                <Image
                                    source={require('../image/backarrow.png')}
                                    style={{ width: 35, height: 20 }} />
                            </TouchableOpacity>
                            <Text>
                                {date}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: 'green',
                                width: "100%",
                                borderBottomWidth: 1,
                            }}
                        />
                        <View style={styles.cif}>
                            <Text style={{ color: "#579631" }}>CIF {cif}</Text>
                            <Image style={styles.icon}
                                source={require('../image/running.png')}
                            />

                        </View>
                        <View style={styles.content}>
                            <Text style={styles.titleContent}>Tên:<Text style={{ fontWeight: "normal" }}> {name}</Text></Text>
                            <Text style={styles.titleContent}>Địa chỉ:<Text style={{ fontWeight: "normal" }}> 350/2 Nguyễn Văn Lượng,p16,quận Gò Vấp, TPHCM</Text></Text>
                            <Text style={styles.titleContent}>Ngày kế hoạch:<Text style={{ fontWeight: "normal" }}> {date}</Text></Text>
                            <Text style={styles.titleContent}>Biên pháp:<Text style={{ fontWeight: "normal" }}> {solution}</Text></Text>
                            <Text style={styles.titleContent}>Tổng dư nợ:<Text style={{ fontWeight: "normal" }}> {number_current_balance} VNĐ</Text></Text>
                            <Text style={styles.titleContent}>Tổng gốc quá hạn:<Text style={{ fontWeight: "normal" }}> {number_current_pr} VNĐ</Text></Text>
                        </View>

                    </View>


                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({


    titleContent: {
        color: "black", fontWeight: "bold"
    },

    cif: {
        paddingTop: 20,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    arrow: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    content: {
        flexDirection: "column",
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
    },


    bodycontent: {

        paddingLeft: 10,
        paddingRight: 20,
    },

    icon: {
        width: 20,
        height: 20
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

    tab1: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#002411',

        paddingLeft: Platform.OS === "ios" ? 10 : 20,
        paddingRight: Platform.OS === "ios" ? 10 : 20,
        paddingTop : Platform.OS === "ios" ? 12 : 13,
        paddingBottom : Platform.OS === "ios" ? 12 : 13,      },

    tab2: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#002411',
        paddingLeft: Platform.OS === "ios" ? 10 : 20,
        paddingRight: Platform.OS === "ios" ? 10 : 20,
        paddingTop : Platform.OS === "ios" ? 12 : 13,
        paddingBottom : Platform.OS === "ios" ? 12 : 13,  
    },
    tab3: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#002411',
        paddingLeft: Platform.OS === "ios" ? 10 : 20,
        paddingRight: Platform.OS === "ios" ? 10 : 20,
        paddingTop : Platform.OS === "ios" ? 12 : 13,
        paddingBottom : Platform.OS === "ios" ? 12 : 13,  
    },
});
