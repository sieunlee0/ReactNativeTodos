import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return(
    <View>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <Text>Work</Text>
        <Text>Travel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  }
})