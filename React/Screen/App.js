/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as fireHelper from '../Helper/FirebaseHelper.js';
import {StackNavigation} from '../Navigation/Navigator'
import Header from '../Component/Header';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  NativeModules,
  ActivityIndicator
} from 'react-native';

import { 
  Card
} from 'react-native-elements';

const desc = `HangPoint is a realtime chatting application in web platform. Chat everyone you like or with random peoples around the world. Create a multichat or join random chatgroups. Use your google account for chatting, no more register needed. Just a single click and you are ready to explore the world`;

var loginHandler = NativeModules.HPLoginHandler;


type Props = {};
export default class App extends Component<Props> {
  
  constructor(props) {
    super(props);
    this.state = {
      'caret':'_',
      'alltext':loginHandler.wording,
      'currIndex':0,
      'currText':'Discover the World',
      'user':undefined,
      'checkAuth':false,
      deleting:false
    };
    
    this.loginState = this.loginState.bind(this);

    fireHelper.initClient();
    fireHelper.listenAuthState(this.loginState);

    setInterval(() => {
      this.animateText();
    }, 300);
  }

  loginState(user){

      if(!user){
        fireHelper.DetachEverything();
      }

      this.setState({
        user:user,
        checkAuth:true
      });
  }
  
  animateText(){
    var caret = this.state.caret;
    if (caret=='_'){
      caret=' ';
    }else{
      caret='_';
    }
      
    var state=this.state;
    var text = state.currText;
    var deleting=state.deleting;
    var currIndex=state.currIndex;
    
    if(!deleting&&text!=state.alltext[state.currIndex]){
      text+=state.alltext[state.currIndex][text.length];
    }else if(!deleting&&text==state.alltext[state.currIndex]){
      deleting=true;
    }else if(deleting&&text!=""){
      text=text.substring(0,text.length-1);
    }else{
      deleting=false;
      currIndex+=1;
      currIndex%=state.alltext.length;
    }
    
    this.setState({
      caret:caret, 
      currText:text,
      deleting:deleting,
      currIndex:currIndex
    });
    
  }

  gotoHome(){
    loginHandler.gotolink(loginHandler.homePage)
  }
  
  render() {

    if(this.state.user){
      return <StackNavigation screenProps={{'user':this.state.user}}/>
    }

    return (
      <View style={styles.container}>

        <Header title={loginHandler.title}/>
        
        <Text style={styles.subtitle}>
          {this.state.currText+this.state.caret}
        </Text>
       
         <Card style={styles.card}>
            <Text style={styles.detail}>
              {desc}
            </Text>
         </Card>
         
        <Image
          source={require('../../assets/images/laptop.png')}
          style={styles.image}
        />
        
        <Image
          source={require('../../assets/images/hangpoint.gif')}
          style={styles.innerImage}
        />
        
         <TouchableOpacity
          style={styles.button}
          underlayColor='#fff' onPress={() => fireHelper.handleGoogleLogin()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
 
        <Text style={styles.mark}>
          Aditya.Mili@2018
        </Text>
        
        <TouchableOpacity onPress={() => this.gotoHome()}>
          <Text style={styles.visit}>Visit at: http://adityamili.com</Text>
        </TouchableOpacity>

        {(!this.state.checkAuth) &&
          <View style={styles.loading}>
              <ActivityIndicator/>
          </View>
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#039BE5',
  },
  subtitle: {
    fontSize: 23,
    textAlign: 'center',
    marginTop: 20,
    marginBottom:10,
    color:'white',
  },
  card:{
    backgroundColor:'red',
  },
  detail: {
    fontSize: 10,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    borderWidth:1,
    borderColor:'white',
    width:'90%',
    height:45,
    marginTop:30,
    justifyContent: 'center',
  },
  buttonText:{
    textAlign:'center',
    color:'white',
  },
  innerImage:{
    position:'absolute',
    width: 225,
    height:141,
    top:307,
    left:75,
  },
  image: {
    width: 310,
    marginTop:50,
    height: 200,
    resizeMode: 'contain'
  },
  mark:{
    color:'white',
    fontSize:9,
    marginTop:20,
  },
  visit:{
    color:'white',
    fontSize:9,
    marginTop:15,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.3,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
