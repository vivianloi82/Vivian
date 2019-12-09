//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used
import { TextField } from 'react-native-material-textfield';
import Fire from "../Fire";

export default class TopUpScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          TextInputDisableStatus: false,
          user: {
            balance: ''
          },
       
          topup:''
        }
      }
      componentWillMount() {
        const user = this.props.uid || Fire.shared.uid;
    
        this.unsubscribe = Fire.shared.firestore
          .collection("users")
          .doc(user).collection("Balance").get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.setState({
                balance: doc.data().balance,
    
              })
              // console.log(balance)
            });
    
    
          })
      }
    onPressButton =(amount)=>
    {
      
        var newBalance = ( Number(this.state.balance) + Number(amount))
        const user = this.props.uid || Fire.shared.uid;    
        
        Fire.shared.firestore.collection("users").doc(user).collection("Balance").doc("B0001").set({
           balance :String(newBalance)
             
         })  .then(ref => {
          //this.props.navigation.goBack();
        })
        .catch(error => {
          alert(error);
        });
    }
  render() {
    return (
      <View style={{ flex: 1}}>
            <View style={{ flexDirection: 'row', marginLeft: 50 }}>
            <Text style={{ fontSize: 20 }} >Balance</Text>
            <Text style={{ position: 'absolute', right: 0, fontSize: 20, marginRight: 50 }}>RM {this.state.balance}</Text>
          </View>
          <View style={{ marginHorizontal: 10,flexDirection:'row',justifyContent:"center",alignContent:'center',marginTop:20}}>
            <Text style={{fontSize:20}}>Top Up amount</Text> 
            <View style={{ width: 100,marginTop:-30,marginLeft:15}}>
            <TextField      style={{ fontSize:20}}
                          lineWidth={1}
                            //style={styles.input}
                            labelTextStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                            label=''
                            placeholder=' '
                            onChangeText={topup => this.setState({  topup  })}
                            value={this.state.topup}
                            keyboardType='number-pad'
                        ></TextField>
  
          </View>
          </View>
          <TouchableOpacity style={styles.TopUpbutton} onPress={this.onPressButton(this.state.topup)}>

<Text style={styles.buttonText}>Top Up</Text>
</TouchableOpacity>

    
      </View>
    );
  }
}


const styles = StyleSheet.create({
 
   TopUpbutton: {
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