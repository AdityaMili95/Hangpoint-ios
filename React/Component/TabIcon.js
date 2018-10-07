import React, { Component } from 'react';

import {
  Text
} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';

export default class TabBarIcon extends Component {
  render() {
    return (
      	<IonIcon name="ios-keypad" type="ionicons" style={[{
      		fontSize:21,
      		color:"#039BE5"
      	}]}></IonIcon>
    );
  }
}