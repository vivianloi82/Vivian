import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, StatusBar, ScrollView,
    SafeAreaView } from "react-native";
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Fire from "../Fire";

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

   

    handleSignUp = () => {
        
        Fire.shared.createUser(this.state.user,
       this.state.user.name = this.props.navigation.getParam('Sendname'),
       this.state.user.phone =  this.props.navigation.getParam('Sendphone'),
       this.state.user.icno =   this.props.navigation.getParam('Sendicno'),
       this.state.user.gender =    this.props.navigation.getParam('Sendgender'),
        );
    };

   
    constructor(props) {
        super(props);

        //this.onFocus = this.onFocus.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);

    
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            user: {
                username: "",
                email: "",
                password: "",
                name: "",
                phone: "",
                icno: "",
                gender: "",
    
            },
            secureTextEntry: true,
        };
    }
  
    
    
    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }
    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;

        let name = secureTextEntry ?

            'visibility-off' :
            'visibility';

        return (
            <MaterialIcon
                size={24}
                name={name}
                color='grey'
                onPress={this.onAccessoryPress}
                suppressHighlighting={true}
            />
        );
    }
    render() {
        let { secureTextEntry } = this.state;

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
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
                </TouchableOpacity>
               <Text style={styles.greeting}>{`Sign up \n Here to get started.`}</Text>
                <View style={styles.form}>
                <View>
                        <TextField
                          lineWidth={1}
                            //style={styles.input}
                            labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                            label='User Name'
                              placeholder=' '
                            onChangeText={username => this.setState({ user: { ...this.state.user, username } })}
                            value={this.state.user.username}
                        ></TextField>
                    </View>
        
                    <View >
                        <TextField
                          lineWidth={1}
                            //style={styles.input}
                            labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                            label='Email Address'
                              placeholder=' '
                              keyboardType='email-address'
                              autoCapitalize='none'
                              autoCorrect={false}
                            onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
                            value={this.state.user.email}
                        ></TextField>
                    </View>

                    <View >
                        <TextField
                            //style={styles.input}
                            labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase', }}
                            label='Password'
                              placeholder=' '
                              clearTextOnFocus={true}
                              lineWidth={1}
                              secureTextEntry={secureTextEntry}

                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
                            value={this.state.user.password}
                            renderRightAccessory={this.renderPasswordAccessory}

                        ></TextField>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 20 }}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#414959", fontSize: 15, marginBottom:160}}>
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
        marginTop: Platform.select({ ios: -140, android: -110 }),
        marginLeft: Platform.select({ ios: -10, android:0 }),

        fontSize: 20,

        textAlign: "center",
        color: "black",
       
    },
    form: {
        marginBottom: 30,
         marginTop: 30,
        marginHorizontal: 30
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
        back: {
           
            top: -150,
            left: 20,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "rgba(21, 22, 48, 0.3)",
            alignItems: "center",
            justifyContent: "center"
        },
});
