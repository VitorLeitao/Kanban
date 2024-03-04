import React, { useState, useRef, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, { NestableDraggableFlatList, NestableScrollContainer, OpacityDecorator, RenderItemParams, ScaleDecorator, ShadowDecorator, useOnCellActiveAnimation } from "react-native-draggable-flatlist"; // Importe RenderItemParams para tipar renderIte
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Animated from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {todoDataMock, doneDataMock, InProgressDataMock} from './data'
import AddTaskModal from "./components/addTaskModal";
import EditTaskModal from "./components/editTaskModal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface TaskItem {
  key: string;
  content: string;
}

export default function App() {

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [columnClicked, setColumn] = useState('');
  const [taskClicked, setTaskClicked] = useState({key: '0', content: 'null'});

  const [todoData, setTodoData] = useState<TaskItem[]>([]);
  const [doneData, setDoneData] = useState<TaskItem[]>([]);
  const [InProgressData, setInProgressData] = useState<TaskItem[]>([]);

  const fetchTodoData = async () => {
    try {
      const todoDataString = await AsyncStorage.getItem('todoData');
      console.log('Todo task do local storage: ' ,todoDataString);
      if (todoDataString) {
        const parsedTodoData = JSON.parse(todoDataString);
        setTodoData(parsedTodoData);
      }else{
        console.log('Todo task mocked: ' ,todoDataMock);
        setTodoData(todoDataMock);
        await AsyncStorage.setItem('todoData', JSON.stringify(todoDataMock));
      }
    } catch (error) {
      console.error('Error fetching todo data:', error);
    }
  };

  const fetchDoneData = async () => {
    try {
      const doneDataString = await AsyncStorage.getItem('doneData');
      console.log('DONE task do local storage: ' ,doneDataString);
      if (doneDataString) {
        const parsedDoneData = JSON.parse(doneDataString);
        setDoneData(parsedDoneData);
      }else{
        setDoneData(doneDataMock);
        await AsyncStorage.setItem('doneData', JSON.stringify(doneDataMock));
      }
    } catch (error) {
      console.error('Error fetching done data:', error);
    }
  };

  const fetchProgressData = async () => {
    try {
      const progressDataString = await AsyncStorage.getItem('progressData');
      if (progressDataString) {
        const parsedProgressData = JSON.parse(progressDataString);
        setInProgressData(parsedProgressData);
      }else{
        setInProgressData(InProgressDataMock);
        await AsyncStorage.setItem('progressData', JSON.stringify(InProgressDataMock));
        await AsyncStorage.setItem('idMax', '10');
      }
    } catch (error) {
      console.error('Error fetching todo data:', error);
    }
  };

  useEffect(() => {
    fetchTodoData();
    fetchDoneData();
    fetchProgressData();
    
  }, []);
  

  const renderItem = ({ item, drag }) => {
      const { isActive } = useOnCellActiveAnimation();
      return(
        <ScaleDecorator>
            <OpacityDecorator activeOpacity={0.5}>
              <ShadowDecorator>
                <TouchableOpacity
                onLongPress={drag}
                  activeOpacity={1}
                  style ={[
                    styles.card,
                    {elevation: isActive? 30: 0}
                  ]}
                >
                  <View>
                    <Text style={[styles.text]}>
                    {item.content}
                    <TouchableOpacity style={{...styles.editButton}} onPress={() => {
                                                  setIsEditModalVisible(true);
                                                  setTaskClicked(item);}}>
                        <FontAwesomeIcon icon={ faPenSquare } />
                  </TouchableOpacity>
                  </Text>
                  </View>
                  
                </TouchableOpacity>
              </ShadowDecorator>
            </OpacityDecorator>
        </ScaleDecorator>
      )
  }

  const handleDragEnd = async ({data, nameColumn}) => {
    if(nameColumn === 'todo'){
      setTodoData(data);
      await AsyncStorage.setItem('todoData', JSON.stringify(data));
    }else if(nameColumn === 'done'){
      setDoneData(data);
      await AsyncStorage.setItem('doneData', JSON.stringify(data));
    }else if(nameColumn === 'in progress'){
      setInProgressData(data);
      await AsyncStorage.setItem('progressData', JSON.stringify(data));
    }
  }

  return (
    <GestureHandlerRootView style={styles.containerRoot}>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle} >PROGRESS BOARD</Text>
      </View>
      
        <NestableScrollContainer style={{ backgroundColor: "seashell" }}>

        <AddTaskModal
            isVisible={isAddModalVisible}
            onClose={() => {
              setIsAddModalVisible(false);
              fetchTodoData();
              fetchDoneData();
              fetchProgressData();
            }}
            columnName={columnClicked} 
            />

          <EditTaskModal
            isVisible={isEditModalVisible}
            onClose={() => {
              setIsEditModalVisible(false);
              fetchTodoData();
              fetchDoneData();
              fetchProgressData();
            }}
            item={taskClicked}
            todo={todoData}
            done={doneData}
            inProgress={InProgressData}
            />

            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  To do
                </Text>
                  <TouchableOpacity style={{...styles.editButton}} onPress={() => { setIsAddModalVisible(true); setColumn('todo');}}>
                      <FontAwesomeIcon icon={ faPlus } />
                  </TouchableOpacity>
              </View>
            </View>
            <NestableDraggableFlatList
                data={todoData} 
                keyExtractor={(item) => item.key}
                onDragEnd={({ data }) => handleDragEnd({ data, nameColumn: 'todo' })}
                renderItem={renderItem}
            />


            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  Done
                </Text>
                <TouchableOpacity style={{...styles.editButton}} onPress={() => { setIsAddModalVisible(true); setColumn('done');}}>
                        <FontAwesomeIcon icon={ faPlus } />
                  </TouchableOpacity>
              </View>
            </View>
            <NestableDraggableFlatList
                data={doneData} 
                keyExtractor={(item) => item.key}
                onDragEnd={({ data }) => handleDragEnd({ data, nameColumn: 'done' })}
                renderItem={renderItem}
            />
        

            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  In Progress
                </Text>
                <TouchableOpacity style={{...styles.editButton}} onPress={() => { setIsAddModalVisible(true); setColumn('in progress');}}>
                      <FontAwesomeIcon icon={ faPlus } />
                  </TouchableOpacity>
              </View>
            </View>
            <NestableDraggableFlatList
                data={InProgressData} 
                keyExtractor={(item) => item.key}
                onDragEnd={({ data }) => handleDragEnd({ data, nameColumn: 'in progress' })}
                renderItem={renderItem}
            />
    
      </NestableScrollContainer>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2d3748',
    padding: 10,
    borderRadius: 5,
  },

  editButton: {
    padding: 10,
    borderRadius: 5,
  },
  containerRoot: {
    flex: 1,
    backgroundColor: "#808080 ",
  },

  container: {
    flex: 1,
    backgroundColor: "#808080 ",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingBottom: 10,
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EE',
  },

  section: {
    flex: 1,
    minHeight: 170,
  },

  card: {
    backgroundColor: "#808080",
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderWidth: 0.7,
  },
  
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d3748',
  },

  mainTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});