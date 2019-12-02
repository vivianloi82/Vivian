import React from "react";
import {
    View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView,
    SafeAreaView
} from "react-native";
import * as firebase from "firebase";
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        email: "",
        password: "",
        errorMessage: null
    };

    handleLogin = () => {
        const { email, password } = this.state;
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)

        }
        catch (error) {
            if (this.state.email == null && this.state.password ==null)
			{alert('Please fill in your email and password')}
			else if (this.state.email == null)
			{alert('Please fill in your email')}
			else if (this.state.password == null)
			{alert('Please fill in your password')}
        }

    };
    constructor(props) {
        super(props);

        //this.onFocus = this.onFocus.bind(this);

        //onSubmitEmail
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        //onSubmitPassword
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);

        this.emailRef = this.updateRef.bind(this, 'email');
        this.passwordRef = this.updateRef.bind(this, 'password');

        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {

            secureTextEntry: true,
        };
    }

    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }
    onSubmitEmail() {
        this.password.focus();
    }

    onSubmitPassword() {
        this.password.blur();
    }
    updateRef(name, ref) {
        this[name] = ref;
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
    forgotPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
          .then(function () {
            alert('Please check your email to reset your password.')
          }).catch(function (e) {
            console.log(e)
          })
      }
    render() {
        //LayoutAnimation.easeInEaseOut();
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
                            style={{ marginTop: -180, marginLeft: -50 }}
                        ></Image>
                        <Image
                            source={require("../assets/authFooter.png")}
                            style={styles.authFooter}
                        ></Image>
                        <Image
                            source={require("../assets/loginLogo.png")}
                            style={{ marginTop: -110, alignSelf: "center" }}
                        ></Image>
                        <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>

                        <View style={styles.errorMessage}>
                            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                        </View>

                        <View style={styles.form}>
                            <View>
                                <TextField
                                    //style={styles.input}
                                    lineWidth={1}
                                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: 'transparent' }}
                                    labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                                    ref={this.emailRef}

                                    //style={styles.inputBox}

                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    //onFocus={this.onFocus}
                                    onSubmitEditing={this.onSubmitEmail}
                                    returnKeyType='next'
                                    label='Email Address'
                                    placeholder=' '

                                    onChangeText={email => this.setState({ email })}
                                    value={this.state.email}
                                ></TextField>
                            </View>

                            <View style={{ marginTop: 32 }}>
                                <TextField
                                    lineWidth={1}
                                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: 'transparent' }}
                                    labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                                    ref={this.passwordRef}
                                    secureTextEntry={secureTextEntry}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    clearTextOnFocus={true}
                                    //onFocus={this.onFocus}
                                    onSubmitEditing={this.onSubmitPassword}
                                    returnKeyType='done'
                                    label='Password'
                                    placeholder=' '

                                    renderRightAccessory={this.renderPasswordAccessory}
                                    onChangeText={password => this.setState({ password })}
                                    value={this.state.password}
                                ></TextField>
                            </View> 
                             <TouchableOpacity
                            style={{justifyContent:'flex-end',flexDirection:'row',}}
                            onPress={this.forgotPassword}
                        >
                            <Text style={{ fontWeight: "500", color: "#E9446A", fontWeight:'bold' }
                            }>Forgot password?</Text>
                           
                        </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                            <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign in</Text>
                        </TouchableOpacity>
                      
                        <TouchableOpacity
                            style={{ alignSelf: "center", marginTop: 20 }}
                            onPress={() => this.props.navigation.navigate('PersonalDetails')}
                        >
                            <Text style={{ color: "#414959", fontSize: 15 }}>
                            Haven't have an account?  <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign up Now</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    authFooter:
    {
        position: "absolute",
        right: -200,
        bottom: Platform.select({ ios: -100, android: 0 }),
    },

    safeContainer: {
        flex:1,
        backgroundColor: 'white',
        marginTop: Platform.select({ ios: -45, android: -30 }),
        height: 2000

    },
    scroll: {
        backgroundColor: 'white',
    },

    container: {

        marginRight: 8,
        marginLeft: 8,


    },
    greeting: {
        marginTop: -32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    form: {
        marginBottom: 30,
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
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    }
});
