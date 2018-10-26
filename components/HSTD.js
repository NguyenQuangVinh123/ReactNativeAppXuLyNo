import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, FlatList ,TouchableOpacity,SafeAreaView} from 'react-native';
import Button from 'react-native-button';
import Header from './Header';
import flatListData from '../data/flatListData';

import { HSTHTNScreen, HSSTHScreen } from '../screenNames';

class FlatListItem_HSTD extends Component {
    render() {
        return (
            <View style={{ backgroundColor: this.props.index % 2 == 0 ? "#e5e5e5" : "#ffffff" }}>
                <View style={styles.bodycontent}>
                    <View style={styles.column1}>
                        <Text style={styles.firstrowtext}>CIF 0001 <Text style={{ color: "black" }}> | 22/10/2018</Text></Text>
                        <Text style={{ color: "black", fontWeight: "bold" }}>Tên: <Text style={{ fontWeight: "normal" }}>Nguyễn Văn A</Text></Text>
                        <Text style={{ color: "black", fontWeight: "bold" }}>Địa chỉ: <Text style={{ fontWeight: "normal" }}>350/2 Nguyễn Văn Lượng,p16,quận Gò Vấp, TPHCM</Text></Text>
                        <Text style={{ color: "black", fontWeight: "bold" }}>Phương án: <Text style={{ fontWeight: "normal" }}>Đôn đốc</Text></Text>
                    </View>
                    <View style={styles.column2}>
                        <Image style={styles.icon}
                            source={require('../image/running.png')}
                        />
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "green", marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(DetailsScreen)}><Text>Xem</Text></TouchableOpacity>

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
export default class HSTD extends Component {
    constructor(props){
        super(props);
        this.state =({
            ListWorkFromServer: []
        });
        
    }
    render() {
        const { navigation } = this.props;

        return (
<SafeAreaView style={styles.container}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Header />
                </View>
                <View style={styles.tab}>
                    <Button style={styles.tab1}
                        onPress={() => {
                            navigation.navigate(HSTHTNScreen);
                        }}>
                        HS TH TRONG NGÀY</Button>
                    <Button style={styles.tab2} disabled={true}>

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
                        renderItem={({ item, index }) => {
                            return (<FlatListItem_HSTD item={item} index={index} ></FlatListItem_HSTD>);
                        }}
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
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    firstrowtext: {
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
        width :"85%",


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
        backgroundColor: '#004b24',
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
        backgroundColor: '#002411',
        padding: 10,
    },
    tab3: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#004b24',
        padding: 10,
    },
});