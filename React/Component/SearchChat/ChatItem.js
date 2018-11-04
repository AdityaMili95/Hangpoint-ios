import { Text, View, Image, TouchableOpacity, NativeModules } from 'react-native';
import React, { Component } from 'react';
import styles from '../../Styles/SearchChat';
import ChatPicture from '../ChatRoom/ChatPicture';
import ChatName from '../ChatRoom/ChatName';
import ChatDescription from '../ChatRoom/ChatDescription';
import ChatDate from '../ChatRoom/ChatDate';

import IonIcon from 'react-native-vector-icons/Ionicons';


export default class ChatItem extends Component {

   constructor(props) {
    super(props);
   }

   getSubmitButton = (key, data, isFindUser)=>{
      var prop = this.props;

      if (isFindUser){
          return (<TouchableOpacity style={[styles.buttonJoin]} onPress={()=> prop.inviteChat(key, data)}y>
                                      <Text style={[{fontSize:10,textAlign:'center',color:"#fff"}]}>Invite</Text>
                                </TouchableOpacity>);    
      }
      return (<TouchableOpacity style={[styles.buttonJoin]} onPress={()=> prop.joinChat(key, data)}y>
                                      <Text style={[{fontSize:10,textAlign:'center',color:"#fff"}]}>Join</Text>
                                </TouchableOpacity>);
   }

   render(){
    var prop = this.props;
    var data = prop.data;

    return (
       <View style={[styles.group,styles.myData]}>
                    
                  <ChatPicture style={styles} src={data.image} />

                      <View  style={[styles.innerGroupView, styles.innerGroupViewDetail]}>
                          <ChatName style={styles} name={data.name} />
                          <ChatDescription style={styles} desc = {data.desc}/>
                      </View>

                      <View  style={[styles.innerGroupView, styles.innerGroupViewNotif]}>
                          <ChatDate style={styles} date ={data.date} />

                          <View  style={[styles.notifBottom]}>
                                { this.getSubmitButton(prop.chatKey, data, prop.isFindUser) }
                          </View>
                      </View>  
              </View>
    )
   }
}