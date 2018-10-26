import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#ecf0f1',
  },
  chatBackgroundImageHolder:{
      position:'absolute',
      width:'100%',
      height:'100%',
      top:0,
      left:0,
      backgroundColor:'white'
  },
  chatOptionHolder:{
    position:'absolute',
    width:'100%',
    height:60,
    flexDirection:'row',
    padding:10,
    top:0,
    backgroundColor:'#ecf0f1'
  },
  chatOptionItem:{
    height:'100%',
    borderRightWidth:1,
    borderRightColor:'#fff',
    flexDirection:'column',
    width:'20%',
  },
  chatOptionTopView:{
    height:30,
    width:'100%',
    justifyContent:'center'
  },
  chatOptionBottomView:{
    height:10,
    alignItems:'center',
    justifyContent:'center'
  },
  overlayContainer:{
    position:'absolute',
    left:0,
    top:0,
    width:'100%',
    height:670,
  },
  stickerContainer:{
    position:'absolute',
    width:'100%',
    height:200,
    bottom:128,
    backgroundColor:'#ecf0f1'
  },
  stickerIconHolder:{
    height:50,
    backgroundColor:'#ecf0f1',
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#fff'
  },
  stickerItemHolder:{
    height:150,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  stickerIcon:{
    flexDirection:'column',
    width:'20%',
    justifyContent:'center',
    padding:8,
    borderRightWidth:1,
    borderRightColor:"#fff",
    height:'100%'
  },
  stickerIconSelected:{
    backgroundColor:'#bdc3c7'
  },
  stickerItem:{
    flexDirection:'column',
    width:'20%',
    padding:8,
    height:'50%'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  chatBody:{
    textAlign:'left',
      fontSize:12,
      color:'#fff',
  },
  chatTime:{
    fontSize:9,
    color:'#000'
  },
  eventText:{
    fontSize:9,
    textAlign:'center',
    color:'#fff'
  },
  chatTimeContainer:{
    width:'100%',
    height:20,
    justifyContent:'center',
    marginTop:5
  },
  chatInfoHolder:{
    width:190,
    justifyContent: 'flex-start',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection:'row',
  },
  scrollChatContainer:{
     width: '100%', 
    height:542
  },
  scrollChat:{
    width:'100%',
    padding:8,
  },
  innerChat:{
    //display:'inline',
    justifyContent: 'center',
    flexDirection:'column',
  }, 
  chatContainer:{
    maxWidth:'70%',
    padding:10,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  myChat:{
    alignSelf:'flex-end',
    alignItems:'flex-end',
    justifyContent: 'flex-end',
    flexWrap: 'wrap', 
    flexDirection:'row',
    marginBottom:20
  },
  myChatInfoHolder:{
    marginBottom:0
  },
  chatName:{
      width:'80%',
      height:19,
      //justifyContent:'top',
      marginLeft:20
  },
  readInfo:{
    marginTop:5,
  },
  nameText:{
      fontSize:10
  },
  myName:{
    alignItems:'flex-end',
    marginRight:20,
    marginLeft:0,
    height:20,
  },
  chatPP:{
    width:40,
    height:60,
  },
  chatPPImage:{
    height:40
  },
  triangle:{
    position:'absolute',
    right:-1,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderBottomWidth: 10,
    alignSelf:'flex-end',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'rgba(41, 128, 185,1.0)',
  },
  myTriangle:{
    alignSelf:'flex-start',
    left:-1,
    borderBottomColor: 'transparent',
    borderLeftColor: 'rgba(41, 128, 185,1.0)',
     borderRightWidth: 0,
     borderLeftWidth: 10,
    borderBottomWidth: 10,
  },
  chatArrow:{
    width:15,
    height:20,
    //backgroundColor:'blue',
    marginLeft:5,
    justifyContent:'center'
  },
  myArrow:{
    marginLeft:0,
    marginRight:5,
    //justifyContent:'top',
  },
  chatText:{
    maxWidth:170,
    backgroundColor:'rgba(41, 128, 185,1.0)',
    alignSelf: 'flex-start',
    padding:8,
    flexWrap: 'wrap',
    borderRadius:10,
  },
  chatImage:{
      //backgroundColor:'none',
      width:100,
      height:100
  },
  groupImage:{
    width:'100%',
    height:'100%',
    backgroundColor:"#D7D7D7",
    borderRadius:20,
    resizeMode: 'contain'
  },
  eventNotif:{
    padding:10,
    alignSelf:'center',
    borderRadius:10,
    alignItems:'center',
    backgroundColor:'#34495e',
    maxWidth:'80%',
    marginBottom:20
  },
  dayBar:{
    alignSelf:'center',
    borderRadius:10,
    padding:10,
    maxWidth:'60%',
    backgroundColor:'#2c3e40',
    marginBottom:20
  },
  eventNotifTop:{
    height:20
  },
  inputChat:{
    width:'100%',
    height:60,
    flexDirection:'row',
  },
  innerInputText:{
     flexDirection:'column',
      height:'100%',
  },
  stickerButtonHolder:{
      width:65,
      marginRight:5,
      justifyContent:'center',
      backgroundColor:'#2980b9'
  },
  InputHolder:{
    width:305,
    height:'100%',
    justifyContent:'center',
    paddingLeft:5,
    paddingRight:5,
    flexDirection:'row',
  },
  chatInputHolder:{
    height:'100%',
    width:255,
    //backgroundColor:'yellow',
  },
  chatInput:{
    width:'100%',
    textAlign:'left',
    height:'100%',
    paddingLeft:5,
    paddingRight:5,
    fontSize:11,
  },
  sendButton:{
    height:'100%',
    width:35,
    justifyContent:'center',
  },
  innerChatInput:{
    //backgroundColor:'green',
    borderRadius:15,
    overflow:'hidden',
    borderStyle: 'solid',
    borderWidth:2,
    alignSelf:'center',
    borderColor:'#2c3e50',
    width:'100%',
    height:'60%',
    flexDirection:'row'
  }
});

export default styles;