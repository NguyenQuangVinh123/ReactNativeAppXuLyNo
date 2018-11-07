// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native';
// import Button from 'react-native-button';
// import { HSTHTNScreen } from '../screenNames';
// import Header from './Header';
// import flatListData from '../data/flatListData';
// import { PostWork } from '../networking/Server';
// import { refreshDataFromServer } from './HSTHTN';
// // import ImagePicker from 'react-native-image-picker';
// import FetchLocation from './FetchLocation';
// // import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';

// import UsersMap from './UsersMap'

// const options = {
//     title: 'Chọn loaị',
//     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//     storageOptions: {
//         skipBackup: true,
//         path: 'images',
//     },
// };

// export default class Details_HSTHTN extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             result: '',
//             // avatarSource: null,
//             avatarSource1: null,
//             userLocation: null
//         }
//         let img = this.state.avatarSource1 == null ? null : <Image source={this.state.avatarSource1} style={{ height: 200, width: 200 }} />
//         let array = [];
//         array.push(img);
//         console.log(array[1]);

//     }

//     getUserLocationHandler = () => {
//         // navigator.geolocation.getCurrentPosition(position =>{
//         //   console.log(position);
//         // }, err => console.log(err));
//         navigator.geolocation.getCurrentPosition(position => {
//             this.setState({
//                 userLocation: {
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }
//             });
//             // fetch('', {
//             //     method: "POST",
//             //     body: JSON.stringify({
//             //         latitude: position.coords.latitude,
//             //         longitudeitude: position.coords.longitude,
//             //     })
//             // })
//             //     .then(res => console.log(res))
//             //     .catch(err => console.log(err))

//         }
//             , err => console.log(err));
//     }


//     // show = (x) => {
//     //     // var x = [];
//     //     ImagePicker.openCamera({
//     //         width: 100,
//     //         height: 100,
//     //         cropping: true,
//     //         mediType  : 'photo'
//     //     }).then(image => {
//     //        const test = image.path;
//     //         console.log(test);
//     //         // alert(image);
//     //         // var img = <Image source={
//     //         //     "file:///data/user/0/com.appxulyno_final/cache/react-native-image-crop-picker/5a7844f5-50ed-436d-90c4-4c2048d0fd10.jpg"
//     //         // } style={{ height: 200, width: 200 }} />
//     //         // x.push(image.path);
//     //         // this.setState({ result: 'a' })
//     //     });
//     //     //   return x;
//     // }
//     imagepickershow = () => {
//         ImagePicker.showImagePicker(options, (response) => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 const source = { uri: response.uri };

//                 // You can also display the image using data:
//                 // const source = { uri: 'data:image/jpeg;base64,' + response.data };

//                 this.setState({
//                     avatarSource1: source,
//                 });
//             }
//         });
//     }
//     back = () => {
//         this.props.navigation.goBack();
//     }

//     render() {
//         const { navigation } = this.props;
//         const cif = navigation.getParam('cif');
//         const name = navigation.getParam('cust_name');
//         const solution = navigation.getParam('solution');
//         const date = navigation.getParam('date');
//         return (
//             <View style={styles.container}>
//                 <View style={styles.header}>
//                     <Header />
//                 </View>
//                 <View style={styles.tab}>

//                     <Button style={styles.tab1}
//                         disabled={true}
//                     >HS TH TRONG NGÀY</Button>
//                     <Button
//                         disabled={true}

//                         style={styles.tab2} onPress={() => {
//                             navigation.navigate(HSTDScreen);
//                         }}>
//                         HS TỒN ĐỌNG
//                         </Button>
//                     <Button
//                         disabled={true}
//                         style={styles.tab3} onPress={() => {
//                             navigation.navigate(HSSTHScreen);
//                         }}>
//                         HS SẼ THỰC HIỆN
//                         </Button>
//                     {/* <TabNavigatorTest /> */}
//                     {/* <TabNavigatorTestABC /> */}

//                 </View>
//                 <View style={styles.bodycontent}>
//                     <View style={styles.arrow}>
//                         <TouchableOpacity onPress={this.back} style={{ paddingLeft: 10, paddingBottom: 10 }}>
//                             <Image
//                                 source={require('../image/backarrow.png')}
//                                 style={{ width: 35, height: 20 }} />
//                         </TouchableOpacity>
//                         <Text>
//                             {date}
//                         </Text>
//                     </View>
//                     <View
//                         style={{
//                             borderBottomColor: 'green',
//                             width: "100%",
//                             borderBottomWidth: 1,
//                         }}
//                     />
//                     <View style={styles.cif}>
//                         <Text style={{ color: "#579631" }}>CIF {cif}</Text>
//                         <Image style={styles.icon}
//                             source={require('../image/running.png')}
//                         />

//                     </View>
//                     <View style={styles.content}>
//                         <Text style={styles.titleContent}>Tên:<Text style={{ fontWeight: "normal" }}> {name}</Text></Text>
//                         <Text style={styles.titleContent}>Địa chỉ:<Text style={{ fontWeight: "normal" }}> 350/2 Nguyễn Văn Lượng,p16,quận Gò Vấp, TPHCM</Text></Text>
//                         <Text style={styles.titleContent}>Ngày kế hoạch:<Text style={{ fontWeight: "normal" }}> {date}</Text></Text>
//                         <Text style={styles.titleContent}>Biên pháp:<Text style={{ fontWeight: "normal" }}> {solution}</Text></Text>
//                         <Text style={styles.titleContent}>Tổng dư nợ:<Text style={{ fontWeight: "normal" }}> </Text></Text>
//                         <Text style={styles.titleContent}>Tổng gốc quá hạn:<Text style={{ fontWeight: "normal" }}> </Text></Text>
//                     </View>
//                     <View style={styles.post}>
//                         <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#008c44' }}>THÔNG TIN THỰC HIỆN:</Text>
//                         <Text style={{ fontWeight: 'bold', paddingTop: 5, paddingBottom: 5 }}>Kết quả thực hiện:</Text>
//                         <TextInput style={{ height: 70, width: "100%", borderColor: 'green', borderWidth: 1 }}
//                             onChangeText={(text) => this.setState(() => {
//                                 return {
//                                     result: text
//                                 };
//                             })}
//                             multiline={true} autoFocus={false} returnKeyType="done" onSubmitEditing={Keyboard.dismiss}
//                         />
                        
//                     </View>
//                 </View>

//             </View>
//         )
//     }
// }


// const styles = StyleSheet.create({
//     uploadAvatar: {
//         width: 200,
//         height: 200,
//     },
//     titleContent: {
//         color: "black", fontWeight: "bold"
//     },
//     cif: {
//         paddingTop: 20,
//         paddingBottom: 10,
//         flexDirection: "row",
//         justifyContent: 'space-between'
//     },
//     arrow: {

//         flexDirection: "row",
//         justifyContent: 'space-between'
//     },
//     content: {
//         flexDirection: "column",
//     },
//     post: {
//         paddingTop: 20,

//         flexDirection: "column",
//     },
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     firstrowtext: {
//         fontWeight: 'bold',
//         color: 'green',
//         fontSize: 16,
//     },

//     bodycontent: {
//         // flexDirection: "row",
//         // justifyContent: "space-between",
//         // marginLeft: 20,
//         // marginRight: 20,
//         // marginBottom: 20,
//         // marginTop: 20,
//         paddingLeft: 10,
//         paddingRight: 20,
//     },
//     column1: {
//         // width: "70%",
//         // flexDirection: "column",

//     },
//     column2: {
//         flexDirection: "column",

//     },
//     icon: {
//         width: 30,
//         height: 30
//     },
//     header: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 10,
//         backgroundColor: "#008b43",
//     },
//     tab: {
//         flex: 5,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         fontWeight: '600',
//     },
//     // content: {
//     //     flex: 85,
//     // },
//     tab1: {
//         fontSize: 12,
//         color: 'white',
//         backgroundColor: '#002411',
//         padding: 10,
//     },
//     logo: {
//         position: 'absolute',
//         width: 200,
//         height: 70,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     tab2: {
//         fontSize: 12,
//         color: 'white',
//         backgroundColor: '#002411',
//         padding: 10,
//     },
//     tab3: {
//         fontSize: 12,
//         color: 'white',
//         backgroundColor: '#002411',
//         padding: 10,
//     },
// });






<TouchableOpacity style={{ marginTop: 20, marginBottom: 20 }} onPress={this.imagepickershow.bind(this)}>
                                <Text style={{ color: 'red' }}>Take Picture</Text>
                            </TouchableOpacity>
                            {/* {img} */}

                            {/* <Image source={
                                "file:///data/user/0/com.appxulyno_final/cache/react-native-image-crop-picker/5a7844f5-50ed-436d-90c4-4c2048d0fd10.jpg"
                            } style={{ height: 200, width: 200 }} /> */}
                            <Image style={{ width: 50, height: 50 }} source={{ uri: '/storage/emulated/0/Pictures/images/image-fa6e77eb-f521-4b42-a93b-c2bb21617afe.jpg' }} />
                        </View>
                        <View>
                            <FetchLocation onGetLocation={this.getUserLocationHandler} />
                            <UsersMap userLocation={this.state.userLocation} />
                        </View>
                    </View>

                    <Button style={{ fontSize: 16, color: 'red' }}
                        onPress={() => {
                            if (this.state.result.length == 0) {
                                alert("Bạn phải điền thông tin kết quả thực hiện");
                                return;
                            }
                            const result1 = {
                                key: "",
                                name: "",
                                imageUpload: "",
                                kq: this.state.result,
                            };

                            PostWork(result1).then((result) => {
                                if (result === 'ok') {
                                    this.props.parentFlatList.refreshDataFromServer();
                                }
                            });
                        }}
                    >Save
                        </Button>
                    <View style={styles.column2}>
                        <Image style={styles.icon}
                            source={require('../image/running.png')}
                        />

                    </View>

                </View>
                {/* <View style={styles.map1}></View> */}

            </View>



            <Calendar

                                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                minDate={'2012-05-10'}
                                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                maxDate={'2012-05-30'}
                                // Handler which gets executed on day press. Default = undefined
                                onDayPress={(day) => { alert(day) }}
                                // Handler which gets executed on day long press. Default = undefined
                                onDayLongPress={(day) => { console.log('selected day', day) }}
                                monthFormat={'MMM yyyy'}
                                // Handler which gets executed when visible month changes in calendar. Default = undefined
                                onMonthChange={(month) => { console.log('month changed', month) }}
                                // Do not show days of other months in month page. Default = false
                                hideExtraDays={true}
                                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                                // day from another month that is visible in calendar page. Default = false
                                disableMonthChange={true}

                                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                                firstDay={1}
                                // Hide day names. Default = false
                                hideDayNames={true}
                                // Show week numbers to the left. Default = false
                                showWeekNumbers={false}
                                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                onPressArrowLeft={substractMonth => substractMonth()}
                                // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                                onPressArrowRight={addMonth => addMonth()}
                                style={{
                                    display: display1,
                                    position: 'absolute',
                                    bottom: 100,
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    width: 150,
                                }}
                                // Specify theme properties to override specific styles for calendar parts. Default = {}
                                theme={{
                                    backgroundColor: 'orange',
                                    calendarBackground: 'red',
                                    textSectionTitleColor: '#b6c1cd',
                                    selectedDayBackgroundColor: '#00adf5',
                                    selectedDayTextColor: 'orange',
                                    todayTextColor: 'red',
                                    dayTextColor: 'red',
                                    textDisabledColor: '#d9e1e8',
                                    dotColor: '#00adf5',
                                    selectedDotColor: 'red',
                                    arrowColor: 'orange',
                                    monthTextColor: 'blue',

                                    // textDayFontFamily: 'monospace',
                                    // textMonthFontFamily: 'monospace',
                                    // textDayHeaderFontFamily: 'monospace',
                                    textMonthFontWeight: 'bold',
                                    textDayFontSize: 7,

                                    textMonthFontSize: 7,
                                    textDayHeaderFontSize: 12
                                }}
                            />