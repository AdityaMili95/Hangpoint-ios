import { Text, View, Image, TouchableOpacity, NativeModules } from 'react-native';
import React, { Component } from 'react';
import styles from '../../Styles/ChatRoomList';
import ChatDate from './ChatDate';
import ChatDescription from './ChatDescription';
import ChatName from './ChatName';
import ChatNotif from './ChatNotif';
import ChatPicture from './ChatPicture';
import * as fireHelper from '../../Helper/FirebaseHelper.js';

import IonIcon from 'react-native-vector-icons/Ionicons';


var RoomHandler = NativeModules.HPChatRoomHandler;

export default class ChatRoom extends Component {

	 constructor(props) {
	 	super(props);
	 }

   displayConfirmation(){
      RoomHandler.LogOutConfirmation((stat)=>{
        if(!stat){
          return;
        }
        fireHelper.logOut();
      });
   }

   getNotifComponent(data){
      if (!data.notRead || data.notRead == "" || data.notRead == "0"){
          return;
      }

      return <ChatNotif style={styles} count = {data.notRead}/>;
   }

   detailBar(data){
      if(!data.isProfile){

        return (<View  style={[styles.innerGroupView, styles.innerGroupViewNotif]}>
                    <ChatDate style={styles} date ={data.date} />
                    {this.getNotifComponent(data)}
                 </View>);
      }

      return (<View  style={[styles.innerGroupView, styles.innerGroupViewNotif]}>
                    <ChatDate style={styles} date ={data.date} />
                    <TouchableOpacity onPress = {() => this.displayConfirmation()} ><IonIcon name="md-exit" type="ionicons" style={[styles.AccordionArrow,{fontSize:20,color:'rgba(52, 73, 94,1.0)', marginTop:5,marginRight:8,alignSelf:'flex-end'}]}></IonIcon></TouchableOpacity>
                </View>);
   }

	 render(){
	 	var prop = this.props;
    var data = prop.data;

    if (!prop.toConvers){
      return (
        <View style={[styles.group,styles.myData]}>
                    
                      <ChatPicture style={styles} src={data.image} />

                      <View  style={[styles.innerGroupView, styles.innerGroupViewDetail]}>
                          <ChatName style={styles} name={data.name} />
                          <ChatDescription style={styles} desc = {data.desc}/>
                      </View>

                      {this.detailBar(data)}  
                    </View>
      )
    }
	 	return (
	 		 <TouchableOpacity onPress={() => this.props.toConvers(data)}>
                  <View style={[styles.group,styles.myData]}>
                    
                      <ChatPicture style={styles} src={data.image} />

                      <View  style={[styles.innerGroupView, styles.innerGroupViewDetail]}>
                          <ChatName style={styles} name={data.name} />
                          <ChatDescription style={styles} desc = {data.desc}/>
                      </View>

                      {this.detailBar(data)}  
                    </View>
                </TouchableOpacity>
	 	)
	 }
}