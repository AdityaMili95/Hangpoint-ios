import React from 'react';
import { createSwitchNavigator,TabNavigator,StackNavigator } from 'react-navigation';
import { Text } from 'react-native';

import Route from './Route';
import Home from '../Screen/Home';
import SearchChat from '../Screen/SearchChat';
import CreateChat from '../Screen/CreateChat';
import ChatPassword from '../Screen/JoinChatPassword';
import styles from '../Styles/Navigator';
import TabIcon from '../Component/TabIcon';

export const Navigator = TabNavigator({
  Me: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <TabIcon />
      //tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    },
  },
});

export const StackNavigation = new StackNavigator(
  {
    // Other pages here
    Home: {
      screen: Navigator,
      header: null,
       navigationOptions: {
          headerVisible: false,
          headerMode: 'screen',
          title: "",
          headerTitleStyle: styles.StackTextStyle,
          headerStyle: styles.StackStyle,
          headerTitle: <Text style={styles.StackTextStyle}>HangPoint</Text>,
       }
    },
    FindChat:{
      screen: SearchChat,
       navigationOptions: {
        title: "",
        headerTitle: <Text style={styles.StackReverseTextStyle}>Find Chat</Text>,
        headerTitleStyle: styles.StackReverseTextStyle,
        headerStyle: styles.StackReverseStyle,
        headerBackTitleStyle: styles.StackTintStyle,
        headerBackStyle: styles.StackTintStyle,
        headerTintColor:'#fff',
      }
    },
    CreateChat:{
        screen: CreateChat,
        navigationOptions: {
        title: "",
        headerTitle: <Text style={styles.StackReverseTextStyle}>New Chat</Text>,
        headerTitleStyle: styles.StackReverseTextStyle,
        headerStyle: styles.StackReverseStyle,
        headerBackTitleStyle: styles.StackTintStyle,
        headerBackStyle: styles.StackTintStyle,
        headerTintColor:'#fff',
      },
    },
    ChatPassword:{
        screen: ChatPassword,
        navigationOptions: {
        title: "",
        headerTitle: <Text style={styles.StackReverseTextStyle}>Password</Text>,
        headerTitleStyle: styles.StackReverseTextStyle,
        headerStyle: styles.StackReverseStyle,
        headerBackTitleStyle: styles.StackTintStyle,
        headerBackStyle: styles.StackTintStyle,
        headerTintColor:'#fff',
      },
    }
  },
);