import {View, Text } from 'react-native';
import React, { Component } from 'react';

export default class ChatDescription extends Component {

	 constructor(props) {
	 	super(props);
	 }

	 render(){
	 	var prop = this.props;
	 	var styles = prop.style;

	 	return(
	 		<View style={styles.chatViewBottom}>
                              <Text style={styles.textHighlight}>
                                {prop.desc}
                              </Text>
            </View>
	 	)
	 }
}