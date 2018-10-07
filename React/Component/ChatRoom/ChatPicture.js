import {View, Image } from 'react-native';
import React, { Component } from 'react';

export default class ChatPicture extends Component {

	 constructor(props) {
	 	super(props);
	 }

	 render(){
	 	var prop = this.props;
	 	var styles = prop.style;

	 	return (
	 		 <View  style={[styles.innerGroupView, styles.innerGroupViewImage]}>
            	<Image
                	source={{uri:prop.src }}
                	style={styles.groupImage}
            	/>
        	</View>
	 	)
	 }
}