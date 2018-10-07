import {View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from '../Styles/Header';

export default class Header extends Component {

   constructor(props) {
    super(props);
   }

   render(){
    var prop = this.props;
    return (
       <View style={styles.header}>
          <Text style={styles.headtext}>
            {prop.title}
          </Text>
        </View>
    )
   }
}