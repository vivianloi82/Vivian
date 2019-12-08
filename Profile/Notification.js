//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {  View, FlatList,StyleSheet} from 'react-native';
//import all the basic component we have used
import Table, {Section,  StaticCell, BioCell, TouchableCell} from 'react-native-js-tableview';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Fire from "../Fire";

export default class NotificationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
        Notifications: [],
       
        title: '',
        subtitle:''
    });
    this.ref = Fire.shared.firestore.collection("Notifications");
}



componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            //    console.log(doc.data().category);
            //    console.log(doc.data().points);
            //    console.log(doc.data().title);
            data.push({
               
                title: doc.data().title,
                subtitle:  doc.data().subtitle,
            });
            this.setState({
              Notifications: data,

            })
         //   console.log(this.state.BrowseRewards);
        });


    });
  
}


  render() {
    return (
      <View style={{ flex: 1}}>
  <Table style={{backgroundColor:'white',height:640}}  scrollable={true} > 
           
          
         
           <FlatList
                    data={this.state.Notifications}
                    renderItem={({ item }) => {
                        return (

                            <View>

<StaticCell style={styles.borderbottom} iconComponent={   <MaterialIcon name="notifications-none" size={25} />} title={item.title} subtitle={item.subtitle} accessory="disclosure"  />
            
                            </View>

                        )

                    }}
                    keyExtractor={(item)=>item.title}


                />


               
         
           


         

       </Table>     
       
          </View>
    );
  }
}
const styles = StyleSheet.create({
  borderbottom:{
      borderBottomColor:"#d3d3d3",
      borderBottomWidth:0.5,
      backgroundColor:'white'

  }
});