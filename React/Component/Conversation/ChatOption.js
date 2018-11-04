import { Text, View,TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import styles from '../../Styles/Conversation';
import * as selectImage from '../../Helper/SelectImage.js';
import * as fireHelper from '../../Helper/FirebaseHelper.js';

export default class ChatOption extends Component {

   constructor(props) {
    super(props);
    this.leftChat = this.leftChat.bind(this);
   }

   chooseBg(){
      var user = this.props.user;
      var data = this.props.data;

      selectImage.selectImage((displayUrl)=>{
          fireHelper.UpdateData("/users/"+user.uid+"/chat/"+data.key, {'bg': displayUrl});
      });
   }

   leftChat(){
      var data = this.props.data;
      data.displayText = data.name;
      this.props.leftChat(data, this.props.goBack);
   }

   render(){
    var prop = this.props;

    return (
        <View style={styles.chatOptionHolder}>
          <TouchableOpacity style={styles.chatOptionItem} onPress = { () => prop.findUser(prop.data.key)}>
              <View style={styles.chatOptionTopView}>
                  <Feather name="user-plus" type="material-community" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:15,color:'#000'}}></Feather>
              </View>
              <View  style={styles.chatOptionBottomView}>
                  <Text style={{fontSize:8}}>Invite</Text>
              </View>
            </TouchableOpacity>

             <TouchableOpacity style={styles.chatOptionItem}>
              <View style={styles.chatOptionTopView}>
                  <FontAwesome name="users" type="material-community" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:15,color:'#000'}}></FontAwesome>
              </View>
              <View  style={styles.chatOptionBottomView}>
                  <Text style={{fontSize:8}}>Member</Text>
              </View>
            </TouchableOpacity>


             <TouchableOpacity style={styles.chatOptionItem} onPress = { () => prop.editChat(prop.data.key)}>
              <View style={styles.chatOptionTopView}>
                  <Feather name="edit" type="material-community" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:15,color:'#000'}}></Feather>
              </View>
              <View  style={styles.chatOptionBottomView}>
                  <Text style={{fontSize:8}}>Edit</Text>
              </View>
            </TouchableOpacity>

             <TouchableOpacity style={styles.chatOptionItem} onPress = { ()=>this.chooseBg() }>
              <View style={styles.chatOptionTopView}>
                  <FontAwesome name="image" type="material-community" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:15,color:'#000'}}></FontAwesome>
              </View>
              <View  style={styles.chatOptionBottomView}>
                  <Text style={{fontSize:8}}>Background</Text>
              </View>
            </TouchableOpacity>

             <TouchableOpacity style={[styles.chatOptionItem,{borderRightWidth:0}]} onPress = { ()=>this.leftChat() }>
              <View style={styles.chatOptionTopView}>
                  <Icon name="exit-to-app" type="material-community" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:18,color:'#000'}}></Icon>
              </View>
              <View  style={styles.chatOptionBottomView}>
                  <Text style={{fontSize:8}}>Left Group</Text>
              </View>
            </TouchableOpacity>


        </View>

    )
   }
}