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
  Keyboard,
  Alert
} from "react-native";
import Button from "react-native-button";
import { HSTHTNScreen } from "../screenNames";
import Header from "./Header";
import flatListData from "../data/flatListData";
import { PostWork, PostImage } from "../networking/Server";
import { refreshDataFromServer } from "./HSTHTN";
import FetchLocation from "./FetchLocation";
import ImagePicker from "react-native-image-picker";
import UsersMap from "./UsersMap";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import NumberFormat from "react-number-format";
const options = {
  title: "Chọn loaị",

  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const options1 = {
  title: "Chọn loaị",

  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};


export default class Details_HSTHTN extends Component {
  constructor(props) {
    super(props);
    this.isCapture = false;
    this.isCapture1 = false;
    this.type_upload = true,
    this.state = {
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
      
      uri: require("../image/step1.png")
    };
  }
  // componentDidMount(){
  //     this.refreshDataFromServer()
  // }
  // getListCongViec(){

  // }
  getUserLocationHandler = () => {
    // navigator.geolocation.getCurrentPosition(position =>{
    //   console.log(position);
    // }, err => console.log(err));
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
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
  changeLogo() {
    console.log("state changed!");
    this.setState({
      uri: require("../image/step2.png")
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
    var array_image = b.forEach(function(e) {});

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
          <View style={styles.header}>
            <Header />
          </View>
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
                <Text>Ngày hẹn TT: {this.state.choosendate}</Text>
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
                  onPress={this.imagepickershow.bind(this)}
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
              {/* <TouchableHighlight onPress={() => this.changeLogo()} style={{ marginTop: 50, marginBottom: 50 }}>
                            </TouchableHighlight> */}
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
                    onPress={() => {
                      if (this.state.result.length == 0) {
                        alert("Bạn phải điền thông tin kết quả thực hiện");
                        return;
                      }
                      // console.log(img1);
                      // console.log(typeof b);

                      if (b.length == 0 ) {
                        alert("Bạn vui lòng chụp hình tài sản");
                        return;
                      }
                      if (c.length == 0 ) {
                        alert("Bạn vui lòng chụp hình tài liệu");
                        return;
                      }
                      if (this.state.choosendate.length == 0) {
                        alert("Bạn vui lòng chọn ngày hẹn");
                        return;
                      }
                      if (this.state.userLocation == null) {
                        alert("Bạn vui lòng chọn vị trí tài sản");
                        return;
                      }
                      //
                      const result1 = {
                        result: this.state.result,
                        latitude: this.state.userLocation.latitude,
                        longitude: this.state.userLocation.longitude,
                        paymentDate: date_format
                      };
                      if(this.type_upload){
                        PostWork(result1).then(result => {
                          if (result == "1") {
                              Alert.alert("Upload xong doc");
                              console.log("finish step 1")
                              this.type_upload = false;
                              console.log(this.type_upload);
                              this.changeLogo()
                          }
                        });
                      }else{
                        
                        for (var i = 0; i < img.length; i++) {
                         
                            var source_picture = img[i].props.source.uri;
                            var a_split = source_picture.split(",");
                            var params_picture = {
                              fileType: "IMG",
                              imageFile: a_split[1]
                            };
    
                            PostImage(params_picture).then(result => {
                              if (result == "1") {
                                // this.type_upload == true
                                console.log("finish step 2");
                                

                              }
                            });
                          
                       
                         }

                        for (var i = 0; i < img1.length; i++) {
                         
                          var source_picture1 = img1[i].props.source.uri;
                          var b_split = source_picture1.split(",");
                          var params_picture1 = {
                            fileType: "DOC",
                            imageFile: b_split[1]
                          };
  
                          PostImage(params_picture1).then(result => {
                            if (result == "1") {
                              // this.type_upload == false
                              Alert.alert("Bạn đã upload hình ảnh thành công")
                              setTimeout(() =>{ this.props.navigation.goBack() },2000);
                              // this.props.navigation.goBack();
                            }
                          });
                        }
                      
                      }
                     

                      
                    }}
                  >
                    <Text
                      style={{ fontSize: 22, color: "#fff", fontWeight: "600" }}
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
    padding: 10
  },

  tab2: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#002411",
    padding: 10
  },
  tab3: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#002411",
    padding: 10
  }
});
