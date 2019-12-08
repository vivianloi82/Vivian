//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text, ScrollView,
  View,
  SafeAreaView, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Container, Header, Title, Button, Icon, Right, Body, Left, Picker, Form } from "native-base";
import Fire from "../Fire";
import Ionicons from 'react-native-vector-icons/Ionicons';

//import UserPermissions from "../utilities/UserPermissions";
//import * as ImagePicker from "expo-image-picker";
//import all the basic component we have used

import ImageActionSheet from '../packages/ImageActionSheet'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

export default class Reserve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},

      value: '',
      selected: undefined,
      isVisibleDate: false,
      isVisibleTime: false,

      chosenDate: "",
      chosenTime: "",

      floor:"",
      section:"",
      parkingslot:"",

      errormsg:""
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  unsubscribe = null;

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;

    this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(doc => {
        this.setState({ user: doc.data() });
      });
    //UserPermissions.getCameraPermission;
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  handlePost = () => {
    Fire.shared
      .addReserve({ chosenDate: this.state.chosenDate, chosenTime: this.state.chosenTime, value: this.state.selected })
      .then(ref => {
        this.setState({ chosenDate: "", chosenTime: "" });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };
  //  Date
  handleDatePicker = (date) => {
    this.setState({
      isVisibleDate: false,
      chosenDate: moment(date).format(' DD MMMM YYYY ')

    })
  }

  showDatePicker = () => {
    this.setState({
      isVisibleDate: true
    })
  }
  hidePDateicker = () => {
    this.setState({
      isVisibleDate: false
    })
  }

  // Time 
  handleTimePicker = (time) => {
    this.setState({
      isVisibleTime: false,
      chosenTime: moment(time).format(' HH:mm')

    })
  }

  showTimePicker = () => {
    this.setState({
      isVisibleTime: true
    })
  }
  hideTimePicker = () => {
    this.setState({
      isVisibleTime: false
    })
  }

  handleSearch =()=>
  {
    // Disabilities
    if(this.state.selected == 'Disabilities')
    {
      Fire.shared.firestore.collection("CategoryParkingSlot").doc("Disabilities").collection("ParkingSlots").where("Status",  "==", "Available")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({
                floor: doc.data().Floor,
                section: doc.data().Section,
                parkingslot: doc.data().SlotName
              })
        });
     
        // if (!doc.exists) {
        //   console.log('No such document!');
        // } else {
        //   console.log('Document data:', doc.data().Status);
        //   if (doc.data().Status == 'Available')
        //   {
        //   this.setState({
        //     floor: doc.data().Floor,
        //     section: doc.data().Section,
        //     parkingslot: doc.data().SlotName
        //   })
        // }
        // else
        // {
        //   console.log('No such document!');

        // }
        
        // }
      })
      .catch(err => {
        console.log('Error getting document', err);
        this.setState({
          errormsg:"No available parking slot",
          
        })
      });
    }
    // Normal
    else if(this.state.selected == 'Normal')
    {
      Fire.shared.firestore.collection("CategoryParkingSlot").doc("Normal").collection("ParkingSlots").doc("PS00001").get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          this.setState({
            floor: doc.data().Floor,
            section: doc.data().Section,
            parkingslot: doc.data().SlotName
          })

        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    }

    else
    {
      console.log('Error getting document');

    }
  }
  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.container}>

            {/* Choose date  */}
            <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 20 }} >Date </Text>
              <View>

                <DateTimePicker
                  isVisible={this.state.isVisibleDate}
                  onConfirm={this.handleDatePicker}
                  onCancel={this.hideDatePicker}
                  mode={'date'}
                  datePickerModeAndroid={'spinner'}


                />

              </View>
              <Text style={{ color: 'black', fontSize: 20 }}>
                {this.state.chosenDate}
              </Text>
              <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={this.showDatePicker}>

                <Ionicons style={{ marginHorizontal: 10 }} name="md-calendar" size={32} color="#808080"></Ionicons>
              </TouchableOpacity>
            </View>





            {/* Choose time  */}
            <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 20, marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 20 }} >Time</Text>
              <View>

                <DateTimePicker
                  isVisible={this.state.isVisibleTime}
                  onConfirm={this.handleTimePicker}
                  onCancel={this.hideTimePicker}


                  mode={'time'}
                  is24Hour={false}
                  timePickerModeAndroid={'spinner'}
                />

              </View>

              <Text style={{ color: 'black', fontSize: 20 }}>
                {this.state.chosenTime}
              </Text>

              <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={this.showTimePicker}>

                <Ionicons style={{ marginHorizontal: 10 }} name="md-time" size={32} color="#808080"></Ionicons>
              </TouchableOpacity>
            </View>


            {/* Choose type of parking slot */}
            <View >
              <Text style={{ fontSize: 20, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10 }} >Type of parking slot</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: -30 }}>



                <View style={styles.androidPicker}>
                  <Picker

                    renderHeader={backAction =>
                      <Header style={{ backgroundColor: 'white', borderBottomColor: 'black' }}>
                        <Left>
                          <Button transparent onPress={backAction}>
                            <Icon name="arrow-back" style={{ color: 'black', fontWeight: 'normal' }} />
                          </Button>
                        </Left>
                        <Body style={{ flex: 3 }}>
                          <Title style={{ color: "black" }}>Parking slot category</Title>
                        </Body>
                        <Right />
                      </Header>}
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    headerStyle={{ backgroundColor: "#b95dd3" }}
                    headerBackButtonTextStyle={{ color: "#fff" }}
                    headerTitleStyle={{ color: "#fff" }}
                    placeholder="Choose one category"
                    placeholderStyle={{ color: "black", }}
                    placeholderIconColor="blue"
                    selectedValue={this.state.selected}
                    style={styles.picker}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="Normal" value="Normal" />
                    <Picker.Item label="Valet" value="Valet" />
                    <Picker.Item label="Disabilities" value="Disabilities" />
                    <Picker.Item label="Ladies" value="Ladies" />
                    <Picker.Item label="Hybrid" value="Hybrid" />

                  </Picker>
                </View>
                <TouchableOpacity style={styles.search} onPress={this.handleSearch} >
                  <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>



            {/* Retrieve data from CategoryParkingSlot */}
            <View style={{marginHorizontal:10, marginTop:10}}>
              <Text style={{fontSize:20}}>Recommended parking slot</Text>
              {/* Display retrieve data */}
              <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:20}}>Floor:</Text>
<Text style={{fontSize:18}}>    {this.state.floor}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:20}}>Section:</Text>
<Text style={{fontSize:18}}>    {this.state.section}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:20}}>Parking Slot:</Text>
<Text style={{fontSize:18}}>    {this.state.parkingslot}</Text>
              </View>
              <Text style={{fontSize:20}}> {this.state.errormsg}</Text>

            </View>









            <View >
              <TouchableOpacity style={styles.button} onPress={this.handlePost} >

                <Text style={styles.buttonText}>Reserve</Text>
              </TouchableOpacity>
            </View>









          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },

  container: {
    margin: 8,
    marginTop: Platform.select({ ios: 8, android: 32 }),

  },
  emailText:
  {
    width: Platform.select({ ios: 320, android: 360 }),
    borderWidth: 1, borderRadius: 5, padding: 10, marginLeft: 10, borderColor: 'grey',
    marginTop: Platform.select({ android: -10 }),


  },
  picker: {
    width: Platform.select({ ios: 300 }),
    borderWidth: Platform.select({ ios: 1 }),
    borderRadius: Platform.select({ ios: 5 }),
    borderColor: Platform.select({ ios: 'grey' }),
    marginLeft: Platform.select({ ios: 20 }),
    marginTop: Platform.select({ ios: 15 }),
    marginHorizontal: Platform.select({ ios: 20 }),



  },
  androidPicker: {
    width: Platform.select({ android: 210 }),
    borderWidth: Platform.select({ android: 1 }),
    borderRadius: Platform.select({ android: 5 }),
    borderColor: Platform.select({ android: 'grey' }),
    marginTop: Platform.select({ android: 15 }),
    marginHorizontal: Platform.select({ android: 20 }),

  },
  contentContainer: {
    padding: 8,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  button: {
    marginTop: 10,
    backgroundColor: "#87CEFA",
    borderRadius: 8,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 2



  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },

  uploadpic:
  {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    width: 100,
    padding: 5,
    marginTop: Platform.select({ android: 10 }),
  },
  DateButton:
  {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    color: "black"

  },
  TimeButton:
  {
    width: 50,
    height: 50,
    backgroundColor: "yellow",
    color: "black"

  },
  search:
  {
    marginTop: 10,
    backgroundColor: "yellow",
    borderRadius: 8,
    height: 52,
    width: 100,
    alignItems: "center",
    justifyContent: "center",


  }
});



            // {/* Refresh to random retrieve new parking slot */}
            // <TouchableOpacity style={styles.uploadpic} onPress={() => {
            //   this.setState({ visible: true })
            // }}>
            //   <Text style={{ fontSize: 15, fontWeight: '600' }}>Refresh</Text>

            //   <Ionicons style={{ marginHorizontal: 10 }} name="md-refresh" size={32} color="#808080"></Ionicons>
            // </TouchableOpacity>

