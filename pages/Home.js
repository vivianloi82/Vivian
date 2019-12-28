//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
//import all the basic component we have used
import Fire from "../Fire";


class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      TextInputDisableStatus: false,
      user: {
        balance: ''
      },
    }
  }
  componentDidMount() {
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
  render() {

    return (
      <View>
        {/* Top Home
        <View style={{ borderWidth: 2, width: 350, marginHorizontal: 30, marginTop: 40, height: 90 }}>
          <View style={{ borderBottomWidth: 1, width: 347, marginTop: 40 }}>

          </View>
        </View>
        <View style={{ marginTop: -80 }}>

          <View style={{ flexDirection: 'row', marginLeft: 50 }}>
            <Text style={{ fontSize: 20 }} >Balance</Text>
            <Text style={{ position: 'absolute', right: 0, fontSize: 20, marginRight: 50 }}>RM{this.state.balance}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginHorizontal: 40 }}>
            <TouchableOpacity style={styles.Topbutton} >

              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Topbutton} >

              <Text style={styles.buttonText}>Request </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Topbutton} onPress={() => this.props.navigation.navigate('TopUp')}>

              <Text style={styles.buttonText}>Top up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Topbutton} onPress={() => this.props.navigation.navigate('Rewards')} >

              <Text style={styles.buttonText}>Rewards</Text>
            </TouchableOpacity>
          </View>

        </View> */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>


        </View>
        <Text style={{color:'black',justifyContent: 'center', alignSelf:"center", fontSize:40}}>Smart Car Parking</Text>

        {/* Bottom */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 130 }}>

          <View
            style={{
              flexDirection: 'row'
            }}>
            <View style={styles.buttonShadow}>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('CarAvailability')}>
                <Text style={styles.textstyle}>Car Availability</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Reserve')}>
              <Text style={styles.textstyle}>Reserve</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row', marginTop: 200


            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('FindMyCar')}>
              <Text style={styles.textstyle}>Find My Car</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Report')}>
              <Text style={styles.textstyle}>Report an Issue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {

    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,


    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 15,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,

  },
  textstyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  Topbutton:
  {
    marginHorizontal: 10,
    backgroundColor: "transparent",
    borderRadius: 8,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },

})

export default (HomeScreen)