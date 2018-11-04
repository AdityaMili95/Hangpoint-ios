import {View, Text, ListView } from 'react-native';
import React, { Component } from 'react';
import styles from '../../Styles/ChatRoomList';
import ChatRoom from './ChatRoom'
import SectionHeader from '../ListSectionHeader'
import Swipeout from 'react-native-swipeout';

export default class ChatRoomListView extends Component {

   constructor(props) {
      super(props);

      this.renderRow = this.renderRow.bind(this);
      this.getListView = this.getListView.bind(this);

      var ds = this.getDatasource();
      var ds_plain = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      var data = props.data;
      var keys = props.sortedKey;

      const { dataBlob, sectionIds, rowIds } = this.formatData(data, keys);
      this.state={
        dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
        dataSourcePlain: ds_plain.cloneWithRows(this.getArrayOfData(data, keys)),
        sortByTime:props.sortByTime
      };
   }

  componentWillReceiveProps(nextProps) {
    
    var ds = this.getDatasource();
    var ds_plain = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    var keys = nextProps.sortedKey;

    const { dataBlob, sectionIds, rowIds } = this.formatData(nextProps.data, keys);

    this.setState({
        dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
        dataSourcePlain: ds_plain.cloneWithRows(this.getArrayOfData(nextProps.data, keys)),
        sortByTime: nextProps.sortByTime
    });
  } 

  getArrayOfData(data, keys){
    var arrData = [];
    for(idx in keys){
      var key = keys[idx];
      if(!data[key]){
        continue;
      }

      data[key]['key'] = key;
      arrData.push(data[key]);
    }
    return arrData;
  }

  getDatasource(){
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];
    const ds = new ListView.DataSource(
        {
          rowHasChanged: (r1,r2) => r1 !== r2,
          sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
          getSectionData,
          getRowData,
        }
      );

    return ds;
  }


   formatData(data, keys) {
    // We're sorting by alphabetically so we need the alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~`!@#$%^&*()-_+={}[]|\\:;"\'?/>.<,'.split('');

    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    //var keys = Object.keys(data);
    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      // Get the character we're currently looking for
      const currentChar = alphabet[sectionId];

      // Get users whose first name starts with the current letter
      const users = keys.filter((key) => data[key] && data[key].displayText.toUpperCase().indexOf(currentChar) === 0);
      // If there are any users who have a first name starting with the current letter then we'll
      // add a new section otherwise we just skip over it
      if (users.length > 0) {
        // Add a section id to our array so the listview knows that we've got a new section
        sectionIds.push(sectionId);

        // Store any data we would want to display in the section header. In our case we want to show
        // the current character
        dataBlob[sectionId] = { character: currentChar };

        // Setup a new array that we can store the row ids for this section
        rowIds.push([]);

        // Loop over the valid users for this section
        for (let i = 0; i < users.length; i++) {
          // Create a unique row id for the data blob that the listview can use for reference
          const rowId = `${sectionId}:${i}`;

          // Push the row id to the row ids array. This is what listview will reference to pull
          // data from our data blob
          rowIds[rowIds.length - 1].push(rowId);

          // Store the data we care about for this row
          dataBlob[rowId] = data[users[i]];
        }
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }

   renderRow(data){
     let swipeBtns = [
       {
        text: 'Left',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 1, 0.6)',
        onPress: () => { this.props.onleft(data) }
      }
    ];
    var lastChat = "";
    var countNotRead = 0;

    if (data.countNotRead){
      countNotRead = data.countNotRead;
    }

    if (data.lastChat){
      lastChat = data.lastChat.text;
    }

    return( 
        <Swipeout right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
          <ChatRoom toConvers={ this.props.toConvers } data = {{key:data.key, name:data.displayText,'notRead': countNotRead,'image':data.image, 'date':data.lastChatDate,'desc':lastChat, isProfile:false, origName: data.origName }}/>;
        </Swipeout>
    )
   }

   getListView(){
      if (this.state.sortByTime){
          return(
            <ListView
              dataSource={this.state.dataSourcePlain}
              renderRow={(data) => this.renderRow(data)}
            />
          );
      }

      return (<ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => this.renderRow(data)}
        renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
      />);
   }

   render(){
      return this.getListView();
   }
}