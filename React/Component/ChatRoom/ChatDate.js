import {View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from '../../Styles/ChatRoomList';

export default class ChatDate extends Component {

   constructor(props) {
    super(props);
   }

   render(){
    var prop = this.props;

    return (
       <View style={[styles.notifTop]}>
                               <Text style={styles.notifTime}>
                                  {prop.date}
                              </Text>
                          </View>
    )
   }
}