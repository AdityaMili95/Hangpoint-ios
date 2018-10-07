import React, { Component } from 'react';
import {  Text, View, StyleSheet, Image,TextInput,TouchableOpacity, ScrollView, Button } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'; // 4.6.0
import styles from '../Styles/SearchChat';
import stylesCreate from '../Styles/CreateChat';
import ChatPicture from '../Component/ChatRoom/ChatPicture';
import ChatName from '../Component/ChatRoom/ChatName';
import ChatDescription from '../Component/ChatRoom/ChatDescription';
import ChatDate from '../Component/ChatRoom/ChatDate';
import ImagePicker from "react-native-image-picker";

const options = {
          title: 'Select Avatar',
          customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
      };
export default class CreateChat extends Component {

  constructor(props) {
    super(props);
     this.state = {
       "chatName":"",
       "password":"",
       imagePic: ""
     }

     this.changeChatName = this.changeChatName.bind(this);
     this.changePassword = this.changePassword.bind(this);
     this.selectImage = this.selectImage.bind(this);
  }


  selectImage(){

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({
            imagePic: source,
          });
        }
    });
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
                            <ChatPicture style={stylesCreate} src={state.imagePic} />
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

              <TouchableOpacity style={[styles.buttonCreate]}>
                  <Text style={[{fontSize:12,textAlign:'center',color:"#fff"}]}>Create</Text>
              </TouchableOpacity>

          </View>
        );
   }
}