import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return(
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.header}>
        <Text style={styles.btnText}>Work</Text>
        <Text style={styles.btnText}>Travel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 30,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  btnText: {
    color: 'white',
    fontSize: 30,
  },
})