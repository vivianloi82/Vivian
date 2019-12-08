//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {  View} from 'react-native';
//import all the basic component we have used
import Table, {Section,  StaticCell, BioCell, TouchableCell} from 'react-native-js-tableview';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class NotificationScreen extends React.Component {


  render() {
    return (
      <View style={{ flex: 1,  }}>
  <Table  scrollable={true}> 
           
          
           <Section > 

               <StaticCell iconComponent={   <MaterialIcon name="notifications-none" size={25} />} title="Christmas Discount" subtitle="Discounts are during 15 Dec to 30 Dec at selected stores." accessory="disclosure" onPress={() => {this.props.navigation.navigate("ViewProfile")}} />
               <StaticCell iconComponent={   <MaterialIcon name="notifications-none" size={25} />} title="Big Sales for Rewards" subtitle="During 15 Nov 2019 to 20 Nov 2019 at Rewards." accessory="disclosure" onPress={() => {this.props.navigation.navigate("EditSelf")}} />
               <StaticCell iconComponent={   <MaterialIcon name="notifications-none" size={25} />} title="Application updated" subtitle="New features to bring convenient to you!" accessory="disclosure" onPress={() =>  {this.props.navigation.navigate("ViewQR")}} />
               <StaticCell iconComponent={   <MaterialIcon name="notifications-none" size={25} />} title="Get 20% for Reservation, T&C applied" subtitle="New users will get 20% if reserve more than 2 hours." accessory="disclosure" onPress={() => {this.props.navigation.navigate("RewardsNavi")}} />
               <StaticCell iconComponent={   <MaterialIcon name="notifications-none" size={25} />} title="Get RM 5 Rebate!!"  subtitle="Users will getRM 5 Rebateif reserve more than 3 hours on weekends" accessory="disclosure" onPress={() => {}} />
               <StaticCell iconComponent={   <MaterialIcon name="notifications-none" size={25} />} title="Rate us your experience" subtitle="We would like to get reviews from you to improve the application."  accessory="disclosure" onPress={() => {this.props.navigation.navigate("Notify")}} />
               <StaticCell iconComponent={   <MaterialIcon name="notifications-none" size={25} />} title="Message from Smart Car Parking" subtitle="You can now reserve for available parking slots!" accessory="disclosure" onPress={() => {this.props.navigation.navigate("Settings")}} />

               
           </Section>
           


            <Section>

             
           </Section> 

       </Table>     
       
          </View>
    );
  }
}