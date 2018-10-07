import {View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from '../../Styles/ChatRoomList';
import Placeholder from 'rn-placeholder';

import {StyleSheet} from 'react-native';

export default class ChatPlaceholder extends Component {

   constructor(props) {
    super(props);
   }

   
  render() {
    return (
      <View style={[styles.group,styles.myData]}>
       
        <View  style={[styles.innerGroupView, styles.innerGroupViewImage,placeholderStyle.groupImage]}>
          <Placeholder.ImageContent
            size={52}
            animate="fade"
            lineNumber={4}
            lineSpacing={5}
            lastLineWidth="30%"
            hasRadius
          ></Placeholder.ImageContent>
          </View>

          <View  style={[styles.innerGroupView, styles.innerGroupViewDetail]}>
              <Placeholder.Paragraph
                lineNumber={2}
                textSize={10}
                lineSpacing={12}
                width="100%"
                lastLineWidth="90%"
                firstLineWidth="80%"
                animate="fade"
              />
          </View>

          <View  style={[styles.innerGroupView, styles.innerGroupViewNotif,{justifyContent:'center'}]}>
              <Placeholder.Paragraph
                lineNumber={2}
                textSize={10}
                lineSpacing={12}
                width="100%"
                lastLineWidth="80%"
                firstLineWidth="70%"
                animate="fade"
              />
          </View>

          
        
      </View>
    );
  }
}



const placeholderStyle = StyleSheet.create({
  groupImage:{
    paddingLeft:15
  }
});