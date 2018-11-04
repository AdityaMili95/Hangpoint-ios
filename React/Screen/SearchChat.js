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
  static navigationOptions = ({navigation}) => {
      return navigation.state.params;
  }

  constructor(props) {
    super(props);

    var user = props.navigation.getParam('user');
    this.state ={
      searchText:"",
      isloading:true,
      data: {},
      user: user,
      placeholder: props.navigation.getParam('placeholder'),
      chatKey: props.navigation.getParam('key'),
      isFindUser: props.navigation.getParam('isFindUser')
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
    this.setTitleHeader(props.navigation.getParam('title'));

  }

   setTitleHeader = (title) => {

    const {setParams} = this.props.navigation;

    setParams( {
        title: "",
        headerTitle: <Text style={styles.StackReverseTextStyle}>{title}</Text>,
        headerTitleStyle: styles.StackReverseTextStyle,
        headerStyle: styles.StackReverseStyle,
        headerBackTitleStyle: styles.StackTintStyle,
        headerBackStyle: styles.StackTintStyle,
        headerTintColor:'#fff',
      }); 
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

  inviteChat = (userKey, data) =>{
      var obj = this;
      var chatKey = this.state.chatKey;

      RoomHandler.ConstructInvitePeople(this.state.user.uid ,userKey, this.state.chatKey, function(peopleOpt, newChatOpt, optInviteUserInfo){
          optInviteUserInfo['date'] = new Date().getTime();

          chatHelper.InsertMember({
              "uid": userKey,
              "key": chatKey,
              "peopleOpt": peopleOpt,
              "newChatOpt": newChatOpt,
              "chatData": optInviteUserInfo,
              "callback": obj.Back
          });
      });
  }

  onErrorJoinCallback(){
    RoomHandler.ShowErrorJoin("Join Chat Failed", "Try again later" ,()=>{});
  }

  onErrorPasswordJoinCallback(){
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

    if (this.state.isFindUser){
      fireHelper.ValueEvent("/users", this.allUserList, text);  
      return;
    }
    fireHelper.ValueEvent("/chatIdList", this.allChatList, text);
  }

  FetchAllChatDataToArray = (snapshot)=>{
    var data = [];

    if (!snapshot){
      return data;
    }

    for (key in Object.keys(snapshot)){
      currKey = Object.keys(snapshot)[key];
      snapshot[currKey]["id"] = currKey;

      if (snapshot[currKey]["data"] && snapshot[currKey]["data"]["lastloggedin"]){
        var lastActive=this.formatDate(snapshot[currKey]["data"]["lastloggedin"]);
        lastActive="Last logged in at "+lastActive;
        snapshot[currKey]["data"]["desc"] = lastActive;
      }

      data.push(snapshot[currKey]);
    }

    return data;
  }

getDateString = (date) => {
   var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}


formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var timeString = hours + ':' + minutes + ' ' + ampm;
  return timeString;
}

formatDate = (date) => {
    date=new Date(date);
    var now=new Date();

    if(date.getDate()==now.getDate()&&date.getMonth()==now.getMonth()&&date.getFullYear()==now.getFullYear()){
      return this.formatAMPM(date);
    }
    return this.getDateString(date);
}


  allUserList = (snapshot, text) => {
    fireHelper.DetachEvent("/users");
    snapshot = this.FetchAllChatDataToArray(snapshot);
    RoomHandler.GetSearchUserData(snapshot, text, this.state.user.uid, this.state.chatKey, (data)=>{
        this.setState({
            isloading: false,
            data:data,
        });
    });
  }

  allChatList(snapshot, text){
    fireHelper.DetachEvent("/chatIdList");
    snapshot = this.FetchAllChatDataToArray(snapshot);
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
          return <ChatItem data={data[key]}  chatKey={key} key={key} inviteChat = {this.inviteChat} joinChat = {this.joinChatData} isFindUser = {this.state.isFindUser}/>
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
    var state= this.state;
    let { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.searchChatTopContainer}>
        <View style={styles.searchChat}>
            <View style={[styles.innerInputText, styles.innerChatInput]}>

                    <View style={[styles.innerInputText, styles.chatInputHolder]}><TextInput style={styles.chatInput} placeholderTextColor = "black" onChangeText={(text)=> this.assignText(text)} placeholder={state.placeholder}/></View>

                    <TouchableOpacity style={(styles.innerInputText, styles.stickerButtonHolder)} onPress={()=> this.searchText()}>
                      <View style={styles.sendButton}>
                          <Ionicon name="ios-search" type="ionicon" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:18,color:'#fff'}}></Ionicon>
                      </View>
                    </TouchableOpacity>
            </View>
        </View>

        {(!state.isFindUser) && 
        <TouchableOpacity style={(styles.CreateChatButton)} onPress={() => navigate('CreateChat', {"title": "Create", "user": this.state.user, "callback": this.Back, "isUpdate": false } )}>
                  <Text style={[styles.buttonText]}>Create Chat</Text>
          </TouchableOpacity>
        }
        </View>
          {this.ChatDataRender()}
      </View>
    );
  }
}