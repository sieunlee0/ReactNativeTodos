import { tsNeverKeyword } from '@babel/types';
import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, TextInput,
ScrollView, Alert,} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { AsyncStorage } from 'react-native';
import { theme } from './color';


const STORAGE_KEY = "@toDos";

export default function App() {

  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toggleShow, setToggleShow] = useState(false);
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
  }, []);

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  

  const onChangeText = (payload) => setText(payload);

  const saveToDos = async(toDoSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toDoSave))
  };

  const loadToDos = async() => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = Object.assign({}, toDos, {[Date.now()]: {text, working, toggleShow,}} )
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const delToDo = (key) => {
    Alert.alert(
      "Delete To Do", "Are you sure?", [
      {text: "Cancel"},
      {text: "OK", 
      onPress: async() => {
        const newToDos = {...toDos}
        delete newToDos[key]
        setToDos(newToDos);
        await saveToDos(newToDos);
        },
      },
    ]);
  }

  const toggleChange = async(key) => {
    const newToDos = {...toDos}
    newToDos[key].toggleShow = true;
    setToDos(newToDos);
    await saveToDos(newToDos);
    
    if (newToDos[key].toggleShow === true) {
      setToggleShow(false);
      setToDos(newToDos);
      await saveToDos(newToDos);
    }
  }



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
      placeholder={working ? "Add a To Dos" : "Where do you want to go?"}
      style={styles.input} />

      <ScrollView>
        {Object.keys(toDos).map((key) => 
        toDos[key].working === working ? (
          <View style={styles.toDo} key={key}>
            <CheckBox 
            disabled={false}
            value={toggleShow}
            onChange={toggleChange}
            ></CheckBox>
            <Text style={{...styles.toDoText, color: !toggleShow ? "white" : theme.toDoDone}}>
              {toDos[key].text}
            </Text>

            <View style={styles.toDoText}>
              <TouchableOpacity style={{...styles.toDoIcon, display: toggleShow ? "none" : null}}>
                <Text>🖊</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toDoIcon} 
              onPress={() => delToDo(key)}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
          ) : null
        )}
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
    marginVertical: 20,
    fontSize: 20,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    // color: "white",
    fontSize: 15,
    fontWeight: "500",
    flexDirection: "row",
  },
  toDoIcon: {
    marginLeft: 15,
  },
})