//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Fire from "../Fire";

//import all the basic component we have used

export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);

        //this.onFocus = this.onFocus.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);


        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            user: {
                password: '',
                email: '',

            },
            currentPass: '',
            NewPass: '',
            newEmail: '',
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

    reauthenticate = (currentPass) => {
        var user = Fire.shared.auth().currentUser;
        var cred = Fire.shared.auth.EmailAuthProvider.credential(user.email, currentPass);

        return user.reauthenticateWithCredential(cred);
    }
    ChangePass = () => {

        this.reauthenticate(this.state.currentPass)
            .then(() => {

                var user = Fire.shared.auth().currentUser;
                var id = Fire.shared.uid;


                Fire.shared.firestore.collection("users").doc(id.toString()).update({
                    password: this.state.NewPass,
                }).then(ref => {

                    user.updatePassword(this.state.NewPass).then(() => {
                        alert('Password changed successfull');

                    }).catch((error) => {

                        alert(error.message);

                    });
                })
                    .catch(error => {
                        alert(error);
                    });

            }).catch((error) => {
                alert(error.message);


            });

    }
    ChangeEmail = () => {
        this.reauthenticate(this.state.currentPass)
            .then(() => {

                var user = Fire.shared.auth().currentUser;
                var id = Fire.shared.uid;

                Fire.shared.firestore.collection("users").doc(id.toString()).update({
                    email: this.state.newEmail,
                }).then(ref => {
                    user.updateEmail(this.state.newEmail).then(() => {

                        alert('Email changed successfull');

                    }).catch((error) => {

                        alert(error.message);

                    });
                })
                    .catch(error => {
                        alert(error);
                    });

            }).catch((error) => {
                alert(error.message);


            });
    }

    // DeleteAcc = () => {
    //     this.reauthenticate(this.state.currentPass)
    //         .then(() => {
    //             var id = Fire.shared.uid;
    //             var user = Fire.shared.auth().currentUser;
    //             Fire.shared.firestore.collection("users").doc(id.toString()).delete().then(ref => {
    //                 user.delete().then(() => {
    //                     alert('Account deleted successfull');

    //                 }).catch((error) => {

    //                     alert(error.message);

    //                 });


    //             })
    //                 .catch(error => {
    //                     alert(error);
    //                 });



    //         }).catch((error) => {
    //             alert(error.message);


    //         });
    // }
    render() {
        let { secureTextEntry } = this.state;

        return (
            <View style={{ flex: 1, marginHorizontal: 20 }}>
                <View >
                    <TextField
                        //style={styles.input}
                        labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase', }}
                        label='New Email'
                        placeholder=' '
                        lineWidth={1}
                        keyboardType='email-address'

                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ newEmail: text })}
                        value={this.state.newEmail}

                    ></TextField>
                </View>


                <TouchableOpacity style={styles.Emailbutton} onPress={this.ChangeEmail} >

                    <Text style={styles.buttonText}  >Change Email</Text>
                </TouchableOpacity>


                <View >
                    <TextField
                        //style={styles.input}
                        labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase', }}
                        label='New Password'
                        placeholder=' '
                        clearTextOnFocus={true}
                        lineWidth={1}
                        secureTextEntry={secureTextEntry}

                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ NewPass: text })}
                        value={this.state.NewPass}
                        renderRightAccessory={this.renderPasswordAccessory}

                    ></TextField>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.ChangePass} >

                    <Text style={styles.buttonText}  >Change Password</Text>
                </TouchableOpacity>
                <View >
                    <TextField
                        //style={styles.input}
                        labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase', }}
                        label='Current Password'
                        placeholder=' '
                        clearTextOnFocus={true}
                        lineWidth={1}
                        secureTextEntry={secureTextEntry}

                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ currentPass: text })}
                        value={this.state.currentPass}
                        renderRightAccessory={this.renderPasswordAccessory}

                    ></TextField>
                </View>

                {/* <TouchableOpacity style={styles.Deletebutton} onPress={this.DeleteAcc}>

                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    // Deletebutton: {
    //     marginHorizontal: 9,
    //     marginVertical: 10,
    //     backgroundColor: "red",
    //     borderRadius: 8,
    //     height: 52,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     // borderColor:"#38AEE6",
    //     // borderWidth:2,

    //     bottom: 0

    // },
    Emailbutton: {
        marginHorizontal: 9,
        marginVertical: 10,
        backgroundColor: "blue",
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
});