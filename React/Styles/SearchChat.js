import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  StackStyle:{
    backgroundColor:'#EDEDED',
    height:55
  },
  StackTextStyle:{
    fontSize:16,
    color:'#039BE5'
  },
  StackReverseStyle:{
    backgroundColor:'#039BE5',
    shadowColor: 'transparent',
    borderBottomWidth:0,
    height:55,
  },
  StackReverseTextStyle:{
    fontSize:16,
    color:'#fff'
  },
  StackTintStyle:{
    color:"#fff",
    fontSize:14
  },
  searchChat:{
    width:'95%',
    height:60,
    flexDirection:'row',
  },
  innerInputText:{
     flexDirection:'column',
      height:'100%',
  },
  chatInputHolder:{
    height:'100%',
    width:300,
    //backgroundColor:'yellow',
  },
  chatInput:{
    width:'100%',
    textAlign:'left',
    height:'100%',
    paddingLeft:8,
    paddingRight:5,
    fontSize:11,
    color:'#000'
  },
  stickerButtonHolder:{
      width:45,
      marginRight:5,
      justifyContent:'center',
      backgroundColor:'#039BE5'
  },
  innerChatInput:{
    overflow:'hidden',
    borderStyle: 'solid',
    borderWidth:1,
    alignSelf:'center',
    borderRadius:7,
    borderColor:'#fff',
    backgroundColor:'#fff',
    width:'100%',
    height:'60%',
    flexDirection:'row'
  },
  sendButton:{
    height:'100%',
    width:35,
    justifyContent:'center',
  },
  CreateChatButton:{
    width:130,
    borderWidth:2,
    borderColor:'#fff',
    borderRadius:4,
    padding:7,
    marginBottom:5
  },
  buttonText:{
    color:'#fff',
    textAlign:'center',
    fontSize:11
  },
  searchChatTopContainer:{
    padding:5,
    width:'100%',
    alignItems:'center',
    backgroundColor:"#039BE5"
  },
  buttonJoin:{
    width:'100%',
    borderWidth:1,
    backgroundColor:'#039BE5',
    height:30,
    justifyContent:'center'
  },
  newChatHeader:{
    height:110,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    position:'relative',
    backgroundColor:'#039BE5',
  },
  bgImage:{
   flex: 1,
    resizeMode:'repeat',
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
  },
  inputArea:{
     width:'100%',
  },
  newChatInputHolder:{
    width:'100%',
    flexDirection:'row',
    height:50,
    marginTop:10
  },
  newChatInputItem:{
    height:'100%',
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:"#fff"
  },
  newChatInputItemLabelHolder:{
    height:'100%',
    width:'30%',
    justifyContent:'center',
    alignItems:'center'
  },
  newChatInputItemInputHolder:{
    height:'100%',
   width:'70%'
  },
   newChatInputItemLabel:{
    fontSize:12,
    textAlign:'right',
    alignSelf:'flex-end',
    paddingRight:5
  },
  newChatInputItemInput:{
  height:'100%',
   backgroundColor:"#fff",
   textAlign:'right',
   paddingRight:10
  },
  buttonCreate:{
    width:200,
    height:40,
    backgroundColor:'#039BE5',
    justifyContent:'center',
    marginTop:20,
    borderWidth:2,
    borderColor:'#fff'
  },




  group:{
    height: 70,
    backgroundColor:'#FFF',
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:'#D6DBDE',
    justifyContent: 'flex-start',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
    paddingLeft:5
  },

  myData:{
    marginBottom:2,
    marginTop:2
  },
  groupImage:{
    width:50,
    height:50,
    backgroundColor:"#D7D7D7",
    borderRadius:25,
    resizeMode: 'contain'
  },
  innerGroupView:{
    height:'100%',
    display:'flex',
    justifyContent: 'center',
    flexDirection:'column',
  },
  innerGroupViewImage: {
    width:'17%',
    alignItems:"center"
  },
  innerGroupViewDetail : {
    width:'60%',
    paddingLeft:3,
  },
  innerGroupViewNotif:{
    width:'22%',
  },
  notifTop:{
    justifyContent:'center',
    alignItems:'center',
    height:'40%'
  },
  notifBottom:{
    justifyContent:'center',
    alignItems:'center',
    height:'60%'
  },
  notifTime:{
    fontSize:10
  },
  chatViewTop:{
    height:'60%',
    justifyContent: 'center',
    marginLeft:4
  },
  chatViewBottom:{
    height:'40%',
    justifyContent: 'flex-start',
    marginLeft:10
  },
  groupName:{
    fontSize:16,
    color: '#039BE5',
  },
  textHighlight:{
    fontSize:12,
    color:'gray'
  },
  
});

export default styles;