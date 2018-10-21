import React, { Component } from 'react';
import {  Text, View, StyleSheet, Image,TextInput, NativeModules,TouchableOpacity, ScrollView, Button } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'; // 4.6.0
import styles from '../Styles/SearchChat';
import stylesCreate from '../Styles/CreateChat';
import ChatPicture from '../Component/ChatRoom/ChatPicture';
import ChatName from '../Component/ChatRoom/ChatName';
import ChatDescription from '../Component/ChatRoom/ChatDescription';
import ChatDate from '../Component/ChatRoom/ChatDate';
import ImagePicker from "react-native-image-picker";
import * as chatHelper from '../Helper/ChatHelper.js';


const options = {
          title: 'Select Image',
          //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
      };
export default class CreateChat extends Component {

  constructor(props) {
    super(props);

    var navigate = this.props.navigation;
    var user = navigate.getParam('user');

     this.state = {
       "chatName" : "",
       "password" : "",
       "imagePic" : "",
       "user" : user
     }

     this.changeChatName = this.changeChatName.bind(this);
     this.changePassword = this.changePassword.bind(this);
     this.selectImage = this.selectImage.bind(this);
     this.createChat = this.createChat.bind(this);
     this.onCreated = this.onCreated.bind(this);
  }


  selectImage(){

    ImagePicker.showImagePicker(options, (response) => {

        if (response.didCancel) {
            
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          
        } else {
          const source = response.uri;
          const displaySource = 'data:image/jpeg;base64,' + response.data;

          this.setState({
            imagePic: displaySource,
          });
        }
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

   render() {
       let { navigate } = this.props.navigation;

        var state = this.state;
        var chatName = (state.chatName == "")?"Chat Name":state.chatName;
        var chatDetail = (state.password == "")?" Public chat room":" Private chat room";

        return (
          <View style={styles.container}>
              <View style={styles.newChatHeader}>
                  <Text style={[{color:"#fff", fontSize:55, backgroundColor:'rgba(0,0,0,0)',alignSelf:'flex-start', marginLeft:20}]}>Create</Text>
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
                        <TextInput maxLength={20} style={styles.newChatInputItemInput} placeholder="Chat Name" onChangeText={(text)=>this.changeChatName(text)}></TextInput>
                      </View>
                  </View>

                   <View style={styles.newChatInputHolder}>
                      <View style={[styles.newChatInputItem, styles.newChatInputItemLabelHolder]}>
                        <Text style={styles.newChatInputItemLabel}>Password : </Text>
                      </View>
                      <View style={[styles.newChatInputItem, styles.newChatInputItemInputHolder]}>
                        <TextInput style={styles.newChatInputItemInput} placeholder="Password (Optional)" onChangeText={(text)=>this.changePassword(text)}></TextInput>
                      </View>
                  </View>
              </View>

              <TouchableOpacity style={[styles.buttonCreate]} onPress ={()=>this.createChat()} >
                  <Text style={[{fontSize:12,textAlign:'center',color:"#fff"}]}>Create</Text>
              </TouchableOpacity>

          </View>
        );
   }
}