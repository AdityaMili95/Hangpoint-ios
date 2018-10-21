import * as firebase from 'firebase';
import { GoogleSignin } from 'react-native-google-signin';

var listListened = [];

export function initClient(){
	firebaseConfig = {
		apiKey: "AIzaSyDGYXjYCuUL5PcLprFzDuIV92n0754-CtU",
	    authDomain: "hangpoint-4cdd3.firebaseapp.com",
	    databaseURL: "https://hangpoint-4cdd3.firebaseio.com",
	    projectId: "hangpoint-4cdd3",
	    storageBucket: "hangpoint-4cdd3.appspot.com",
	    messagingSenderId: "418620838647"
	};
	return firebase.initializeApp(firebaseConfig);
}

export function listenAuthState(callback){
	firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        callback(user);
      } else{
        callback();
      }
    });
}

export function DetachEvent(ref){
  firebase.database().ref(ref).off();
}

export function DetachEverything(){
  for (var i=0; i< listListened.length;i++){
    DetachEvent(listListened[i]);
  }
  listListened = [];
}

export function ValueEvent(ref, callback, key){
  //console.log(ref);
  DetachEvent(ref);

  listListened.push(ref);
  firebase.database().ref(ref).on("value", function(snapshot){
    callback(snapshot.val(),key);
  });
}

export function ValueOnceEventWithLimit(ref, limit, callback){
  firebase.database().ref(ref).limitToLast(limit).on("value", function(snapshot){
    DetachEvent(ref);
    callback(snapshot.val());
  });
}

export function UpdateData(ref, data, callback, param){
  firebase.database().ref(ref).update(data, function(error){
      if(callback){
          callback(param, error);
      }
  });
}

export function SetData(ref, data, callback, param){
  firebase.database().ref(ref).set(data, function(error){
      if(callback){
          callback(param, error);
      }
  });
}

export function RemoveData(ref, callback, param){
  firebase.database().ref(ref).remove();
}

export function GetChatKey(ref, data, callback, param){
    var newKey = firebase.database().ref(ref).push(data).key;

    if (callback){
      callback(data, newKey, param);
    }
}

export function PushData(ref, data, callback, param){
  firebase.database().ref(ref).push(data);

  if (callback){
    callback(data, param);
  }
}

export function logOut(){
  GoogleSignin.signOut();
  firebase.auth().signOut();
}


export function handleGoogleLogin(){
	
    GoogleSignin.configure({
		scopes: ["https://www.googleapis.com/auth/calendar"],
		iosClientId:"418620838647-7dl2lbl21cga310hso7b0ru28612vdto.apps.googleusercontent.com",
		offlineAccess: false
	});

    GoogleSignin.signIn()
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // Login with the credential
      return firebase.auth().signInWithCredential(credential);
    })
    .then((user) => {
    	//console.log(user);

      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
    	console.log(error);
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}