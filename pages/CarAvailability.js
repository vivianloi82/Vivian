import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity ,Image} from 'react-native'
import firebase from 'firebase'
import IconFontAwe from 'react-native-vector-icons/FontAwesome' 
import { Container, Header, Title, Button, Icon, Right, Body, Left, Picker, Form } from "native-base";


var firebaseConfig = {
  apiKey: "AIzaSyDtLDNs_KlosU7hnIb2aoJlWMtPGndTmjA",
  authDomain: "car-availabilty-and-reserve.firebaseapp.com",
  databaseURL: "https://car-availabilty-and-reserve.firebaseio.com",
  projectId: "car-availabilty-and-reserve",
  storageBucket: "car-availabilty-and-reserve.appspot.com",
  messagingSenderId: "620391943509",
  appId: "1:620391943509:web:03505f70f145af67a673dc",
  measurementId: "G-G2DDPE04W2"
};

class CarAvailability extends Component {


  // value pass to userLvel to store the "LEVEL"

  constructor(props) {
    super(props)
    this.state = {
      Parking: '',
      userLevel: '',
      userSection: '',
      ParkingSlot: [],
      total: 0,
      occupied: 0,
      reserve: 0,
      available: 0,
      levelString: ''
    }


    var realtimeDB = firebase.initializeApp(firebaseConfig, "realtime");


    this.fireRef = realtimeDB.database()




  }


  // this state is used to store "LEVEL" 
  updateUserLevel = (userLevel) => {
    this.fireRef.ref("Parking/" + this.state.userLevel + "/" + this.state.userSection).off()
    this.setState({
      userLevel: userLevel,
      // userSection: userLevel.slice(6) + "A",
    })

  }

  // this state is used to store "SECTION" 
  updateUserSection = (userSection) => {
    var userLevel = this.state.userLevel;
    this.fireRef.ref("Parking/" + this.state.userSection + "/" + this.state.userLevel).off()
    this.setState({
      userSection: userLevel.slice(6) + userSection,
    })
    console.log(userLevel.slice(6) + userSection)
  }



  onPressButton() {
    //   console.log("Parking/" + this.state.userLevel + "/" + this.state.userSection)
    //   this.fireRef.ref("Parking/" + this.state.userLevel + "/" + this.state.userSection).on('value', (data) => {    
    //   var dataVariable = data.toJSON()
    //   console.log(dataVariable)
    //      })

    // console.log('Availability')
    //   this.state.total = dataVariable.Slots.Total
    //   this.state.occupied = dataVariable.Slots.Occupied
    //   this.state.reserve =  dataVariable.Slots.Reserved
    //   this.setState.available = dataVariable.Slots.Total - dataVariable.Slots.Occupied - dataVariable.Slots.Reserved
    console.log("Parking/" + this.state.userLevel + "/")
    this.fireRef.ref("Parking/" + this.state.userLevel + "/" + this.state.userSection).on('value', (data) => {
      var dataVariable = data.toJSON()
      console.log("HELLO")
      this.setState({
        total: dataVariable.Slots.Total,
        occupied: dataVariable.Slots.Occupied,
        reserve: dataVariable.Slots.Reserved,
        available: dataVariable.Slots.Total - dataVariable.Slots.Occupied - dataVariable.Slots.Reserved
      })

    }, (error) => { console.error(error) })

  }



  render() {

    return (

      <View>
       {/* Selection  */}
       <View style={{marginHorizontal:20}}>
<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',marginTop:10 }}>
          <Text style={styles.text}>
            Floor:
                </Text>
          {/* <View style={styles.androidPicker1}>

            <Picker 
            style={styles.iosPicker}
            selectedValue={this.state.userLevel}
              onValueChange={this.updateUserLevel}
            >

              <Picker.Item label="Floor G" value="Level G" />
              <Picker.Item label="Floor 1" value="Level 1" />
              <Picker.Item label="Floor 2" value="Level 2" />
            </Picker>
          </View> */}

<View style={styles.androidPicker1}>
              <Picker
                renderHeader={backAction =>
                  <Header style={{ backgroundColor: 'white', borderBottomColor: 'black' }}>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="arrow-back" style={{ color: 'black', fontWeight: 'normal' }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: "black" }}>Select floor</Title>
                    </Body>
                    <Right />
                  </Header>}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                headerStyle={{ backgroundColor: "#b95dd3" }}
                headerBackButtonTextStyle={{ color: "#fff" }}
                headerTitleStyle={{ color: "#fff" }}
                placeholder="Floor"
                placeholderStyle={{ color: "black", }}
                placeholderIconColor="blue"
                selectedValue={this.state.userLevel}
                onValueChange={this.updateUserLevel}
                                style={styles.iosPicker}
              >
                 <Picker.Item label="Floor G" value="Level G" />
              <Picker.Item label="Floor 1" value="Level 1" />
              <Picker.Item label="Floor 2" value="Level 2" />
                 </Picker>
            </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',marginTop:10 }}>
          <Text style={styles.text}>
            Section:
                </Text>
          {/* <View style={styles.androidPicker2}>

            <Picker 
                        style={styles.iosPicker}

            selectedValue={this.state.userSection}
              onValueChange={this.updateUserSection}
            >

              <Picker.Item label="Section A" value="A" />
              <Picker.Item label="Section B" value="B" />
              <Picker.Item label="Section C" value="C" />
            </Picker>
          </View> */}
          <View style={styles.androidPicker2}>
              <Picker
                renderHeader={backAction =>
                  <Header style={{ backgroundColor: 'white', borderBottomColor: 'black' }}>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="arrow-back" style={{ color: 'black', fontWeight: 'normal' }} />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title style={{ color: "black" }}>Select section</Title>
                    </Body>
                    <Right />
                  </Header>}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                headerStyle={{ backgroundColor: "#b95dd3" }}
                headerBackButtonTextStyle={{ color: "#fff" }}
                headerTitleStyle={{ color: "#fff" }}
                placeholder="Section"
                placeholderStyle={{ color: "black", }}
                placeholderIconColor="blue"
                selectedValue={this.state.userSection}
              onValueChange={this.updateUserSection}
                                style={styles.iosPicker2}
              >
                <Picker.Item label="Section A" value="A" />
              <Picker.Item label="Section B" value="B" />
              <Picker.Item label="Section C" value="C" />
                 </Picker>
            </View>
        </View>

</View>
{/* View button */}
    
    


{/* Table of results */}
        <View style={{marginHorizontal:30,marginTop:20}}>
 {/* available */}
 <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <IconFontAwe name = "circle" style ={{fontSize : 50, color : 'green',marginRight:5}} />
        <Text style={styles.text} >Available</Text>
          <Text style={styles.text}>:{this.state.available}</Text>
        </View>

        {/* reserve */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <IconFontAwe name = "circle" style ={{fontSize : 50, color : 'red',marginRight:5}} />
        <Text style={styles.text}>Reserved</Text>
          <Text style={styles.text}>:{this.state.reserve}</Text>
        </View>

        {/*  occupied*/}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <IconFontAwe name = "circle" style ={{fontSize : 50, color : 'yellow',marginRight:5}} />
        <Text style={styles.text}>Occupied</Text>

          <Text style={styles.text}>:{this.state.occupied}</Text>
        </View>

        </View>
       
        <TouchableOpacity style={styles.Viewbutton} onPress={() => this.onPressButton()}>

<Text style={styles.buttonText}>View</Text>
</TouchableOpacity>

      </View>



    )
  }
}

export default CarAvailability;

const styles = StyleSheet.create({

  textHeader: {
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,


  },

  text: {

    fontSize: 20,
    marginHorizontal:10
  },
iosPicker:
{
  width: Platform.select({ ios: 150 }),
  marginLeft:Platform.select({ ios: 20 }),
  borderWidth: Platform.select({ ios: 1 }),
  borderRadius: Platform.select({ ios: 5 }),
  borderColor: Platform.select({ ios: 'grey' }),
  marginTop: Platform.select({ ios: 15 }),

},
iosPicker2:
{
  width: Platform.select({ ios: 150 }),
  borderWidth: Platform.select({ ios: 1 }),
  borderRadius: Platform.select({ ios: 5 }),
  borderColor: Platform.select({ ios: 'grey' }),
  marginTop: Platform.select({ ios: 15 }),

},
  androidPicker1: {
    width: Platform.select({ android: 150 }),
    marginLeft:Platform.select({ android: 20 }),
    borderWidth: Platform.select({ android: 1 }),
    borderRadius: Platform.select({ android: 5 }),
    borderColor: Platform.select({ android: 'grey' }),
  },
  androidPicker2: {
    width: Platform.select({ android: 150 }),
    borderWidth: Platform.select({ android: 1 }),
    borderRadius: Platform.select({ android: 5 }),
    borderColor: Platform.select({ android: 'grey' }),
  },
  Viewbutton: {
    marginHorizontal: 9,
    marginVertical: 10,
    backgroundColor: "#9C27B0",
    borderRadius: 8,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    // borderColor:"#38AEE6",
    // borderWidth:2,

    bottom: 0

  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },





})