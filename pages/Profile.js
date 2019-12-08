import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Table, {Section,  StaticCell, BioCell, TouchableCell} from 'react-native-js-tableview';
import Fire from "../Fire";

export default class ProfileScreen extends React.Component {
    state = {
        user: {}
    };

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

    render() {
        return (
            <View style={styles.container}>
                  <Table style={{backgroundColor:'white',height:2000}} scrollable={true}> 
           
          
        
          
               <BioCell  title={this.state.user.name} subtitle={this.state.user.points + " point(s)"} />
               <StaticCell style={styles.row} title="My QR Code" accessory="disclosure" onPress={() =>  {this.props.navigation.navigate("ViewQR")}} />
               <StaticCell style={styles.row} title="Edit Profile" accessory="disclosure" onPress={() => {this.props.navigation.navigate("EditProfile")}} />
               <StaticCell style={styles.row} title="Rewards" accessory="disclosure" onPress={() => {this.props.navigation.navigate("Rewards")}} />
               <StaticCell style={styles.row} title="History" accessory="disclosure" onPress={() => {}} />
               <StaticCell style={styles.row} title="Notification" accessory="disclosure" onPress={() => {this.props.navigation.navigate("Notification")}} />
               <StaticCell style={styles.row} title="Settings" accessory="disclosure" onPress={() => {this.props.navigation.navigate("Settings")}} />

               
            </Table>  


    {/*    Log out button    */}

  <TouchableOpacity style={styles.button}  onPress={() => { Fire.shared.signOut();}} >

<Text style={styles.buttonText}>Log out</Text>
</TouchableOpacity>     
         

          

      
             
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row:{
        borderBottomWidth:0.5,
        borderBottomColor:'#d3d3d3',
        marginHorizontal:10
    },
    container: {
        flex: 1,
       

    },
    button: {
        marginHorizontal: 9,
        marginVertical: 10,
        backgroundColor: "#89CFF0",
        borderRadius: 8,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        borderColor:"#38AEE6",
        borderWidth:2,
       
        bottom:0
    
      },
      buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
      },
});
