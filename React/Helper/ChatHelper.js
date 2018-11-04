import * as fireHelper from '../Helper/FirebaseHelper.js';
import { NativeModules } from 'react-native';
var RoomHandler = NativeModules.HPChatRoomHandler;

export function joinChat(key, user, password, onError, callback){
    RoomHandler.JoinChat(key, user.uid, password, (newChatData, newMemberData, newChat) => {
      newChat.date = new Date().getTime();
        fireHelper.UpdateData("/chats/"+key+"/member", newMemberData, pushUserChatData, {key:key, user:user, data:[newChatData, newChat], callback:callback, onError: onError});
    });
  }

export function pushUserChatData(data, error){
      if(error){
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

export function newChat(user, chatName, chatImage, chatPassword, onSuccess){

        var data = {
            'uid': user.uid,
            'name':chatName,
            'image': chatImage,
            'password': chatPassword
        };

        RoomHandler.ConstructChatData(data, (opt, idListOpt) => {
          fireHelper.GetChatKey("/chats", opt, SetChatData, {'user':user ,'opt': opt, 'idListOpt':idListOpt, 'onSuccess': onSuccess });
        });
}

export function SetChatData(data, key, param){
    fireHelper.UpdateData("/chats/" + key + "/member", param.opt.member);
    fireHelper.UpdateData("/chats/" + key + "/detail", param.opt.detail);
    SetChatDetail(key, param);
}

export function SetChatDetail(key, fullparam){
    param = fullparam.idListOpt.detail;
    fireHelper.SetData("/chatIdList/"+key+"/detail/chatName", param.chatName);
    fireHelper.SetData("/chatIdList/"+key+"/detail/created_date", param.created_date);
    fireHelper.SetData("/chatIdList/"+key+"/detail/isPassword", param.isPassword);
    fireHelper.SetData("/chatIdList/"+key+"/detail/memberCount", param.memberCount);
    fireHelper.SetData("/chatIdList/"+key+"/detail/image", param.image);

    newChatOpt ={};
    newChatOpt[key]={
       "chat_id" : key
    };
    fireHelper.UpdateData("/users/"+fullparam.user.uid+"/chat", newChatOpt);

    if (fullparam.onSuccess){
        fullparam.onSuccess();
    }
}

export function RemoveChat(key, uid){
  fireHelper.RemoveData("chatIdList/"+key+"/detail");
  fireHelper.RemoveData("chats/"+key+"/detail");
  fireHelper.RemoveData("chats/"+key+"/member/"+uid);
  fireHelper.RemoveData("chats/"+key+"/chat");
  fireHelper.RemoveData("users/"+uid+"/chat/"+ key);
}

export function LeftChat(key, uid, data, memberCount){
  fireHelper.UpdateData("chatIdList/"+key+"/detail", {'memberCount': memberCount-1});
  fireHelper.PushData("chats/"+key+"/chat", data);
  fireHelper.RemoveData("chats/"+key+"/member/"+uid);
  fireHelper.RemoveData("users/"+uid+"/chat/"+ key);
}

export function EditChat(param){
  console.log(param);
  fireHelper.UpdateData('chats/'+param.key+"/detail", param.opt, EditChatName, param);
}

export function EditChatName(param){
  fireHelper.SetData("/chatIdList/"+param.key+"/detail/chatName", param.chatIdOpt.chatName, EditChatIsPassword, param);
}

export function EditChatImage(param){
  fireHelper.SetData("/chatIdList/"+param.key+"/detail/image", param.chatIdOpt.image, EditChatIsPassword, param);
}

export function EditChatIsPassword(param){
    fireHelper.SetData("/chatIdList/"+param.key+"/detail/isPassword", param.chatIdOpt.isPassword, PushChat, param);
}

export function PushChat(param){
  fireHelper.PushData('chats/'+param.key+"/chat", param.chatData, param.callback, param);
}

export function InsertMember(param){
  fireHelper.UpdateData("/chats/"+param.key+"/member/"+param.uid, param.peopleOpt, EditUserChat, param);
}

export function EditUserChat(param){
    fireHelper.UpdateData("/users/"+param.uid+"/chat", param.newChatOpt, PushChat, param);
}






