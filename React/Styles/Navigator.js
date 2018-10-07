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
    height:45
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
});

export default styles;