import React, { Component } from 'react';
import {  Text, View, StyleSheet, Image,TextInput,TouchableOpacity, ScrollView, Button, NativeModules } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'; // 4.6.0
import styles from '../Styles/SearchChat';
import * as fireHelper from '../Helper/FirebaseHelper.js';
import * as chatHelper from '../Helper/ChatHelper.js';
import ChatItem from '../Component/SearchChat/ChatItem'
import ChatPlaceholder from '../Component/ChatRoom/ChatPlaceholder'

var RoomHandler = NativeModules.HPChatRoomHandler;

export default class SearcChat extends Component {

  constructor(props) {
    super(props);

    var user = props.navigation.getParam('user');
    this.state ={
      searchText:"",
      isloading:true,
      data: {},
      user: user
    }

    this.joinChatData = this.joinChatData.bind(this);
    this.searchText = this.searchText.bind(this);
    this.allChatList = this.allChatList.bind(this);
    this.ChatDataRender = this.ChatDataRender.bind(this);
    this.ChatPlaceholder = this.ChatPlaceholder.bind(this);
    this.ChatSearchResult = this.ChatSearchResult.bind(this);
    this.passwordJoinCallback = this.passwordJoinCallback.bind(this);
    this.asyncJoinChat = this.asyncJoinChat.bind(this);
    this.onErrorJoinCallback = this.onErrorJoinCallback.bind(this);
    this.onErrorPasswordJoinCallback = this.onErrorPasswordJoinCallback.bind(this);
    this.currentSearchText = "";
    this.Back = this.Back.bind(this);

  }

  joinChatData (key, data){
    
    if (data.isPassword){
        this.props.navigation.navigate('ChatPassword', {
          "data":data,
          "key":key,
          callback: (key, password) => this.passwordJoinCallback(key, password)
        });
        return;
    }

    this.asyncJoinChat(key, "", this.onErrorJoinCallback)
  }

  onErrorJoinCallback(){
    RoomHandler.ShowErrorJoin("Join Chat Failed", "Try again later" ,()=>{});
  }

  onErrorPasswordJoinCallback(){
    return;
    RoomHandler.ShowErrorJoin("Join Chat Failed", "Password correct?" ,()=>{});
  }

  passwordJoinCallback(key, password){
    this.asyncJoinChat(key, password, this.onErrorPasswordJoinCallback)
  }

  asyncJoinChat(key, password, errorJoin){
    var user = this.state.user;
    chatHelper.joinChat(key, user, password, errorJoin , this.searchText)
  }

  assignText(text){
    this.currentSearchText = text;
  }

  Back(){
    this.props.navigation.goBack();
  }

  searchText(){
    text = this.currentSearchText;
    if (text == "") {
      this.setState({
        data: {}
      });

      return;
    }

    this.setState({
      isloading: true
    });

    fireHelper.ValueEvent("/chatIdList", this.allChatList, text);
  }

  allChatList(snapshot, text){
    fireHelper.DetachEvent("/chatIdList")
    RoomHandler.GetSearchChatData(snapshot, text, (data)=>{
        this.setState({
            isloading: false,
            data:data,
        });
    });
  }

  ChatPlaceholder(){
    return (
      <ScrollView>
        <ChatPlaceholder/>
        <ChatPlaceholder/>
        <ChatPlaceholder/>
        <ChatPlaceholder/>
      </ScrollView>
    );
  }

  ChatSearchResult(){
      var data = this.state.data;
      var keys = Object.keys(data);

      var chatList = keys.map((key,idx) => {
          return <ChatItem data={data[key]}  chatKey={key} key={key} joinChat = {this.joinChatData} />
      });

      return (
        <ScrollView>
            { chatList }
        </ScrollView>
      )      
  }

  ChatDataRender(){
    if (this.state.isloading){
        return this.ChatPlaceholder();
    }
    return this.ChatSearchResult()
  }

  render() {
    let { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.searchChatTopContainer}>
        <View style={styles.searchChat}>
            <View style={[styles.innerInputText, styles.innerChatInput]}>

                    <View style={[styles.innerInputText, styles.chatInputHolder]}><TextInput style={styles.chatInput} placeholderTextColor = "black" onChangeText={(text)=> this.assignText(text)} placeholder="Search Chat"/></View>

                    <TouchableOpacity style={(styles.innerInputText, styles.stickerButtonHolder)} onPress={()=> this.searchText()}>
                      <View style={styles.sendButton}>
                          <Ionicon name="ios-search" type="ionicon" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:18,color:'#fff'}}></Ionicon>
                      </View>
                    </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity style={(styles.CreateChatButton)} onPress={() => navigate('CreateChat', {"user": this.state.user, "callback": this.Back } )}>
                  <Text style={[styles.buttonText]}>Create Chat</Text>
          </TouchableOpacity>
        </View>
          {this.ChatDataRender()}
      </View>
    );
  }
}