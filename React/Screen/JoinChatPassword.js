import React, { Component } from 'react';
import {  Text, View, StyleSheet, Image,TextInput,TouchableOpacity, ScrollView, Button } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'; // 4.6.0
import styles from '../Styles/SearchChat';
import ChatPicture from '../Component/ChatRoom/ChatPicture';
import ChatName from '../Component/ChatRoom/ChatName';
import ChatDescription from '../Component/ChatRoom/ChatDescription';
import ChatDate from '../Component/ChatRoom/ChatDate';

export default class JoinChatPassword extends Component {

  constructor(props) {
    super(props);

    this.currentPasswordText = "";
    this.InputPassword = this.InputPassword.bind(this);
    this.assignText = this.assignText.bind(this);
  }

  InputPassword(){
     var navigate = this.props.navigation;
    var key = navigate.getParam('key');
    navigate.state.params.callback(key, this.currentPasswordText);
      this.props.navigation.goBack();
  }

  assignText(text){
    this.currentPasswordText = text;
  }

   render() {
       var navigate = this.props.navigation;
       var data = navigate.getParam('data');

        var state = this.state;

        return (
          <View style={styles.container}>
              <View style={styles.newChatHeader}>
                  <Text style={[{color:"#fff", fontSize:55, backgroundColor:'rgba(0,0,0,0)',alignSelf:'flex-start', marginLeft:20}]}>Join</Text>
              </View>

              <View style={[styles.group,styles.myData, {marginTop:8}]}>
                    
                      <ChatPicture style={styles} src={data.image} />

                      <View  style={[styles.innerGroupView, styles.innerGroupViewDetail]}>

                          <ChatName style={styles} name = {data.name} />

                          <ChatDescription style={styles} desc = {data.desc}/>
                      </View>

                      <View  style={[styles.innerGroupView, styles.innerGroupViewNotif]}>
                          <ChatDate style={styles} date ={data.date} />
                      </View>  
              </View>


              <View style={styles.inputArea}>

                  <View style={styles.newChatInputHolder}>
                      <View style={[styles.newChatInputItem, styles.newChatInputItemLabelHolder]}>
                        <Text style={styles.newChatInputItemLabel}>Password : </Text>
                      </View>
                      <View style={[styles.newChatInputItem, styles.newChatInputItemInputHolder]}>
                        <TextInput style={styles.newChatInputItemInput} onChangeText={(text)=> this.assignText(text)} placeholder="Password"></TextInput>
                      </View>
                  </View>
              </View>

              <TouchableOpacity style={[styles.buttonCreate]} onPress={()=> this.InputPassword()}>
                  <Text style={[{fontSize:12,textAlign:'center',color:"#fff"}]}>Join</Text>
              </TouchableOpacity>

          </View>
        );
   }
}