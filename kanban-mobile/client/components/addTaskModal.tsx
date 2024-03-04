import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Modal, Text, Pressable, TextInput, View, StyleSheet } from 'react-native';

interface TaskItem {
    key: string;
    content: string;
  }

const AddTaskModal = ({ isVisible, onClose, columnName }: { isVisible: boolean, onClose: () => void, columnName: string }) => {
    const [taskName, setTaskName] = useState('');

    console.log(columnName);
    const handleSave =  async () => {
        const maxId = await AsyncStorage.getItem('idMax'); 
        const taskData = {key: maxId, content: taskName}
        //armazenando no local storage
        const numberStore = parseInt(taskData.key);
        const newNumber = numberStore + 1;
        const numberString = newNumber.toString();
        await AsyncStorage.setItem('idMax', numberString);

        if(columnName === 'todo'){
            const list = await AsyncStorage.getItem('todoData');

            console.log('antiga lista', list)
            const newList = [...JSON.parse(list), taskData];
            console.log('nova lista apos adiçaõ: ', newList)

            await AsyncStorage.setItem('todoData', JSON.stringify(newList));
        }else if(columnName === 'done'){
            const list = await AsyncStorage.getItem('doneData');
            
            console.log('antiga lista', list)
            const newList = [...JSON.parse(list), taskData];
            console.log('nova lista apos adiçaõ: ', newList)

            await AsyncStorage.setItem('doneData', JSON.stringify(newList));
        }else if(columnName === 'in progress'){
          const list = await AsyncStorage.getItem('progressData');
            
            console.log('antiga lista', list)
            const newList = [...JSON.parse(list), taskData];
            console.log('nova lista apos adiçaõ: ', newList)

            await AsyncStorage.setItem('progressData', JSON.stringify(newList));
        }

      setTaskName('');
      onClose();
    };
  
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Coloque o nome da tarefa"
              value={taskName}
              onChangeText={text => setTaskName(text)}
            />
            <Pressable style={[styles.button, styles.buttonClose]} onPress={handleSave}>
              <Text style={styles.textStyle}>Add Task</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={onClose}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: '#2d3748',
      marginTop: 10,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      padding: 8,
      marginBottom: 15,
    },
  });
  
  export default AddTaskModal;