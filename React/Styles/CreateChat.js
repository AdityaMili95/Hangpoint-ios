import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
 innerGroupView:{
    height:'100%',
    justifyContent: 'center',
    flexDirection:'column',
  },
  innerGroupViewImage: {
    width:'17%',
    alignItems:"center"
  },
  groupImage:{
    width:50,
    height:50,
    backgroundColor:"#D7D7D7",
    borderRadius:25,
    resizeMode: 'contain'
  },

});

export default styles;