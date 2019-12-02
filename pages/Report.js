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

export default class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      user: {},
      image: null,
      value: '',
      selected: undefined,
      visible: false //for take pic or upload pic
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
      .addPost({ value: this.state.selected, text: this.state.text.trim(), localUri: this.state.image })
      .then(ref => {
        this.setState({ text: "", image: null });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };
/*  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

 */



  render() {
    const { visible } = this.state //for take pic or upload pic
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.container}>
            <View style={styles.AndroidReport}>
              <Text style={{ fontSize: 23, paddingBottom: 20 }} >How can we help?</Text>
            </View>
            <View style={styles.emailText}>
              <Text style={{ fontWeight: 'bold' }} >Email Address</Text>
              <Text style={{ marginTop: 10 }} >{this.state.user.email}</Text>
            </View>

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
                      <Title style={{ color: "black" }}>Choose one issue</Title>
                    </Body>
                    <Right />
                  </Header>}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                headerStyle={{ backgroundColor: "#b95dd3" }}
                headerBackButtonTextStyle={{ color: "#fff" }}
                headerTitleStyle={{ color: "#fff" }}
                placeholder="Type of issues"
                placeholderStyle={{ color: "black", }}
                placeholderIconColor="blue"
                selectedValue={this.state.selected}
                style={styles.picker}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Car Accident" value="Car Accident" />
                <Picker.Item label="Robbery" value="Robbery" />
                <Picker.Item label="Damage" value="Damage" />
                <Picker.Item label="Machine malfunction" value="Machine malfunction" />
                <Picker.Item label="Other.." value="Other.." />
              </Picker>
            </View>



            <View style={{ padding: 10, }}>

              <TextInput style={{ height: 100, }}
                textAlignVertical='top'
                multiline={true}
                numberOfLines={6}
                maxLength={130}
                placeholder='Description'
                value={this.state.text}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => this.setState({ text })}
                mode='outlined'
                theme={{ colors: { primary: 'green', borderColor: 'black' } }}




              />

            </View>


            <View style={{ flexDirection: "column", alignItems: "flex-end", right: 5 }}>
              <Text >
                Characters: {this.state.text.length}/130
            </Text>

            </View>
           
              <TouchableOpacity style={ styles.uploadpic}  onPress={() => {
            this.setState({ visible: true })
          }}>
              <Text style={{fontSize:15,fontWeight:'600'}}>Upload Photo</Text>
         
                <Ionicons  style={{marginHorizontal:10}} name="md-camera" size={32} color="#808080"></Ionicons>
              </TouchableOpacity>
              <ImageActionSheet
          onDismiss={() => this.setState({ visible: false })}
          visible={visible}
          onSelect={image => this.setState({image: image.uri})}
          
        />
          
      
            <View style={{ marginTop:10, height: 130 }}>
              {this.state.image && (
                <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
              )}
            </View>
            <View >
              <TouchableOpacity style={styles.button} onPress={this.handlePost} >

                <Text style={styles.buttonText}>Submit</Text>
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
    marginTop: Platform.select({ android: -10}),


  },
  picker: {
    width: Platform.select({ ios: 320 }),
    borderWidth: Platform.select({ ios: 1 }),
    borderRadius: Platform.select({ ios: 5 }),
    borderColor: Platform.select({ ios: 'grey' }),
    marginLeft: Platform.select({ ios: 10 }),
    marginTop: Platform.select({ ios: 15 }),

  },
  androidPicker: {
    width: Platform.select({ android: 360 }),
    borderWidth: Platform.select({ android: 1 }),
    borderRadius: Platform.select({ android: 5 }),
    borderColor: Platform.select({ android: 'grey' }),
    marginLeft: Platform.select({ android: 10 }),
    marginTop: Platform.select({ android: 15 }),
  },
  contentContainer: {
    padding: 8,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  button: {
    marginTop:10,
    backgroundColor: "green",
    borderRadius: 8,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
   


  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  
  uploadpic:
  {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor:'grey',
    borderWidth: 1,
    width: 150,
    padding:5,
    marginTop: Platform.select({ android: -15}),
  },
  AndroidReport:
  {
    marginTop: Platform.select({ android: -40 }),
  }
});


