import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, StatusBar, ScrollView,
    SafeAreaView } from "react-native";
//import { Ionicons } from "@expo/vector-icons";
import { TextField } from 'react-native-material-textfield';
import { Container, Header, Title, Button, Icon, Right, Body, Left, Picker, Form } from "native-base";



export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

   
   
    constructor(props) {
        super(props);

     

        this.state = {
            user: {
                name: "",
                phone: "",
                icno: "",
               
                gender: "",
    
            },
           
        };
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
                <StatusBar barStyle="light-content"></StatusBar>
                <Image
                    source={require("../assets/authHeader.png")}
                    style={styles.authHeader}
                ></Image>
                <Image
                    source={require("../assets/authFooter.png")}
                    style={styles.authFooter}
                ></Image>
               
               <Text style={styles.greeting}>{`Personal Details`}</Text>
                <View style={styles.form}>
                    <View>
                        <TextField
                          lineWidth={1}
                            //style={styles.input}
                            labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                            label='Full Name'
                              placeholder=' '
                            onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
                            value={this.state.user.name}
                        ></TextField>
                    </View>
                    <View>
                        <TextField
                          lineWidth={1}
                            //style={styles.input}
                            labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                            label='Phone Number'
                              placeholder=' '
                            onChangeText={phone => this.setState({ user: { ...this.state.user, phone } })}
                            value={this.state.user.phone}
                            keyboardType='phone-pad'
                        ></TextField>
                    </View>
                    <View>
                        <TextField
                          lineWidth={1}
                            //style={styles.input}
                            labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                            label='Identity Number'
                              placeholder=' '
                            onChangeText={icno => this.setState({ user: { ...this.state.user, icno } })}
                            value={this.state.user.icno}
                            keyboardType='number-pad'
                        ></TextField>
                    </View>
                    <View style={styles.gender}>


<Text style={{
    color: "#A9A9A9",
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: "uppercase",
    marginRight:20

}}>Gender</Text>
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
                selectedValue={this.state.user.gender}
                style={styles.picker}
                onValueChange={gender => this.setState({ user: { ...this.state.user, gender } })}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                 </Picker>
            </View>
            </View>
                  
                </View>

                <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate("Register",
                 {Sendname:this.state.user.name,Sendphone:this.state.user.phone,
                    Sendicno:this.state.user.icno,Sendgender:this.state.user.gender })}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Next</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 20 }}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#414959", fontSize: 15, marginBottom:120 }}>
                        Already have an account? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    safeContainer: {
        flex:1,
        backgroundColor: 'white',
        marginTop: Platform.select({ ios: -45}),
        height: 2500


    },
    authFooter:
    {
       
        position: "absolute",
        right: -200,
        bottom: Platform.select({ ios: -80, android: 20 }),
    },
    authHeader:
    {
        marginTop: Platform.select({ ios:20, android: -20 }),
        marginLeft: -10
    },
    scroll: {
        backgroundColor: 'white',
    },

    container: {

        marginRight: 8,
        marginLeft: 8,
        marginTop:-200


    },
    greeting: {
        marginTop: Platform.select({ ios: -100, android: -80 }),
        marginLeft: Platform.select({  android:-10 }),

        fontSize: 20,

        textAlign: "center",
        color: "black",
       
    },
    form: {
        marginBottom: 30,
        marginTop: 30,
        marginHorizontal: 30,
        
    },
    
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
  
    picker: {
        width: Platform.select({ ios: 200 }),
        borderWidth: Platform.select({ ios: 1 }),
        borderRadius: Platform.select({ ios: 5 }),
        borderColor: Platform.select({ ios: 'grey' }),
        marginLeft: Platform.select({ ios: 10 }),
        marginTop: Platform.select({ ios: 15 }),
    
      },
      androidPicker: {
        width: Platform.select({ android: 150 }),
        borderWidth: Platform.select({ android: 1 }),
        borderRadius: Platform.select({ android: 5 }),
        borderColor: Platform.select({ android: 'grey' }),
        marginLeft: Platform.select({ android: 10 }),
        marginTop: Platform.select({ android: 15 }),
      },
      gender:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',


        },
});
