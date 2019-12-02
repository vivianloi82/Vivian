import React from "react";
import {  Text, View,Alert } from 'react-native';

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
//import { Ionicons } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome'

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PersonalDetailsScreen from "./screens/PersonalDetails";

 //BottomNavScreens
 import HomeScreen from './pages/Home';
 import ProfileScreen from './pages/Profile';
 import SmartPayScreen from './pages/SmartPay';
 //Screens
 import CarAvailabilityScreen from './pages/CarAvailability';
 import ReserveScreen from './pages/Reserve';
 import FindMyCarScreen from './pages/FindMyCar';
 import ReportScreen from './pages/Report';
 
const HomeStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Home: { screen: HomeScreen},
    CarAvailability: { screen: CarAvailabilityScreen,
      navigationOptions: () => ({
        title: 'Car Availability',
        
        
        
}), },
    Reserve: { screen: ReserveScreen,
      navigationOptions: () => ({
        title: 'Reserve',
      }), },
    FindMyCar: { screen: FindMyCarScreen,
      navigationOptions: () => ({
        title: 'Find My Car',
      }), },
    Report: { screen: ReportScreen,
      navigationOptions: () => ({
        title: 'Report an Issue',
      }),  },
  },

  {
    
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
     headerBackTitle:'Back',
     headerBackTitleStyle:
     {
      color:'dodgerblue',
     },
      headerStyle: {
        backgroundColor: 'white',
       
      },
    
      headerTintColor: 'black',
      title: 'Smart Car Parking',
    
     headerRight:
(
     <View style={{marginRight:5}}> 
      <Icon.Button name="phone" backgroundColor="red" color="white" 
       onPress={() => Alert.alert('Emergency button is pressed.')}>
        <Text style={{fontFamily:'Arial', fontSize:15,color:'white',fontWeight:"bold"}}>
          Emergency
        </Text>
      </Icon.Button>
      
    </View>
     
),

      //Header title
    },
  //headerLayoutPreset : 'center',
    
  }
  
);
const ProfileStack = createStackNavigator(
  {
    //Defination of Navigaton from profile screen
    Profile: { screen: ProfileScreen },
   
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      title: 'Profile',

      headerRight:
      (
           <View style={{marginRight:5}}> 
            <Icon.Button name="phone" backgroundColor="red" color="white" 
             onPress={() => Alert.alert('Emergency button is pressed.')}>
              <Text style={{fontFamily:'Arial', fontSize:15,color:'white',fontWeight:"bold"}}>
                Emergency
              </Text>
            </Icon.Button>
            
          </View>
           
      )
      //Header title
    },
  //  headerLayoutPreset : 'center',

  }
);
const SmartPayStack = createStackNavigator(
  {
    //Defination of Navigaton from smartpay screen
    SmartPay: { screen: SmartPayScreen },
   
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      title: 'SmartPay',
      headerRight:
      (
           <View style={{marginRight:5}}> 
            <Icon.Button name="phone" backgroundColor="red" color="white" 
             onPress={() => Alert.alert('Emergency button is pressed.')}>
              <Text style={{fontFamily:'Arial', fontSize:15,color:'white',fontWeight:"bold"}}>
                Emergency
              </Text>
            </Icon.Button>
            
          </View>
           
      )
      //Header title
    },
  //  headerLayoutPreset : 'center',
  

  }
);
const AppContainer = createBottomTabNavigator(
    
            {
              Home: { screen: HomeStack },
              SmartPay: { screen: SmartPayStack },
              Profile: { screen: ProfileStack },
            },
            {
              defaultNavigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                  const { routeName } = navigation.state;
                  let IconComponent = Ionicons;
                  let iconName;
                  if (routeName === 'Home') {
                    iconName = 'ios-home';
                  } else if (routeName === 'SmartPay') {
                    iconName = 'ios-wallet';
                  }
                  else if(routeName === 'Profile') {
                    iconName = 'ios-person';
                  }
                  return <IconComponent name={iconName} size={25} color={tintColor} />;
                },
              }),
              tabBarOptions: {
                activeTintColor: 'dodgerblue',
                inactiveTintColor: 'gray',
              },
            }
        );
       
   
const AuthStack = createStackNavigator({
    PersonalDetails: PersonalDetailsScreen,
    Register: RegisterScreen
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppContainer,
            Login: LoginScreen,
            Auth: AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    )
);
