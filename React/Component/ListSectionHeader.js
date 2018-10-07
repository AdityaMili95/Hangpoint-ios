import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingLeft:8,
    justifyContent: 'center',
    backgroundColor: 'rgba(236, 240, 241,1.0)',
  },
  text: {
    fontSize: 11,
    color:"rgba(52, 152, 219,1.0)"
  },
});

const SectionHeader = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.character}</Text>
  </View>
);

export default SectionHeader;