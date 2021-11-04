import React from 'react';
import { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, TextInput,
ScrollView } from 'react-native';
import { theme } from './color';

export default function App() {

  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if (text === "") {
      return;
    }
    const newToDos = Object.assign({}, toDos, {[Date.now]: {text, work:working}} )
    setToDos(newToDos);
    setText("");
  };

  return(
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput 
      onSubmitEditing={addToDo}
      onChangeText={onChangeText}
      value={text}
      returnKeyType="done"
      placeholder={working ? "Add a To Dos" : "Where do you want to go?"}
      style={styles.input} />
      <ScrollView>
        {Object.keys(toDos).map((key) => (
        <View style={styles.toDo} key={key}>
          <Text style={styles.toDoText}>{toDos[key].text}</Text>
        </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 30,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  btnText: {
    fontSize: 30,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 20,
  },
  toDo: {},
  toDoText: {
    color: "white",
  }
})