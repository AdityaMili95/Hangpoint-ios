import React, { Component } from 'react';
import {  Text, View, StyleSheet, Image,TextInput, NativeModules,TouchableOpacity, ScrollView, Button } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'; // 4.6.0
import styles from '../Styles/SearchChat';
import navStyle from '../Styles/Navigator';
import stylesCreate from '../Styles/CreateChat';
import ChatPicture from '../Component/ChatRoom/ChatPicture';
import ChatName from '../Component/ChatRoom/ChatName';
import ChatDescription from '../Component/ChatRoom/ChatDescription';
import ChatDate from '../Component/ChatRoom/ChatDate';

import * as chatHelper from '../Helper/ChatHelper.js';
import * as selectImage from '../Helper/SelectImage.js';

var RoomHandler = NativeModules.HPChatRoomHandler;

export default class CreateChat extends Component {
  
  static navigationOptions = ({navigation}) => {
      return navigation.state.params;
  }

  constructor(props) {
    super(props);

    var navigate = this.props.navigation;
    var user = navigate.getParam('user');
    var title = navigate.getParam('title');

    var tempName = navigate.getParam('chatName');
    var tempPass = navigate.getParam('password');
    var tempPic = navigate.getParam('imagePic');

    var isUpdate = navigate.getParam('isUpdate');

    var chatName = "";
    var password = "";
    var imagePic = "";

    if (tempName){
      chatName = tempName;
    }

    if (tempPass){
      password = tempPass;
    }

    if(tempPic){
      imagePic = tempPic;
    }

     this.state = {
       "chatName" : chatName,
       "password" : password,
       "imagePic" : imagePic,
       "beforePic": imagePic,
       "beforeName": chatName,
       "beforePassword": password,
       "user" : user,
        "title":title,
        "isUpdate":isUpdate,
        "chatKey": navigate.getParam('key')
     }

     this.changeChatName = this.changeChatName.bind(this);
     this.changePassword = this.changePassword.bind(this);
     this.selectImage = this.selectImage.bind(this);
     this.createChat = this.createChat.bind(this);
     this.editChat = this.editChat.bind(this);
     this.onCreated = this.onCreated.bind(this);

     this.isFirst = true;

     if(isUpdate){
        this.setTitleHeader("Edit Chat");
     }else{
        this.setTitleHeader("New Chat");
     }
  }

  setTitleHeader = (title) => {

    const {setParams} = this.props.navigation;
    setParams( {
        title: "",
        headerTitle: <Text style={navStyle.StackReverseTextStyle}>{ title }</Text>,
        headerTitleStyle: navStyle.StackReverseTextStyle,
        headerStyle: navStyle.StackReverseStyle,
        headerBackTitleStyle: navStyle.StackTintStyle,
        headerBackStyle: navStyle.StackTintStyle,
        headerTintColor:'#fff',
      });
    
  }

selectImage(){
    selectImage.selectImage((displaySource)=>{
        this.setState({
            imagePic: displaySource,
        });
    });
  }

  createChat(){
    var state = this.state;

    if (state.chatName == ""){
        RoomHandler.ShowErrorJoin("Oops", "All field must be filled", function(){});
        return;
    }

    var chatName = state.chatName;
    var password = state.password;
    var image = state.imagePic;

    if (image == ""){
        image = "https://firebasestorage.googleapis.com/v0/b/hangpoint-4cdd3.appspot.com/o/AM__1530719702_69813.jpg?alt=media&token=0c997897-f8a9-40a4-9135-5c76bcede694";
    }

    chatHelper.newChat(state.user, chatName, image, password, this.onCreated);
  }

  editChat(){
      var state = this.state;

    if (state.chatName == ""){
        RoomHandler.ShowErrorJoin("Oops", "All field must be filled", function(){});
        return;
    }

    var obj = this;

    RoomHandler.ConstructEditChatMessage(state.chatName,state.beforeName, state.imagePic, state.beforePic, state.password, state.beforePassword,state.user.uid,  function(opt, chatIdOpt, optNewUserInfo){
      optNewUserInfo["date"] = new Date().getTime();
      chatHelper.EditChat({"key": state.chatKey,  "opt": opt, "chatIdOpt": chatIdOpt, "chatData":optNewUserInfo, "callback": obj.onEdited});
    });

  }

  onEdited = ()=>{
    var navigate = this.props.navigation;
    navigate.goBack();
  }

  onCreated(){
    var navigate = this.props.navigation;
    navigate.state.params.callback();
    navigate.goBack();
  }

  changeChatName(text){
      this.setState({
        chatName: text
      });
  }

  changePassword(text){
      this.setState({
        password: text
      });
  }

  getTextInput= () => {
    var state = this.state;

    if ( !state.isUpdate || ! !state.isFirst){
        return {
           name: <TextInput maxLength={20} style={styles.newChatInputItemInput} placeholder="Chat Name" onChangeText={(text)=>this.changeChatName(text)}></TextInput>,
           password: <TextInput style={styles.newChatInputItemInput} placeholder="Password (Optional)" onChangeText={(text)=>this.changePassword(text)}></TextInput>
        }
    }

    this.isFirst = false;

    return {
           name: <TextInput value = {state.chatName} maxLength={20} style={styles.newChatInputItemInput} placeholder="Chat Name" onChangeText={(text)=>this.changeChatName(text)}></TextInput>,
           password: <TextInput value = {state.password} style={styles.newChatInputItemInput} placeholder="Password (Optional)" onChangeText={(text)=>this.changePassword(text)}></TextInput>
    }     
  }

  getSumbitButton = () =>{
       if (this.state.isUpdate){
          return (
                  <TouchableOpacity style={[styles.buttonCreate]} onPress ={()=>this.editChat()} >
                      <Text style={[{fontSize:12,textAlign:'center',color:"#fff"}]}>Edit</Text>;
                  </TouchableOpacity>
          );
       }

       return (<TouchableOpacity style={[styles.buttonCreate]} onPress ={()=>this.createChat()} > 
                  <Text style={[{fontSize:12,textAlign:'center',color:"#fff"}]}>Create</Text>;;
              </TouchableOpacity>
              );
  }

   render() {
       let { navigate } = this.props.navigation;

        var state = this.state;
        var chatName = (state.chatName == "")?"Chat Name":state.chatName;
        var chatDetail = (state.password == "")?" Public chat room":" Private chat room";

        var textInput = this.getTextInput();

        return (
          <View style={styles.container}>
              <View style={styles.newChatHeader}>
                  <Text style={[{color:"#fff", fontSize:55, backgroundColor:'rgba(0,0,0,0)',alignSelf:'flex-start', marginLeft:20}]}>{state.title}</Text>
              </View>

              <View style={[styles.group,styles.myData, {marginTop:8}]}>
                    
                      <TouchableOpacity onPress ={()=>this.selectImage()} style={[styles.innerGroupView, styles.innerGroupViewImage]}>
                            <ChatPicture style={stylesCreate} src={ state.imagePic} />
                            <Ionicon name="md-create" type="ionicon" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:18,color:'#fff', position: 'absolute'}}></Ionicon>
                      </TouchableOpacity>

                      <View  style={[styles.innerGroupView, styles.innerGroupViewDetail]}>
                          <ChatName style={styles} name = {chatName} />

                          <ChatDescription style={styles} desc = {chatDetail}/>
                      </View>

                      <View  style={[styles.innerGroupView, styles.innerGroupViewNotif]}>
                          <ChatDate style={styles} date = "00:00 AM" />
                      </View>  
              </View>


              <View style={styles.inputArea}>

                  <View style={styles.newChatInputHolder}>
                      <View style={[styles.newChatInputItem, styles.newChatInputItemLabelHolder]}>
                        <Text style={styles.newChatInputItemLabel}>Chat Name : </Text>
                      </View>
                      <View style={[styles.newChatInputItem, styles.newChatInputItemInputHolder]}>
                        {textInput.name}
                      </View>
                  </View>

                   <View style={styles.newChatInputHolder}>
                      <View style={[styles.newChatInputItem, styles.newChatInputItemLabelHolder]}>
                        <Text style={styles.newChatInputItemLabel}>Password : </Text>
                      </View>
                      <View style={[styles.newChatInputItem, styles.newChatInputItemInputHolder]}>
                          { textInput.password }
                      </View>
                  </View>
              </View>

              { this.getSumbitButton() }

          </View>
        );
   }
}