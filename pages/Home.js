//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet,Button } from 'react-native';
//import all the basic component we have used


 class HomeScreen extends React.Component {
 

  render() {
   
    return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: 80 }}>
         
  
     <View
          style={{
            flexDirection: 'row'
          }}>
            <View  style={styles.buttonShadow}>

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
            flexDirection: 'row'


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
   fontSize:15,
   fontWeight: 'bold'
   
  },
  buttonShadow:
  {
    
  }
})

export default (HomeScreen)