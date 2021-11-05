import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { styles } from "../App";

export default function ShowToggle() {
    return(
        <TouchableOpacity style={styles.toDoIcon}>
                <Text>✅</Text>
        </TouchableOpacity>
    );
}