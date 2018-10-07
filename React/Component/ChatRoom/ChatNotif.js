import {View, Text } from 'react-native';
import React, { Component } from 'react';

export default class ChatNotif extends Component {

   constructor(props) {
    super(props);
   }

   render(){
    var prop = this.props;
    var styles = prop.style;

    return (
       <View  style={[styles.notifBottom]}>
                            <View style={[styles.notifHolder]}>
                              <Text style={styles.notifText}>
                                    {prop.count}
                              </Text>
                            </View>
                          </View>
    )
   }
}