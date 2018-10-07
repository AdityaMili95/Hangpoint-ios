import * as fireHelper from '../Helper/FirebaseHelper.js';
import { NativeModules } from 'react-native';
var RoomHandler = NativeModules.HPChatRoomHandler;

export function joinChat(key, user, password, onError, callback){
    RoomHandler.JoinChat(key, user.uid, password, (newChatData, newMemberData, newChat) => {
      console.log(newMemberData);
      console.log(newChatData);
      console.log(newChat);
      newChat.date = new Date().getTime();
        fireHelper.UpdateData("/chats/"+key+"/member", newMemberData, pushUserChatData, {key:key, user:user, data:[newChatData, newChat], callback:callback, onError: onError});
    });
  }

export function pushUserChatData(data, error){
      if(error){
        console.log(error);
        if(data.onError){
          data.onError();
        }
        
        return;
      }
      fireHelper.UpdateData("/users/"+data.user.uid+"/chat", data.data[0], pushJoinChat, data);
  }

export function pushJoinChat(data, error){

    if(error){
        console.log(error);
        if(data.onError){
          data.onError();
        }

        return;
    }

    fireHelper.PushData("/chats/"+data.key+"/chat", data.data[1], data.callback);
  }