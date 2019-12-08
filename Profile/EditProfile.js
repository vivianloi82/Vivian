//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, Platform, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
//import all the basic component we have used
import Fire from "../Fire";
import { Container, Header, Title, Button, Icon, Right, Body, Left, Picker, Form } from "native-base";

export default class EditProfileScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      TextInputDisableStatus: false,
    
      value: '',
      genderDisable: false,

      
      user: {
        username: '',
        name: '',
        gender: '',
        icno: '',
        phone: '',

    },
      

    }
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
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onPressButton = () => {
    this.setState({
      TextInputDisableStatus: true,
      genderDisable: true
    })
  }
 

  UpdateData= async user => {
    var id = Fire.shared.uid;
    console.log(id);
    Fire.shared.firestore.collection("users").doc(id.toString()).update({
         username: this.state.user.username,
         name: this.state.user.name,
         gender: this.state.selected,
         icno: this.state.user.icno,
         phone: this.state.user.phone,
         
     })  .then(ref => {
      this.props.navigation.goBack();
    })
    .catch(error => {
      alert(error);
    });
   }
  render() {
    return (
      <View style={{ flex: 1 }}>

<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.Field}>User Name</Text>
          <TextInput
            placeholder={this.state.user.username}
            placeholderTextColor='black'
            underlineColorAndroid='transparent'
            onChangeText={username => this.setState({ user: { ...this.state.user, username } })}
            value={this.state.user.username}
            style={[styles.TextInputStyle, { backgroundColor: this.state.TextInputDisableStatus ? '#FFF' : '#d3d3d3' }]}
            editable={this.state.TextInputDisableStatus}
            
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.Field}>Full Name</Text>
          <TextInput
            placeholder={this.state.user.name}
            placeholderTextColor='black'
            underlineColorAndroid='transparent'
            onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
            value={this.state.user.name}
         
            style={[styles.TextInputStyle, { backgroundColor: this.state.TextInputDisableStatus ? '#FFF' : '#d3d3d3' }]}
            editable={this.state.TextInputDisableStatus}
          />
        </View>

     


        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.Field}>Phone Number</Text>
          <TextInput
            placeholder={this.state.user.phone}
            placeholderTextColor='black'
            underlineColorAndroid='transparent'
            onChangeText={phone => this.setState({ user: { ...this.state.user, phone } })}
            value={this.state.user.phone}
         
            style={[styles.TextInputStyle, { backgroundColor: this.state.TextInputDisableStatus ? '#FFF' : '#d3d3d3' }]}
            editable={this.state.TextInputDisableStatus}
          />
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.Field}>Identity Number</Text>
          <TextInput
            placeholder={this.state.user.icno}
            placeholderTextColor='black'
            underlineColorAndroid='transparent'
            onChangeText={icno => this.setState({ user: { ...this.state.user, icno } })}
            value={this.state.user.icno}
         
         
            style={[styles.TextInputStyle, { backgroundColor: this.state.TextInputDisableStatus ? '#FFF' : '#d3d3d3' }]}
            editable={this.state.TextInputDisableStatus}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.Field}>Gender</Text>
          <View style={styles.androidPicker}>
           
          <Picker
           
            enabled={this.state.genderDisable}
            renderHeader={backAction =>
              <Header style={{ backgroundColor: 'white', borderBottomColor: 'black' }}>
                <Left>
                  <Button transparent onPress={backAction}>
                    <Icon name="arrow-back" style={{ color: 'black', fontWeight: 'normal' }} />
                  </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                  <Title style={{ color: "black" }}>Select gender</Title>
                </Body>
                <Right />
              </Header>}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            headerStyle={{ backgroundColor: "#b95dd3" }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            placeholder="Select gender"
            placeholderStyle={{ color: "black", }}
            placeholderIconColor="blue"
            selectedValue={this.state.selected}
            style={styles.iosPicker}
            onValueChange={this.onValueChange.bind(this)}

          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />

          </Picker>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onPressButton}>

          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Updatebutton} onPress={this.UpdateData}>

<Text style={styles.buttonText}>Update</Text>
</TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  Field: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    padding: 10,
    width: 200
  },
  button: {
    marginHorizontal: 9,
    marginVertical: 10,
    backgroundColor: "#841584",
    borderRadius: 8,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    // borderColor:"#38AEE6",
    // borderWidth:2,

    bottom: 0

  },
  Updatebutton: {
    marginHorizontal: 9,
    marginVertical: 10,
    backgroundColor: "red",
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
  iosPicker:
{
  width: Platform.select({ ios: 200 }),
  marginLeft:Platform.select({ ios: 20 }),
  borderWidth: Platform.select({ ios: 1 }),
  borderRadius: Platform.select({ ios: 5 }),
  borderColor: Platform.select({ ios: 'grey' }),
  marginTop: Platform.select({ ios: 15 }),

},
androidPicker: {
  width: Platform.select({ android: 150 }),
  marginLeft:Platform.select({ android: 20 }),
  borderWidth: Platform.select({ android: 1 }),
  borderRadius: Platform.select({ android: 5 }),
  borderColor: Platform.select({ android: 'grey' }),
},
});