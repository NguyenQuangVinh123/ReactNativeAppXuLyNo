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
  TextInput,
  Keyboard,
  Alert,BackHandler, DeviceEventEmitter
} from "react-native";
import Button from "react-native-button";
import { HSTHTNScreen } from "../screenNames";
import Header from "./Header";
import { PostWork, PostImage } from "../networking/Server";
import HSTD from './HSTD';
import FetchLocation from "./FetchLocation";
import ImagePicker from "react-native-image-picker";
import UsersMap from "./UsersMap";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import NumberFormat from "react-number-format";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

const options = {
  title: "Chọn loaị",

  storageOptions: {
    skipBackup: true,
    path: "images",
    cameraRoll : false,
  },
  quality : 0.7,
  maxWidth : 2700,
  maxHeight : 1400,
};

const options1 = {
  title: "Chọn loaị",

  storageOptions: {
    skipBackup: true,
    path: "images",
    cameraRoll : false,
  },
  quality : 0.7,
  maxWidth : 2700,
  maxHeight : 1400,

};

LocationServicesDialogBox.checkLocationServicesIsEnabled({
  message: "<h2 style='color: #0af13e'>Bật GPS ?</h2>App này cần sử dụng GPS:<br/><br/>Sử dụng GPS, Wi-Fi<br/><br/>",
  ok: "YES",
  cancel: "NO",
  enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
  showDialog: true, // false => Opens the Location access page directly
  openLocationServices: true, // false => Directly catch method is called if location services are turned off
  preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
  preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
  providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
}).then(function(success) {
  console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
}).catch((error) => {
  console.log(error.message); // error.message => "disabled"
});

BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
 //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
 LocationServicesDialogBox.forceCloseDialog();
});

DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
  console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
});

export default class Details_HSTHTN extends Component {
  constructor(props) {
    super(props);
    this.isCapture = false;
    this.isCapture1 = false;
    this.type_upload = true,

    // this.isDisabled = false;
      // this.pressed = false;
      this.state = {
        locationEnabled: false,
        result: "",
        // avatarSource: null,
        avatarSource1: null,
        userLocation: null,
        currentPosition: 0,
        avatarSource2: null,
        isVisible: false,
        choosendate: "",
        test: [],
        test1: [],
        isDisabled: false,
        // disabled: false,
        uri: require("../image/step1.png")
      };
  }

  getUserLocationHandler = () => {
    // navigator.geolocation.getCurrentPosition(position =>{
    //   console.log(position);
    // }, err => console.log(err));
    this.onEnableLocationPress
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }
        });
        // fetch('', {
        //     method: "POST",
        //     body: JSON.stringify({
        //         latitude: position.coords.latitude,
        //         longitudeitude: position.coords.longitude,
        //     })
        // })
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
      },
      err => console.log(err)
    );
  };
  
  componentWillUnmount() {
    // used only when "providerListener" is enabled
    LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener
  }
  
  // componentDidMount() {
  //   LocationSwitch.isLocationEnabled(
  //     () => {
  //       Alert.alert('Location is enabled');
  //       this.setState({ locationEnabled: true });
  //     },
  //     () => { Alert.alert('Location is disabled'); },
  //   );
  // }

  // onEnableLocationPress() {
  //   LocationSwitch.enableLocationService(1000, true,
  //     () => { this.setState({ locationEnabled: true }); },
  //     () => { this.setState({ locationEnabled: false }); },
  //   );
  // }
  imagepickershow = () => {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        const source = { uri: "data:image/jpeg;base64," + response.data };
        this.isCapture = true;
        this.setState({
          avatarSource1: source
        });
        console.log(source);
      }
    });
  };
  imagepickershow1 = () => {
    ImagePicker.launchCamera(options1, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // const source1 = { uri: response.uri };

        // You can also display the image using data:
        const source1 = { uri: "data:image/jpeg;base64," + response.data };
        this.isCapture1 = true;
        this.setState({
          avatarSource2: source1
        });
      }
    });
  };

  back = () => {
    this.props.navigation.goBack();
  };

  onPageChange(position) {
    this.setState({ currentPosition: position });
  }
  handledPicker = date => {
    this.setState({
      isVisible: false,
      choosendate: moment(date).format("DD/MM/YYYY")
    });
  };
  hidePicker = () => {
    this.setState({
      isVisible: false
    });
  };
  calendarchoose = () => {
    this.setState({
      isVisible: true
    });
  };
  onPressBox(){
    console.log("ok")
    this.setState({
      isDisabled: true,
    });
  }
  changeLogoStep2() {
    // console.log("state changed!");
    this.setState({
      uri: require("../image/step2.jpg")
    });
  }
  changeLogoStep3() {
    this.setState({
      uri: require("../image/step3.jpg")
    });
  }

  render() {
    let b = this.state.test;
    if (this.isCapture) {
      let a = (
        <Image
          source={this.state.avatarSource1}
          style={{ height: 50, width: 50 }}
        />
      );
      b.push(a);
      this.isCapture = false;
    }
    let img = this.state.avatarSource1 == null ? null : b;
    var array_image = b.forEach(function (e) { });

    let c = this.state.test1;
    if (this.isCapture1) {
      let d = (
        <Image
          source={this.state.avatarSource2}
          style={{ height: 50, width: 50 }}
        />
      );
      c.push(d);
      this.isCapture1 = false;
    }

    let img1 = this.state.avatarSource2 == null ? null : c;
    const { isDisabled } = this.state
    let enabled = 1;
    const { navigation } = this.props;
    const cif = navigation.getParam("cif");
    const name = navigation.getParam("cust_name");
    const solution = navigation.getParam("solution");
    const date = navigation.getParam("date");
    let current_balance = navigation.getParam("current_balance");
    let current_pr = navigation.getParam("current_pr");
    let number_current_balance = Number(current_balance).toLocaleString();
    let number_current_pr = Number(current_pr).toLocaleString();
    let loan_item_id = navigation.getParam("loan_item_id");
    let parent = navigation.getParam("parent");
    AsyncStorage.setItem("loanItemId", loan_item_id);
    let array_date = this.state.choosendate.split("/");
    let date_format = array_date[2] + array_date[1] + array_date[0];

    return (
      <ScrollView
        style={{ backgroundColor: "#fff" }}
        maximumZoomScale={3}
        minimumZoomScale={0.2}
        keyboardDismissMode="on-drag"

      >
        <View style={styles.container}>

          <View style={styles.tab}>
            <Button style={styles.tab1} disabled={true}>
              HS TH TRONG NGÀY
            </Button>
            <Button
              disabled={true}
              style={styles.tab2}
              onPress={() => {
                navigation.navigate(HSTDScreen);
              }}
            >
              HS TỒN ĐỌNG
            </Button>
            <Button
              disabled={true}
              style={styles.tab3}
              onPress={() => {
                navigation.navigate(HSSTHScreen);
              }}
            >
              HS SẼ THỰC HIỆN
            </Button>
            {/* <TabNavigatorTest /> */}
            {/* <TabNavigatorTestABC /> */}
          </View>
          <View style={styles.bodycontent}>
            <View style={styles.arrow}>
              <TouchableOpacity
                onPress={this.back}
                style={{ paddingLeft: 10, paddingBottom: 10 }}
              >
                <Image
                  source={require("../image/backarrow.png")}
                  style={{ width: 35, height: 20 }}
                />
              </TouchableOpacity>
              <Text>{date}</Text>
            </View>
            <View
              style={{
                borderBottomColor: "green",
                width: "100%",
                borderBottomWidth: 1
              }}
            />
            <View style={styles.cif}>
              <Text style={{ color: "#579631" }}>CIF {cif}</Text>
              <Image
                style={styles.icon}
                source={require("../image/running.png")}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.titleContent}>
                Tên:
                <Text style={{ fontWeight: "normal" }}> {name}</Text>
              </Text>
              <Text style={styles.titleContent}>
                Địa chỉ:
                <Text style={{ fontWeight: "normal" }}>
                  {" "}
                  350/2 Nguyễn Văn Lượng,p16,quận Gò Vấp, TPHCM
                </Text>
              </Text>
              <Text style={styles.titleContent}>
                Ngày kế hoạch:
                <Text style={{ fontWeight: "normal" }}> {date}</Text>
              </Text>
              <Text style={styles.titleContent}>
                Biên pháp:
                <Text style={{ fontWeight: "normal" }}> {solution}</Text>
              </Text>
              <Text style={styles.titleContent}>
                Tổng dư nợ:
                <Text style={{ fontWeight: "normal" }}>
                  {" "}
                  {number_current_balance} VNĐ
                </Text>
              </Text>
              <Text style={styles.titleContent}>
                Tổng gốc quá hạn:
                <Text style={{ fontWeight: "normal" }}>
                  {" "}
                  {number_current_pr} VNĐ
                </Text>
              </Text>
            </View>
            <View style={styles.post}>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "#008c44" }}
              >
                THÔNG TIN THỰC HIỆN:
              </Text>
              <Text
                style={{ fontWeight: "bold", paddingTop: 5, paddingBottom: 5 }}
              >
                Kết quả thực hiện:
              </Text>
              <TextInput
                style={{
                  height: 70,
                  width: "100%",
                  borderColor: "green",
                  borderWidth: 1
                }}
                onChangeText={text =>
                  this.setState(() => {
                    return {
                      result: text
                    };
                  })
                }
                multiline={true}
                autoFocus={false}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />

              <View style={styles.calendartt}>
                <Text>Ngày hẹn thanh toán: {this.state.choosendate}</Text>
                <TouchableOpacity
                  onPress={this.calendarchoose}
                  style={{ paddingLeft: 15 }}
                >
                  <Image
                    source={require("../image/calendar.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
                <DateTimePicker
                  cancelTextIOS={"Thoát"}
                  confirmTextStyle={{ color: "blue", fontSize: 20 }}
                  cancelTextStyle={{ color: "red", fontSize: 20 }}
                  confirmTextIOS={"Đồng Ý"}
                  isVisible={this.state.isVisible}
                  onConfirm={this.handledPicker}
                  onCancel={this.hidePicker}
                  mode={"date"}
                />
              </View>
              <View style={styles.takepicture}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}
                  onPress={() =>{
                    if(b.length >5){
                      alert("Chỉ được chụp 6 tấm hình tài sản ");
                      
                    }else{
                      this.imagepickershow()
                      
                    }
                   
                    }
                    
                    
                    }
                    // onPress= {this.imagepickershow.bind(this)}
                >
                  <Image
                    source={require("../image/camrera1.png")}
                    style={{ width: 40, height: 30 }}
                  />
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                  >
                    CHỤP HÌNH TÀI SẢN
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.resultpicture}>{img}</View>
              <View style={styles.takepicture}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}
                  onPress={this.imagepickershow1.bind(this)}
                >
                  <Image
                    source={require("../image/camrera2.png")}
                    style={{ width: 45, height: 30 }}
                  />
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                  >
                    CHỤP HÌNH TÀI LIỆU
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.resultpicture}>{img1}</View>

              <FetchLocation
                style={{ marginBottom: 10 }}
                onGetLocation={this.getUserLocationHandler}
              />
              <UsersMap userLocation={this.state.userLocation} />

              <Image
                source={this.state.uri}
                style={{
                  width: "100%",
                  height: 30,
                  marginTop: 50,
                  marginBottom: 20
                }}
              />

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  marginBottom: 20
                }}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "green"
                  }}
                >
                  <TouchableOpacity
                    // style={ isDisabled?  styles.disabled:styles.enabled} 
                    disabled={isDisabled}
                    // disabled={this.state.disabled}
                    
                    onPress={() => {

                      if (this.state.result.length == 0) {
                        alert("Bạn phải điền thông tin kết quả thực hiện");
                        return;
                      }
                      // console.log(typeof )
                      if (this.state.choosendate.length == 0) {
                        date_format = '';                        
                      }
                      if (b.length == 0 && c.length == 0) {
                        alert("Bạn vui lòng chụp hình tài sản hoặc hình tài liệu");
                        return;

                      }
                      // if(date_format == '' || date_format == null){
                      //   date_format = '';
                      // }
                      // if (b.length != 0 || c.length != 0) {
                        
                      //   return;

                      // }


                      if (this.state.userLocation == null) {
                        alert("Bạn vui lòng chọn vị trí tài sản");
                        return;
                      }
                      
                      const result1 = {
                        result: this.state.result,
                        latitude: this.state.userLocation.latitude,
                        longitude: this.state.userLocation.longitude,
                        paymentDate: date_format
                      };
                      
                      PostWork(result1).then(result => {
                        if (result == "1") {
                          // Alert.alert("Upload xong doc");

                          this.changeLogoStep2()
                          console.log(date_format);
                          console.log("finish step 1");
                          if (b.length != 0 && c.length == 0) {
                            console.log("chuỗi c rỗng")
                            for (var i = 0; i < img.length; i++) {
                              var source_picture = img[i].props.source.uri;
                              var a_split = source_picture.split(",");
                              var params_picture = {
                                fileType: "IMG",
                                imageFile: a_split[1]
                              };

                              PostImage(params_picture).then(result => {
                                if (result == "1") {
                                  
                                  this.changeLogoStep3()
                                  console.log("finish step 2a");
                                  Alert.alert("Bạn đã upload hình ảnh thành công")
                                  this.onPressBox()   
                                  console.log(isDisabled)          
                                  parent.refreshDataFromServer();
                                  this.props.navigation.goBack();
                                                    
                                   }
                              });
                            }
                        

                          } else if (c.length != 0 && b.length == 0) {
                            
                            console.log("chuỗi b rỗng")
                            for (var i = 0; i < img1.length; i++) {
                              var source_picture1 = img1[i].props.source.uri;
                              var b_split = source_picture1.split(",");
                              var params_picture1 = {
                                fileType: "DOC",
                                imageFile: b_split[1]
                              };

                              PostImage(params_picture1).then(result => {
                                if (result == "1") {
                                  this.changeLogoStep3()
                                  console.log("finish step 2b");

                                
                                  Alert.alert("Bạn đã upload hình ảnh thành công")
                                  this.onPressBox
                                  console.log(isDisabled)
                                  parent.refreshDataFromServer();
                                  this.props.navigation.goBack();
                                 
                                }
                              });
                            }
                            

                          }

                          else {
                          // Up hình tài sản
                            for (var i = 0; i < img.length; i++) {
                              var source_picture = img[i].props.source.uri;
                              var a_split = source_picture.split(",");
                              var params_picture = {
                                fileType: "IMG",
                                imageFile: a_split[1]
                              };

                              PostImage(params_picture).then(result => {
                                if (result == "1") {
                                  this.changeLogoStep3()
                                  console.log("finish step 2c");
                                  
                                }
                              });

                            }
                          // Up hình tài liệu

                            for (var i = 0; i < img1.length; i++) {
                              var source_picture1 = img1[i].props.source.uri;
                              var b_split = source_picture1.split(",");
                              var params_picture1 = {
                                fileType: "DOC",
                                imageFile: b_split[1]
                              };

                              PostImage(params_picture1).then(result => {
                                if (result == "1") {
                                  this.changeLogoStep3()
                                  console.log("finish step 2c");

                                  // setTimeout(() =>{ this.props.navigation.goBack() 

                                  // },2500);
                                  Alert.alert("Bạn đã upload hình ảnh thành công")
                                  this.onPressBox
                                  console.log(isDisabled)
                                  parent.refreshDataFromServer();
                                  this.props.navigation.goBack();
                                  
                                }
                            

                              });
                            }
                          }

                        }
                      });

                     

                    }
                    

                    }
                    
                    // disabled={   this.isCapture = true ? this.state.disabled = false : this.state.disabled = true}
                  >
                    <Text
                      activeOpacity={enabled ? 0.5 : 1}
                      style={isDisabled?styles.disabled:styles.enabled}
                    >
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  resultpicture: {
    marginTop: 5,
    flexDirection: "row"
  },
  disabled: {
    opacity: 0.3,fontSize: 22, color: "#fff", fontWeight: "600" ,
  },
  enabled: {
    opacity: 1,
    fontSize: 22, color: "#fff", fontWeight: "600" ,
  },
  titleContent: {
    color: "black",
    fontWeight: "bold"
  },
  calendartt: {
    fontWeight: "bold",
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
    backgroundColor: "#ececec"
  },
  takepicture: {
    padding: 10,
    backgroundColor: "#00783d",
    marginTop: 10
  },
  cif: {
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  arrow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  content: {
    flexDirection: "column"
  },
  post: {
    paddingTop: 20,

    flexDirection: "column"
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  bodycontent: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // marginLeft: 20,
    // marginRight: 20,
    // marginBottom: 20,
    // marginTop: 20,
    paddingLeft: 10,
    paddingRight: 20
  },

  icon: {
    width: 20,
    height: 20
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flex: 10,
    backgroundColor: "#008b43"
  },
  tab: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "600"
  },

  tab1: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#002411",
    paddingLeft: Platform.OS === "ios" ? 10 : 20,
    paddingRight: Platform.OS === "ios" ? 10 : 20,
    paddingTop : Platform.OS === "ios" ? 12 : 13,
    paddingBottom : Platform.OS === "ios" ? 12 : 13,  },

  tab2: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#002411",
    paddingLeft: Platform.OS === "ios" ? 10 : 20,
    paddingRight: Platform.OS === "ios" ? 10 : 20,
    paddingTop : Platform.OS === "ios" ? 12 : 13,
    paddingBottom : Platform.OS === "ios" ? 12 : 13,  },
  tab3: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#002411",
    paddingLeft: Platform.OS === "ios" ? 10 : 20,
    paddingRight: Platform.OS === "ios" ? 10 : 20,
    paddingTop : Platform.OS === "ios" ? 12 : 13,
    paddingBottom : Platform.OS === "ios" ? 12 : 13,  }
});
