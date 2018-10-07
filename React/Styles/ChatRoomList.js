import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#ecf0f1',
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

  searchBar:{
    backgroundColor:'#fff',
    height:35,
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  chatOptionContainer:{
    backgroundColor:'#fff',
    height:45,
    width:'100%',
    justifyContent:'center',
    flexWrap: 'wrap', 
    alignItems: 'center',
    borderBottomWidth:1,
    borderBottomColor:'rgba(236, 240, 241,1.0)',
    flexDirection:'row',
  },
  chatOptionContainerInnerView:{
     flexDirection:'column',
     width:'49.5%',
     alignItems:'center',
     justifyContent:'center'
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
    backgroundColor:'#fff',
    justifyContent:'flex-start',
  },
  notifHolder:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f00',
    height:22,
    width:40,
    borderRadius:25
  },
  notifTop:{
    justifyContent:'center',
    alignItems:'center',
    height:'40%',
    width:'100%',
    alignSelf:'center',
    paddingRight:8,
    justifyContent:'center',
  },
  notifBottom:{
    justifyContent:'center',
    alignItems:'flex-end',
    height:'60%',
    paddingRight:8
  },
  notifTime:{
    fontSize:9,
    alignSelf:'flex-end',
    textAlign:'right',
    marginTop:5
  },
  notifText:{
    color:'white',
    fontSize:11
  },  
  chatViewTop:{
    height:'60%',
    justifyContent: 'center',
    marginLeft:4
  },
  chatViewBottom:{
    height:'40%',
    justifyContent: 'flex-start',
    marginLeft:4
  },
  groupName:{
    fontSize:14,
    color: '#039BE5',
  },
  textHighlight:{
    fontSize:12,
    color:'gray'
  },
  SearchInput:{
    borderBottomWidth:1,
    borderBottomColor:'#000',
    width:'95%',
    textAlign:'center',
    height:'100%',
    fontSize:10
  },
  button:{
    justifyContent:'center',
    height:'100%',
    width:'100%',
    alignItems:'center'
  },
  buttonText:{
    fontSize:10,
    color:'gray'
  },
  AccordionHeaderContainer:{
    height:25,
    justifyContent:'center',
    flexDirection:"row",
    paddingLeft:10
  },
  AccordionHeaderContainerNotCollapsed:{
    borderBottomColor:'#fff',
    borderBottomWidth:1
  },
  AccordionHeaderTextContainer:{
    width:330,
    height:'100%',
    justifyContent:'center',
    flexDirection:'column'
  },
  AccordionHeaderIconContainer:{
    width:40,
    flexDirection:'column',
    justifyContent:'center'
  },
  AccordionText:{
    fontSize:12
  },
  AccordionArrow:{
    textAlign:'center',
    fontSize:14
  },
  chatListScrollView:{
    height:485
  },
  roomOption:{
    height:50,
    width:120,
    backgroundColor:'rgba(0,0,0,0.1)',
    alignSelf:'flex-start',
    flexDirection:'row',
    marginRight:8
  },
  roomOptionitem:{
    flexDirection:'column',
    width:'50%',
    height:'100%',
    justifyContent:'center'
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


export default styles;
