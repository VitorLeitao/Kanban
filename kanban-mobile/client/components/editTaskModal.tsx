import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Modal, Text, Pressable, TextInput, View, StyleSheet } from 'react-native';

interface TaskItem {
    key: string;
    content: string;
  }

const EditTaskModal = ({ isVisible, onClose, item, todo, done, inProgress }: { isVisible: boolean, onClose: () => void, item: TaskItem, todo: TaskItem[], done: TaskItem[], inProgress: TaskItem[] }) => {

    const isItemExist = (array: TaskItem[], task: TaskItem) => {
        return array.some(item => item.key === task.key);
    };

    const findItemIndex = (array: TaskItem[], task: TaskItem) => {
        return array.findIndex(item => item.key === task.key);
    };

    const [selectedButton, setSelectedButton] = useState('');
    const [taskName, setTaskName] = useState('');
    const [columDestination, setColumn] = useState('');

    const handleDelete = async () => {
        if(isItemExist(todo, item)){
            const updatedTodo = todo.filter(todoItem => todoItem.key !== item.key);
            await AsyncStorage.setItem('todoData', JSON.stringify(updatedTodo));

        }else if(isItemExist(done, item)){
            const updatedDone = done.filter(todoItem => todoItem.key !== item.key);
            await AsyncStorage.setItem('doneData', JSON.stringify(updatedDone));

        }else if(isItemExist(inProgress, item)){
            const updateProgress = inProgress.filter(todoItem => todoItem.key !== item.key);
            await AsyncStorage.setItem('progressData', JSON.stringify(updateProgress));
        }

        setTaskName('');
        onClose();
        setSelectedButton('');
    
    }
    
    const handleSave =  async () => {
        if(columDestination === ''){
            setTaskName('');
            onClose();
            setSelectedButton('');
            
        }
        if(isItemExist(todo, item)){
            
            if(columDestination === 'todo'){
                const todoClone = [...todo]; 
                const index = findItemIndex(todoClone, item);
                if (index !== -1) {
                    todoClone[index].content = taskName;
                    await AsyncStorage.setItem('todoData', JSON.stringify(todoClone)); 
                }
                setTaskName('');
                onClose();
                setSelectedButton('');
                

            }else if(columDestination === 'done'){
                const updatedTodo = todo.filter(todoItem => todoItem.key !== item.key);
                const updatedDone = [...done, item];
                await AsyncStorage.setItem('todoData', JSON.stringify(updatedTodo));
                await AsyncStorage.setItem('doneData', JSON.stringify(updatedDone));

            }else if(columDestination === 'inProgess'){
                const updatedTodo = todo.filter(todoItem => todoItem.key !== item.key);
                const updatedProgress = [...inProgress, item];
                await AsyncStorage.setItem('todoData', JSON.stringify(updatedTodo));
                await AsyncStorage.setItem('progressData', JSON.stringify(updatedProgress));
            }
        }else if(isItemExist(done, item)){
            if(columDestination === 'done'){

                const doneClone = [...done]; 
                const index = findItemIndex(doneClone, item);
                if (index !== -1) {
                    doneClone[index].content = taskName;
                    await AsyncStorage.setItem('doneData', JSON.stringify(doneClone)); 
                }
                setTaskName('');
                onClose();
                setSelectedButton('');
                

            }else if(columDestination === 'todo'){
                const updatedDone = done.filter(todoItem => todoItem.key !== item.key);
                const updatedTodo = [...todo, item];
                await AsyncStorage.setItem('doneData', JSON.stringify(updatedDone));
                await AsyncStorage.setItem('todoData', JSON.stringify(updatedTodo));

            }else if(columDestination === 'inProgess'){
                const updatedDone = done.filter(todoItem => todoItem.key !== item.key);
                const updatedProgress = [...inProgress, item];
                await AsyncStorage.setItem('doneData', JSON.stringify(updatedDone));
                await AsyncStorage.setItem('progressData', JSON.stringify(updatedProgress));
            }
        }else if(isItemExist(inProgress, item)){
            if(columDestination === 'inProgess'){

                const progressClone = [...inProgress]; 
                const index = findItemIndex(progressClone, item);
                if (index !== -1) {
                    progressClone[index].content = taskName;
                    await AsyncStorage.setItem('progressData', JSON.stringify(progressClone)); 
                }
                setTaskName('');
                onClose();
                setSelectedButton('');
                

            }else if(columDestination === 'todo'){
                const updatedProgress = inProgress.filter(todoItem => todoItem.key !== item.key);
                const updatedTodo = [...todo, item];
                await AsyncStorage.setItem('progressData', JSON.stringify(updatedProgress));
                await AsyncStorage.setItem('todoData', JSON.stringify(updatedTodo));

            }else if(columDestination === 'done'){
                const updatedProgress = inProgress.filter(todoItem => todoItem.key !== item.key);
                const updatedDone = [...done, item];
                await AsyncStorage.setItem('progressData', JSON.stringify(updatedProgress));
                await AsyncStorage.setItem('doneData', JSON.stringify(updatedDone));
            }
        }

      setTaskName('');
      onClose();
      setSelectedButton('');
      
    };
  
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Coloque o nome da tarefa"
              value={taskName}
              onChangeText={text => setTaskName(text)}
            />
            <View style={[styles.buttonsView]}>
                <Pressable style={[styles.button, styles.buttonClose, selectedButton === 'todo' && styles.selectedButton]} onPress={() => {setColumn('todo');
                                setSelectedButton('todo');}}>
                    <Text style={styles.textStyle}>TODO</Text>
                </Pressable>

                <Pressable style={[styles.button, styles.buttonClose, selectedButton === 'done' && styles.selectedButton]} onPress={() => {setColumn('done');
                                setSelectedButton('done');}}>
                    <Text style={styles.textStyle}>DONE</Text>
                </Pressable>

                <Pressable style={[styles.button, styles.buttonClose, selectedButton === 'inProgess' && styles.selectedButton]} onPress={() => {setColumn('inProgess');
                                setSelectedButton('inProgess');}}>
                    <Text style={styles.textStyle}>IN PROGRESS</Text>
                </Pressable>
            </View>
            
            <View style={[styles.buttonsView]}>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={handleSave}>
                    <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={onClose}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>

                <Pressable style={[styles.button, styles.buttonClose]} onPress={handleDelete}>
                    <Text style={styles.textStyle}>Apagar</Text>
                </Pressable>
            </View>
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
    buttonsView: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
      },
    selectedButton: {
    backgroundColor: '#2196F3', 
    },
  });
  
  export default EditTaskModal;