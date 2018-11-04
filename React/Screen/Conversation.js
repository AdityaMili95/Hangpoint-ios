import React, { Component } from 'react';
import { Text, View, Image,TextInput,TouchableOpacity, ScrollView,KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import ChatOption from '../Component/Conversation/ChatOption'
import styles from '../Styles/Conversation';
import navStyle from '../Styles/Navigator';

export default class Conversation extends Component {

  static navigationOptions = ({navigation}) => {
      return navigation.state.params;
  }

  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);

     this.state = {
       showSticker:false,
       currentStickers:0,
       stickers:[
            {
              icon:"http://i19.photobucket.com/albums/b155/akikoprism87/oie_transparent-5.png",
              stickers:[
                  "http://i19.photobucket.com/albums/b155/akikoprism87/oie_transparent-5.png",
                  "https://s-media-cache-ak0.pinimg.com/originals/f4/22/55/f4225579734f0c56759461519debe657.png",
                  "http://3.bp.blogspot.com/-nHQV9TT6dv0/UZgmwV8ih5I/AAAAAAAABoE/YLOG0nNwWHs/s1600/p19.png",
                  "http://vignette2.wikia.nocookie.net/line/images/0/00/Moon-blow-kiss.png/revision/latest?cb=20151211000627",
                  "https://s-media-cache-ak0.pinimg.com/originals/cf/96/56/cf9656132aab2c0434c117b1ecaa6273.png",
                  "https://stickershop.line-scdn.net/products/0/0/100/1/android/stickers/117.png",
                  "http://4.bp.blogspot.com/-0ExJC7NNynQ/U5a2pyUYxiI/AAAAAAAADe0/qRbfxusKGes/s1600/2009.png",
                  "http://dl.stickershop.line.naver.jp/products/0/0/1/546/android/stickers/2996.png"
              ]
            },
            {
              icon:"http://4.bp.blogspot.com/-m7hVZqzBWn4/U6eMCDXhI4I/AAAAAAAAFNM/LC14deGICnQ/s1600/brown_cony_006_o.png",
              stickers:[
                "http://3.bp.blogspot.com/-eoidD1nXr8w/U6eMGkN2KJI/AAAAAAAAFPg/3ITtBLfT76E/s1600/brown_cony_001_o.png",
                "http://3.bp.blogspot.com/-i-4YmuGJclM/U6eMBJxHMII/AAAAAAAAFM4/6vu691GKMW8/s1600/brown_cony_005_o.png",
                "http://3.bp.blogspot.com/-iy9dzp5xy68/U6eMEIgpqBI/AAAAAAAAFN0/mcBu-ReiFgU/s1600/brown_cony_008_o.png",
                "http://lineofficial.blogimg.jp/en/imgs/c/d/cda97fbe.png",
                "http://pic.pimg.tw/imshihching/1372179938-1031104213.png",
                "https://s-media-cache-ak0.pinimg.com/originals/80/40/91/804091efeaad212349b1b9fb46ca7c6b.png",
                "https://rumorscity.com/wp-content/uploads/line-sticker/0/0/3/1696/main.png",
                "http://cfile7.uf.tistory.com/image/220A32445656603D0DF8A4"
              ]
            },
            {
              icon:"http://3.bp.blogspot.com/-kiSWp5z_ask/U6eMhTwbHII/AAAAAAAAFTM/YNOPzRB3czg/s1600/moon_james_074_o.png",
              stickers:[
                  "http://2.bp.blogspot.com/-5YUffhnidvc/U6eMiSVRXcI/AAAAAAAAFTg/t5-Gbrvb1iA/s1600/moon_james_075_o.png",
                  "http://cfile29.uf.tistory.com/image/262DF839569357F30930E0",
                  "http://4.bp.blogspot.com/-CBkA-9fQC4A/U32XS0obrvI/AAAAAAAAA94/CPtO098uPQw/s1600/131.png",
                  "http://www.line-stickers.com/wp-content/uploads/2015/10/James-Special-Edition-.png",
                  "http://1.bp.blogspot.com/-xrHVpaI6ZHY/UdGlPsBspKI/AAAAAAAAAgE/FSPHCLu8vuI/s1600/james4.png",
                  "http://2.bp.blogspot.com/-8loz517p7YM/Ue-sVhGEpmI/AAAAAAAAAXk/NDQKRtsqKAY/s1600/9915.png",
                  "http://3.bp.blogspot.com/-Gb8JcFPN7To/UZgm7ARxUTI/AAAAAAAABqo/__46_1UrrOg/s1600/p38.png",
                  "http://1.bp.blogspot.com/--AxMi6hIKZU/U6eL9glTKcI/AAAAAAAAFLw/m5BY7Ydhrns/s1600/moon_james_046_o.png",
              ]
            },
            {
              icon:"https://sdl-stickershop.line.naver.jp/products/0/0/14/789/android/stickers/10884.png;compress=true",
              stickers:[
                "https://sdl-stickershop.line.naver.jp/products/0/0/14/789/android/stickers/10857.png;compress=true",
                "https://sdl-stickershop.line.naver.jp/products/0/0/14/789/android/stickers/10894.png;compress=true",
                "https://sdl-stickershop.line.naver.jp/products/0/0/14/789/android/stickers/10858.png;compress=true",
                "https://s-media-cache-ak0.pinimg.com/originals/89/ba/c7/89bac714fea49feb8f904fbd4a77df72.jpg",
                "https://sdl-stickershop.line.naver.jp/products/0/0/14/789/android/stickers/10869.png;compress=true",
                "https://sdl-stickershop.line.naver.jp/products/0/0/14/789/android/stickers/10864.png;compress=true",
                "https://sdl-stickershop.line.naver.jp/products/0/0/14/789/android/stickers/10893.png;compress=true",
                "https://sdl-stickershop.line.naver.jp/products/0/0/14/789/android/stickers/10856.png;compress=true",
              ]
            },
            {
              icon:"https://f.ptcdn.info/874/034/000/1440690816-7-o.png",
              stickers:[
                "http://1.bp.blogspot.com/-5D_1d1zcH8c/VEC58snyxuI/AAAAAAAAAiY/TKBFdOF9_D4/s1600/15.png",
                "http://image.dek-d.com/26/3204206/112847826",
                "https://stickershop.line-scdn.net/products/0/0/100/3/android/stickers/197.png",
                "http://upic.me/i/lo/8h195.png",
                "https://s-media-cache-ak0.pinimg.com/originals/1f/55/49/1f55493cd08da886cb084f0a6ec060f1.png",
                "http://pic.pimg.tw/walkerlin0251/1381743403-225760897.png",
                "http://image.dek-d.com/26/3204206/113088001",
                "http://4.bp.blogspot.com/-Q5zCcPzL3BI/U5a2ZlxJCwI/AAAAAAAADZ0/vPNbOgv6AiE/s1600/2124.png"
              ]
            }
       ],
       user:{
         pp:'http://adityamili.com/hangpoint/laptop.png',
         name:"INI NAMA",
         email:"aditya@gmail.com"
       },
       chats:{
         1:{
          pp:"",
          chatName:"INI CHAT PERTAMA",
          chats:{
            1:{
              text:"hahahahaha"
            }
          }
         }
       }
     }

     this.selectSticker = this.selectSticker.bind(this);
     this.sendSticker = this.sendSticker.bind(this);

     var data = props.navigation.state.params.data;

     var title = "HangPoint"

     if (data){
       title= data.name;
     }

     this.setTitleHeader(title);
  }

  setTitleHeader = (title) => {

    const {setParams} = this.props.navigation;
    setParams( {
          headerVisible: false,
          headerMode: 'screen',
          title: "",
          headerTitleStyle: navStyle.StackTextStyle,
          headerStyle: navStyle.StackStyle,
          headerTitle: <Text style={navStyle.StackTextStyle}>{title}</Text>,
          headerBackTitleStyle: navStyle.StackTintStyle,
          headerBackStyle: navStyle.StackTintStyle,
      });
    
  }

  editChat = (key) => {
    var navigate = this.props.navigation;
    var data = navigate.state.params.data;
    navigate.navigate('CreateChat', {"key": key, "title": "Edit", "user": navigate.state.params.user, "callback": this.tempBack, "isUpdate": true, "chatName": data.origName, "password": data.password, "imagePic": data.image });
  }

  findUser = (key) => {
    var navigate = this.props.navigation;
    var data = navigate.state.params.data;
    navigate.navigate('FindChat', {"user": navigate.state.params.user, "title": "Invite User","placeholder":"Search Username", "isFindUser": true, "key": key});
  }

  tempBack = () => {
      
  }

  toggleSticker(){
    var showSticker = this.state.showSticker;
    this.setState({
      showSticker:!showSticker
    });
  }

  selectSticker(index){
    var state = this.state;
    if (state.currentStickers == index){
      return
    }
    this.setState({
      currentStickers :index
    });
  }

  sendSticker(image){
    this.toggleSticker();
  }

  goBack(){
    var navigate = this.props.navigation;
    navigate.goBack();
  }
  render() {

    var state = this.state;
    var navigate = this.props.navigation;

    return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        <View style={styles.scrollChatContainer}>
          
          <View style={styles.chatBackgroundImageHolder}></View>

          <ScrollView style={styles.scrollChat}>

              <View style={styles.chatContainer}>

                  <View style={[styles.innerChat,styles.chatPP]}>

                      <View style={[styles.chatPPImage]}>
                          <Image
                                  //source={}
                                  style={styles.groupImage}
                          />
                      </View>

                      <View style={styles.chatTimeContainer}>
                          <Text style={[styles.chatBody,styles.chatTime]}>1.20 PM</Text>
                      </View>
                  </View>
                  
                <View style={[styles.innerChat, styles.chatInfoHolder]}>

                  <View style={[styles.chatName]}>
                     <Text style={[styles.nameText]}>
                          Aditya Mili
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatArrow]}>
                      <View style={[styles.triangle]}></View>
                  </View>

                  <View style={[styles.innerChat,styles.chatText]}>
                      <Text style={[styles.chatBody]}>
                          Ksdkmfksdmfklsmgklmdklfgmdklfmgkldfklgmdfklmhkldmhklmkflmhklgfmhmlgfmhklfgmhmfghmklfgmhklmfghmfhbrfhbrhgbdhg
                      </Text>
                  </View>

                   <View style={[styles.chatName, styles.readInfo]}>
                     <Text style={[styles.nameText]}>
                          Read By 1
                      </Text>
                  </View>

                </View>


              </View>



              <View style={styles.chatContainer}>

                  <View style={[styles.innerChat,styles.chatPP]}>

                      <View style={[styles.chatPPImage]}>
                          <Image
                                  //source={}
                                  style={styles.groupImage}
                          />
                      </View>

                      <View style={styles.chatTimeContainer}>
                          <Text style={[styles.chatBody,styles.chatTime]}>1.20 PM</Text>
                      </View>
                  </View>
                  
                <View style={[styles.innerChat, styles.chatInfoHolder]}>

                  <View style={[styles.chatName]}>
                     <Text style={[styles.nameText]}>
                          Aditya Mili
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatArrow]}>
                      <View style={[styles.triangle]}></View>
                  </View>

                  <View style={[styles.innerChat,styles.chatText]}>
                      <Text style={[styles.chatBody]}>
                          Ksdkmfksdmfklsmgklmdklfgmdklfmgkldfklgmdfklmhkldmhklmkflmhklgfmhmlgfmhklfgmhmfghmklfgmhklmfghmfhbrfhbrhgbdhg
                      </Text>
                  </View>

                   <View style={[styles.chatName, styles.readInfo]}>
                     <Text style={[styles.nameText]}>
                          Read By 1
                      </Text>
                  </View>

                </View>


              </View>


              <View style={styles.chatContainer}>

                  <View style={[styles.innerChat,styles.chatPP]}>

                      <View style={[styles.chatPPImage]}>
                          <Image
                                  //source={}
                                  style={styles.groupImage}
                          />
                      </View>

                      <View style={styles.chatTimeContainer}>
                          <Text style={[styles.chatBody,styles.chatTime]}>1.20 PM</Text>
                      </View>
                  </View>
                  
                <View style={[styles.innerChat, styles.chatInfoHolder]}>

                  <View style={[styles.chatName]}>
                     <Text style={[styles.nameText]}>
                          Aditya Mili
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatArrow]}>
                      <View style={[styles.triangle]}></View>
                  </View>

                  <View style={[styles.innerChat,styles.chatText]}>
                      <Text style={[styles.chatBody]}>
                          K
                      </Text>
                  </View>

                   <View style={[styles.chatName, styles.readInfo]}>
                     <Text style={[styles.nameText]}>
                          Read By 1
                      </Text>
                  </View>

                </View>


              </View>

              

           <View style={styles.chatContainer, styles.myChat}>

                  
                <View style={[styles.innerChat, styles.chatInfoHolder, styles.myChat,styles.myChatInfoHolder]}>

                  <View style={[styles.chatName, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Aditya Mili
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatText, styles.myInner]}>
                      <Text style={[styles.chatBody]}>
                          K
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatArrow, styles.myArrow]}>
                      <View style={[styles.triangle, styles.myTriangle]}></View>
                  </View>

                   <View style={[styles.chatName, styles.readInfo, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Read By 1
                      </Text>
                  </View>

                </View>

                <View style={[styles.innerChat,styles.chatPP]}>

                      <View style={[styles.chatPPImage]}>
                          <Image
                                  //source={}
                                  style={styles.groupImage}
                          />
                      </View>

                      <View style={styles.chatTimeContainer}>
                          <Text style={[styles.chatBody,styles.chatTime]}>1.20 PM</Text>
                      </View>
                  </View>


              </View>


  <View style={styles.chatContainer, styles.myChat}>

                  
                <View style={[styles.innerChat, styles.chatInfoHolder, styles.myChat,styles.myChatInfoHolder]}>

                  <View style={[styles.chatName, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Aditya Mili
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatText, styles.myInner]}>
                      <Text style={[styles.chatBody]}>
                          evy kok telor amat si
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatArrow, styles.myArrow]}>
                      <View style={[styles.triangle, styles.myTriangle]}></View>
                  </View>

                   <View style={[styles.chatName, styles.readInfo, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Read By 1
                      </Text>
                  </View>

                </View>

                <View style={[styles.innerChat,styles.chatPP]}>

                      <View style={[styles.chatPPImage]}>
                          <Image
                                  //source={}
                                  style={styles.groupImage}
                          />
                      </View>

                      <View style={styles.chatTimeContainer}>
                          <Text style={[styles.chatBody,styles.chatTime]}>1.20 PM</Text>
                      </View>
                  </View>


              </View>



  <View style={styles.chatContainer, styles.myChat}>

                  
                <View style={[styles.innerChat, styles.chatInfoHolder, styles.myChat,styles.myChatInfoHolder]}>

                  <View style={[styles.chatName, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Aditya Mili
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatText, styles.myInner]}>
                      <Text style={[styles.chatBody]}>
                          K
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatArrow, styles.myArrow]}>
                      <View style={[styles.triangle, styles.myTriangle]}></View>
                  </View>

                   <View style={[styles.chatName, styles.readInfo, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Read By 1
                      </Text>
                  </View>

                </View>

                <View style={[styles.innerChat,styles.chatPP]}>

                      <View style={[styles.chatPPImage]}>
                          <Image
                                  //source={}
                                  style={styles.groupImage}
                          />
                      </View>

                      <View style={styles.chatTimeContainer}>
                          <Text style={[styles.chatBody,styles.chatTime]}>1.20 PM</Text>
                      </View>
                  </View>


              </View>





              
            <View style={styles.eventNotif}>
                <View style={styles.eventNotifTop}>
                    <Text style={[styles.eventText]}>1.20 PM</Text>
                </View>

                <View style={styles.eventNotifBottom}>
                    <Text style={[styles.eventText]}>Aditya MIli change group name to HAHAHAHHAHAHAHAHHAHAHArljgnjdrngjkdfngjkdbnjgkndfjkgbjfbjkfgbhj</Text>
                </View>    
            </View>



            <View style={styles.dayBar}>
              <Text style={[styles.eventText]}>16 July 2018</Text>
            </View>


            <View style={styles.chatContainer, styles.myChat}>

                  
                <View style={[styles.innerChat, styles.chatInfoHolder, styles.myChat,styles.myChatInfoHolder]}>

                  <View style={[styles.chatName, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Aditya Mili
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatText, styles.myInner]}>
                      <Text style={[styles.chatBody]}>
                          K
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatArrow, styles.myArrow]}>
                      <View style={[styles.triangle, styles.myTriangle]}></View>
                  </View>

                   <View style={[styles.chatName, styles.readInfo, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Read By 1
                      </Text>
                  </View>

                </View>

                <View style={[styles.innerChat,styles.chatPP]}>

                      <View style={[styles.chatPPImage]}>
                          <Image
                                  //source={}
                                  style={styles.groupImage}
                          />
                      </View>

                      <View style={styles.chatTimeContainer}>
                          <Text style={[styles.chatBody,styles.chatTime]}>1.20 PM</Text>
                      </View>
                  </View>


              </View>

              <View style={styles.chatContainer, styles.myChat}>

                  
                <View style={[styles.innerChat, styles.chatInfoHolder, styles.myChat,styles.myChatInfoHolder]}>

                  <View style={[styles.chatName, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Aditya Mili
                      </Text>
                  </View>

                  <View style={[styles.innerChat,styles.chatText, styles.chatImage, styles.myInner]}>
                     <Image
                                      source={{uri: "http://i19.photobucket.com/albums/b155/akikoprism87/oie_transparent-5.png"}}
                                      style={styles.image}
                                  />
                  </View>

                   <View style={[styles.chatName, styles.readInfo, styles.myName]}>
                     <Text style={[styles.nameText]}>
                          Read By 1
                      </Text>
                  </View>

                </View>

                <View style={[styles.innerChat,styles.chatPP]}>

                      <View style={[styles.chatPPImage]}>
                          <Image
                                  //source={}
                                  style={styles.groupImage}
                          />
                      </View>

                      <View style={styles.chatTimeContainer}>
                          <Text style={[styles.chatBody,styles.chatTime]}>1.20 PM</Text>
                      </View>
                  </View>


              </View>




          </ScrollView>
        </View>

         <View style={styles.inputChat}>
            <TouchableOpacity onPress={this.toggleSticker.bind(this)}><View style={[styles.innerInputText,styles.stickerButtonHolder]}>
              <Icon name="sticker-emoji" type="material-community" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:27,color:'#fff'}}></Icon>
            </View></TouchableOpacity>
            
            <View style={[styles.innerInputText, styles.InputHolder]}>
              <View style={styles.innerChatInput}>

                <View style={[styles.innerInputText, styles.chatInputHolder]}><TextInput style={styles.chatInput} placeholder="Say Something"/></View>

                <TouchableOpacity style={styles.innerInputText,styles.stickerButtonHolder}>
                  <View style={styles.sendButton}>
                      <Ionicon name="ios-send" type="ionicon" backgroundColor="#3b5998" style={{alignSelf:'center',fontSize:15,color:'#fff'}}></Ionicon>
                  </View>
                </TouchableOpacity>
                
              </View>
            </View>
         </View>

      {this.state.showSticker &&
         <View style={styles.overlayContainer}>
            <TouchableOpacity onPress={this.toggleSticker.bind(this)} style={[styles.overlayContainer]}></TouchableOpacity>
            <View style={styles.stickerContainer}>
              <View style={styles.stickerIconHolder}>

                {
                  state.stickers.map((stick, index) =>

                        <TouchableOpacity style={state.currentStickers != index?styles.stickerIcon:[styles.stickerIcon, styles.stickerIconSelected]} onPress={() => this.selectSticker(index)}>
                              <View>
                                  <Image
                                      source={{uri: stick.icon}}
                                      style={styles.image}
                                  />
                              </View>
                        </TouchableOpacity>
                  )
                }

              </View>

              <View style={styles.stickerItemHolder}>

                  {
                    state.stickers[state.currentStickers].stickers.map((stick, index) =>
                        <TouchableOpacity style={styles.stickerItem} onPress={() => this.sendSticker(stick)}>
                              <View>
                                  <Image
                                      source={{uri: stick}}
                                      style={styles.image}
                                  />
                              </View>
                        </TouchableOpacity>
                    )
                  }

              </View>

            </View>
         </View>
      }

      <ChatOption user= {navigate.state.params.user} data={navigate.state.params.data} goBack = {this.goBack} editChat = {this.editChat} leftChat={navigate.state.params.leftChat} findUser = {this.findUser}/>
       
      </View>
    </KeyboardAvoidingView>
    );
  }
}