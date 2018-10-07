import {View, Text } from 'react-native';
import React, { Component } from 'react';

export default class ChatName extends Component {

	 constructor(props) {
	 	super(props);
	 }

	 render(){
	 	var prop = this.props;
	 	var styles = prop.style;

	 	return (
	 		 <View style={styles.chatViewTop}>
				<Text style={styles.groupName}>
					{prop.name}
				</Text>
			</View>
	 	)
	 }
}