import React, { Component } from 'react';
import { Text, View, Image,TextInput,TouchableOpacity, ScrollView, NativeModules, ActivityIndicator } from 'react-native';
import styles from '../Styles/ChatRoomList';
import Header from '../Component/Header';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ChatRoom from '../Component/ChatRoom/ChatRoom'
import ChatRoomListView from '../Component/ChatRoom/ChatRoomListView'
import * as fireHelper from '../Helper/FirebaseHelper.js';
import * as chatHelper from '../Helper/ChatHelper.js';
import ChatPlaceholder from '../Component/ChatRoom/ChatPlaceholder'

var loginHandler = NativeModules.HPLoginHandler;
var RoomHandler = NativeModules.HPChatRoomHandler;


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.initializeRooms = this.initializeRooms.bind(this);
    this.ToggleAccordion = this.ToggleAccordion.bind(this);
     this.AccordionArrow = this.AccordionArrow.bind(this);
     this.RenderRoom = this.RenderRoom.bind(this);
     this.RoomsDataComponent = this.RoomsDataComponent.bind(this);
     this.RenderProfile = this.RenderProfile.bind(this);
     this.ChatListCallback = this.ChatListCallback.bind(this);
     this.ChatDetailCallback = this.ChatDetailCallback.bind(this);
     this.ChatMemberList = this.ChatMemberList.bind(this);
     this.GetLastChat = this.GetLastChat.bind(this);
     this.searchText = this.searchText.bind(this);
     this.setSortOption = this.setSortOption.bind(this);
     this.randomChat = this.randomChat.bind(this);
     this.getRandomChat = this.getRandomChat.bind(this);
     this.onErrorJoinCallback = this.onErrorJoinCallback.bind(this);
     this.leftChat = this.leftChat.bind(this);
     this.toConvers = this.toConvers.bind(this);
     
    var user= this.props.screenProps.user;

    this.state ={
        section:[
            "Me", "Rooms"
        ],
        accordionCollapse:[true,true],
        roomsLoaded:false,
        chatData:{},
        random:"",
        searchText:"",
        randomChat:false,
        sortByGroup:true,
        sortedChatKey:[]
     };

      

  }

  initializeRooms(props){
    var user= props.screenProps.user;

     this.state = {
        section:[
            "Me", "Rooms"
        ],
        accordionCollapse:[true,true],
        roomsLoaded:false,
        chatData:{},
        random:"",
        searchText:"",
        randomChat:false,
        sortByGroup:true,
        sortedChatKey:[]
     };

     fireHelper.ValueEvent('users/'+user.uid+"/chat", this.ChatListCallback);
  }

  leftChat(data, callback){
      var user= this.props.screenProps.user;

      RoomHandler.ConfirmDialog("Are you sure?", "Left: "+ data.displayText, function(result){

          if (!result){
            return;
          }

          RoomHandler.GetMemberCount(data.key, function(resp){
              if(!resp){
                return;
              }

              if (resp - 1 == 0){
                  chatHelper.RemoveChat(data.key, user.uid);
                  RoomHandler.RemoveChat(data.key, function(){});

                  if(callback){
                    callback();
                  }
                  return;
              }

              RoomHandler.ConstructLeftChat(user.uid, function(obj){
                  chatHelper.LeftChat(data.key, user.uid, obj, resp);
                  RoomHandler.RemoveChat(data.key, function(){});

                  if(callback){
                    callback();
                  }
              });
              
          });
    });
  }

  toConvers(data){
    let { navigate } = this.props.navigation;
    navigate('Conversation', {'user':this.props.screenProps.user, "data": data, "leftChat": this.leftChat});
  }

  componentDidMount(){
      this.initializeRooms(this.props);
  }

  ToggleAccordion(isCollapsed,index){
    var collapsed = this.state.accordionCollapse;
    collapsed[index] = isCollapsed;

    this.setState({
      accordionCollapse:collapsed
    });

  }

  searchText(text){
    this.setState({
      searchText:text.toLowerCase()
    });
  }

  ChatListCallback(snapshot){
      
      if (snapshot == null){
        this.setState({
              chatData: [],
              roomsLoaded:true,
              random: this.makeid(),
              sortedChatKey: []
        });

        return;
      }

      RoomHandler.FetchChatList(snapshot,(data, currData)=>{

        var detach = data.detach;

        for (index in detach) {
          fireHelper.DetachEvent('chats/'+detach[index]+"/chat");
          fireHelper.DetachEvent('chats/'+detach[index]+"/detail");
          fireHelper.DetachEvent('chats/'+detach[index]+"/member");
        }

        var currKeys = Object.keys(currData);

        var keys = data.keys; 
        for (key in keys){
          if(currKeys.indexOf(keys[key])>=0){
            continue;
          }
          fireHelper.ValueEvent('chats/'+keys[key]+"/detail", this.ChatDetailCallback, keys[key]);
        }

          this.setState({
              chatData: currData
          });
      });
  }



  ChatDetailCallback(snapshot,key){
    RoomHandler.FetchChatDetail(snapshot,key, (data,key,exist)=>{
        if(!exist){
            fireHelper.ValueEvent('chats/'+key+"/member", this.ChatMemberList, key);
        }else{
            this.setState({
              chatData: data
            });
        }
    });
  }


  ChatMemberList(snapshot, key){
     RoomHandler.FetchChatMember(snapshot,key, (data,key, exist)=>{

        if(exist){
          this.setState({
              chatData: data
          });
          return
        }

        fireHelper.ValueEvent('chats/'+key+"/chat", this.GetLastChat, key);
    });
  }

  randomChat(){
    this.setState({
      randomChat:true
    });
    fireHelper.ValueOnceEventWithLimit("/chatIdList", 500, this.getRandomChat);
  }

  FetchAllChatDataToArray(snapshot){
    var data = [];

    if (!snapshot){
      return data;
    }

    for (key in Object.keys(snapshot)){
      currKey = Object.keys(snapshot)[key];
      snapshot[currKey]["id"] = currKey;
      data.push(snapshot[currKey]);
    }

    return data;
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


  GetLastChat(snapshot, key){
    var data = this.FetchAllChatDataToArray(snapshot);
    var prop = this.props.screenProps;
    var user = prop.user;

     RoomHandler.FetchChatData(data, key, user.uid,(data,key, sorted)=>{
        this.setState({
              chatData: data,
              roomsLoaded:true,
              random: this.makeid(),
              sortedChatKey: sorted
        });
     });
  }

  AccordionArrow(collapsed){
    if(collapsed){
      return <IonIcon name="ios-arrow-up" type="ionicons" style={styles.AccordionArrow}></IonIcon>
    }
    return <IonIcon name="ios-arrow-down" type="ionicons" style={styles.AccordionArrow}></IonIcon>
  }

  AccordionHeaderStyle(collapsed){
      if(collapsed){
          return [styles.AccordionHeaderContainer];
      }

      return [styles.AccordionHeaderContainer, styles.AccordionHeaderContainerNotCollapsed];
  }

  RoomPlaceholder(){
    return (
      <View>
        <ChatPlaceholder/>
        <ChatPlaceholder/>
        <ChatPlaceholder/>
        <ChatPlaceholder/>
      </View>
    );
  }

  FilterBySearch(search, data, sortedKeys){

    if(search == ""){
      return {data:data, keys:sortedKeys};
    }

    var filtered = {};
    var filterKeys = [];

    for (idx in sortedKeys){
        var key = sortedKeys[idx];
        if (data[key].displayText.toLowerCase().indexOf(search)>=0){
          filtered[key] = data[key];
          filterKeys.push(key);
        }
    }

    return {data:filtered, keys:filterKeys};


  }

  RoomsDataComponent(){
    var chatData = this.state.chatData;
    var sortedKeys = this.state.sortedChatKey;
    var filterData = this.FilterBySearch(this.state.searchText, chatData, sortedKeys);
    chatData = filterData.data;
    sortedKeys = filterData.keys;
    
    return (
        <ChatRoomListView toConvers = { this.toConvers } sortByTime={!this.state.sortByGroup} onleft = { this.leftChat } data={chatData} sortedKey={sortedKeys} key={this.makeid}/>
    );
  }

  RenderRoom(){
      if (this.state.roomsLoaded){
        return this.RoomsDataComponent();
      }

      return this.RoomPlaceholder();
  }

  RenderProfile(user){
    if (this.state.roomsLoaded){
        return <ChatRoom data={{'name':user.displayName,'image':user.photoURL, 'desc':user.email, 'date':"", isProfile:true}}/>;
    }

    return <ChatPlaceholder/>;
  }

  setSortOption(sort){
    this.setState({
      sortByGroup:sort
    });

  }

  getRandomChat(data){
      RoomHandler.GetRandomChatData(data, (selected, found) => {
        this.setState({
          randomChat:false
        });

        if(found){
          this.joinChat(selected);
        }

     });
  }

  joinChat(key){
    var prop = this.props.screenProps;
    var user = prop.user;

    chatHelper.joinChat(key, user, "", this.onErrorJoinCallback)
  }

  onErrorJoinCallback(){
    RoomHandler.ShowErrorJoin("Join Chat Failed", "Try again later" ,()=>{});
  }

  render() {

    let { navigate } = this.props.navigation;
    var prop = this.props.screenProps;
    var user = prop.user;
    var state = this.state;

    var styleButtonBorder = {
      width:1,
      backgroundColor:'gray',
      height:'60%'
    };

    var styleButtonSortAlphabet = [styles.roomOptionitem];
    var styleButtonSortTime = [styles.roomOptionitem];

    var selectedSortStyle = {backgroundColor:"rgba(255,255,255,0.9)"};

    if(state.sortByGroup){
      styleButtonSortAlphabet.push(selectedSortStyle);
    }else{
      styleButtonSortTime.push(selectedSortStyle);
    }

    return (
      <View style={styles.container}>

        <View style={styles.searchBar}>
            <TextInput style={styles.SearchInput} onChangeText={(text)=> this.searchText(text)} placeholder="Search Chat"/>
        </View>

         <View style={[styles.chatOptionContainer]}>
            <View style={[styles.chatOptionContainerInnerView]}>
               <TouchableOpacity
                  style={[styles.button]}
                  underlayColor='#fff'
                  onPress={() => navigate('FindChat', {'user':user})}
                  >
                  <Text style={styles.buttonText}>Browse Chat</Text>
                </TouchableOpacity>
            </View>

            <View style={[styleButtonBorder]}>

            </View>

            <View style={[styles.chatOptionContainerInnerView]}>
               <TouchableOpacity
                  style={styles.button}
                  underlayColor='#fff'
                  onPress = {()=>this.randomChat()}
                  >
                  <Text style={styles.buttonText}>Random Chat</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.chatListScrollView}>
          <ScrollView>
                


              <Collapse isCollapsed ={this.state.accordionCollapse[0]} onToggle={(isCollapsed)=>this.ToggleAccordion(isCollapsed,0)}>
                  <CollapseHeader>
                    <View style={this.AccordionHeaderStyle(this.state.accordionCollapse[0])}>
                      <View style={styles.AccordionHeaderTextContainer}>
                        <Text style={styles.AccordionText}>Profile</Text>
                      </View>

                      <View style={styles.AccordionHeaderIconContainer}>
                          {this.AccordionArrow(this.state.accordionCollapse[0])}
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    {this.RenderProfile(user)}
                  </CollapseBody>
              </Collapse>

              <Collapse isCollapsed ={this.state.accordionCollapse[1]} onToggle={(isCollapsed)=>this.ToggleAccordion(isCollapsed,1)}>
                  <CollapseHeader>
                    <View style={this.AccordionHeaderStyle(this.state.accordionCollapse[1])}>
                      <View style={styles.AccordionHeaderTextContainer}>
                        <Text style={styles.AccordionText}>Rooms</Text>
                      </View>

                      <View style={styles.AccordionHeaderIconContainer}>
                          {this.AccordionArrow(this.state.accordionCollapse[1])}
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                      <View style={styles.roomOption}>
                          <TouchableOpacity style={styleButtonSortAlphabet} onPress = {()=>this.setSortOption(true)}>
                              <FontAwesome name="sort-alpha-asc" type="foundation" style={styles.AccordionArrow, {fontSize:15, textAlign:'center'}}></FontAwesome>
                          </TouchableOpacity>

                          <TouchableOpacity style={styleButtonSortTime} onPress = {()=>this.setSortOption(false)}>
                              <IonIcon name="md-time" type="ionicons" style={styles.AccordionArrow, {fontSize:18, textAlign:'center'}}></IonIcon>
                          </TouchableOpacity>

                      </View>

                      {this.RenderRoom()}
                  </CollapseBody>
              </Collapse>

          </ScrollView>
        </View>

        { state.randomChat &&
          <View style={styles.loading}>
              <ActivityIndicator/>
          </View>
        }

      </View>
    );
  }
}
