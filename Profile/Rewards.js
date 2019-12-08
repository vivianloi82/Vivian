//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {StyleSheet, View, Text} from 'react-native';
import {Tab , Tabs, Container , Header, Left, Body, Right} from 'native-base'
//import all the basic component we have used
import BrowseRewards from './BrowseRewards'
import MyRewards from './MyRewards'

export default class RewardsScreen extends React.Component {
  render() {
    return (
   <Container>


<Tabs>
  <Tab heading="Browse" activeTabStyle={{backgroundColor:'purple'}} activeTextStyle={{color:"white"}} >
    <BrowseRewards navigation = {this.props.navigation}/>
    
  </Tab>
  <Tab heading="My Rewards" activeTabStyle={{backgroundColor:'purple'}} activeTextStyle={{color:"white"}}>
    <MyRewards navigation = {this.props.navigation}/>
  </Tab>
</Tabs>

</Container>   

    );
  }
}

const styles = StyleSheet.create({
   
   })
   