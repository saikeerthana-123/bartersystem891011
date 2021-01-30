import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import RequestScreen from '../screens/RequestScreen';


export const AppTabNavigator = createBottomTabNavigator({
  Donate : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/donate.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Donate",
    }
  },
  Request: {
    screen: RequestScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Request",
    }
  }
});
