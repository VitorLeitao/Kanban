import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Label } from "@/components/ui/label"
import Column from "./column";
import { gql, useQuery } from "@apollo/client";
import { TASKS } from "@/app/gql/querys";

type TaskInterface = {
  id: string;
  index: number;
  title: string;
  date: string;
}

export default function KanbanPage() {

    const { loading, error, data } = useQuery(TASKS);
  
    const [TodoTask, setTodoTasks] = useState<TaskInterface[]>([]);
    const [DoneTasks, setDoneTasks] = useState<TaskInterface[]>([]);
    const [InProgressTasks, setInProgressTasks] = useState<TaskInterface[]>([]);

    useEffect(() => {
      if (data && data.getTasks) {
        const storedTodoTasks = localStorage.getItem('todoTasks');
        if (storedTodoTasks) {
          setTodoTasks(JSON.parse(storedTodoTasks));
        }else{
          const tasksArray = Object.values(data.getTasks).map((task: any) => ({
            id: task.id,
            index: task.index,
            title: task.title,
            date: task.date
          }));
          console.log(tasksArray)
          localStorage.setItem('todoTasks', JSON.stringify(tasksArray));
          setTodoTasks(tasksArray);
        }}

        const storedDoneTasks = localStorage.getItem('doneTasks');
        if (storedDoneTasks) {
          setDoneTasks(JSON.parse(storedDoneTasks));
        }else{
          localStorage.setItem('doneTasks', JSON.stringify([]));
          setDoneTasks([]);
        }

      const storedProgressTasks = localStorage.getItem('inProgressTasks');
      if (storedProgressTasks) {
        setInProgressTasks(JSON.parse(storedProgressTasks));
      }else{
        localStorage.setItem('inProgressTasks', JSON.stringify([]));
        setInProgressTasks([]);
      }
    }, [data]); 

    const handleDragEnd = async (result: any) => {
        const { destination, source, draggableId } = result;
        console.log(source, destination, draggableId);
        if (!destination || source.droppableId === destination.droppableId){

          console.log('entrei aqui', source, destination)
          if(destination.droppableId == "todo-column"){
            reorganizeIndexSameColumn(source.index, destination.index, TodoTask, "todo-column");
          }if(destination.droppableId == "done-column"){
            reorganizeIndexSameColumn(source.index, destination.index, DoneTasks, "done-column");
          }if(destination.droppableId == "in-progress-column"){
            reorganizeIndexSameColumn(source.index, destination.index, InProgressTasks, "in-progress-column");
          }
          return;
        }
        deletePreviousState(source.droppableId, draggableId);

        const task = await findItemById(draggableId, [...TodoTask, ...DoneTasks, ...InProgressTasks]);
        await setNewState(destination.droppableId, task, destination.index);
    };

    function deletePreviousState(sourceDroppableId: string, taskId: string) {
        switch (sourceDroppableId) {
            case "todo-column":
                const newArrayTodo = removeItemById(taskId, TodoTask)
                const arrayTodoRemoved = reorganizeRemoveIndexDiffColumn(newArrayTodo)
                setTodoTasks(arrayTodoRemoved);
                localStorage.setItem('todoTasks', JSON.stringify(arrayTodoRemoved));
                break;
            case "done-column":
                const newArrayDone = removeItemById(taskId, DoneTasks)
                const arrayDoneRemoved = reorganizeRemoveIndexDiffColumn(newArrayDone)
                setDoneTasks(arrayDoneRemoved);
                localStorage.setItem('doneTasks', JSON.stringify(arrayDoneRemoved));
                
                break;
            case "in-progress-column":
                const newArrayProgress = removeItemById(taskId, InProgressTasks)
                const arrayProgressRemoved = reorganizeRemoveIndexDiffColumn(newArrayProgress)
                setInProgressTasks(arrayProgressRemoved);
                localStorage.setItem('inProgressTasks', JSON.stringify(arrayProgressRemoved));
                break;
            default:
                break;
        }
    }

    function setNewState(destinationDroppableId: string, task: TaskInterface| undefined, newIndex: number) {
        if (!task) return; 
        let updatedTask: TaskInterface;
        switch (destinationDroppableId) {
            case "todo-column":  
                updatedTask = { ...task };
                const novaArrayTodo = reorganizeAddIndexDiffColumn(TodoTask, newIndex, updatedTask);
                setTodoTasks(novaArrayTodo);
                localStorage.setItem('todoTasks', JSON.stringify(novaArrayTodo));
                break;
            case "done-column": 
                updatedTask = { ...task};
                const novaArrayDone = reorganizeAddIndexDiffColumn(DoneTasks, newIndex, updatedTask);
                setDoneTasks(novaArrayDone);
                localStorage.setItem('doneTasks', JSON.stringify(novaArrayDone));
                break;
            case "in-progress-column":  
                updatedTask = { ...task };
                const novaArrayProgess = reorganizeAddIndexDiffColumn(InProgressTasks, newIndex, updatedTask);
                setInProgressTasks(novaArrayProgess);
                localStorage.setItem('inProgressTasks', JSON.stringify(novaArrayProgess));
                break;
            default:
                break;
        }
    }

    function findItemById(id: string | undefined, array: TaskInterface[] | undefined) {
        if(!array){return}
        return array.find((item) => item.id === id);
    }

    function removeItemById(id: string, array: TaskInterface[]) {
        return array.filter((item) => item.id !== id);
    }

    function reorganizeIndexSameColumn(oldIndex: number, newIndex: number, array: TaskInterface[], idArray: string){
      for (let i = 0; i < array.length; i++) {
          if(newIndex > oldIndex){
            if(i > oldIndex && i <= newIndex){
            array[i].index = array[i].index - 1;
          }
          }if(oldIndex > newIndex){
            if(i >= newIndex && i < oldIndex){
            array[i].index = array[i].index + 1;
          }}
          
      }
      array[oldIndex].index = newIndex;
      if(idArray === 'todo-column'){
        setTodoTasks(array.sort((a, b) => a.index - b.index));
        localStorage.setItem('todoTasks', JSON.stringify(array.sort((a, b) => a.index - b.index)));
      }if(idArray === 'done-column'){
        setDoneTasks(array.sort((a, b) => a.index - b.index));
        localStorage.setItem('doneTasks', JSON.stringify(array.sort((a, b) => a.index - b.index)));
      }if(idArray === 'in-progress-column'){
        setInProgressTasks(array.sort((a, b) => a.index - b.index));
        localStorage.setItem('inProgressTasks', JSON.stringify(array.sort((a, b) => a.index - b.index)));
      }
    }

    function reorganizeAddIndexDiffColumn(array: TaskInterface[], newIndex: number, newElement: TaskInterface){
      for (let i = 0; i < array.length; i++) {
          if(i >= newIndex){
            array[i].index = array[i].index + 1
          }
      }
      newElement.index = newIndex;
      array.push(newElement);
      array.sort((a, b) => a.index - b.index)
      return array
    }

    function reorganizeRemoveIndexDiffColumn(array: TaskInterface[]){
      for (let i = 0; i < array.length; i++) {
        array[i].index = i
      }
      array.sort((a, b) => a.index - b.index)
      console.log('dentro da função: ', array)
      return array
    }
    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="text-center pt-5">
              </div>
        
              <div className="flex justify-between items-center flex-row h-screen ">
                  <Column title={"TO DO"} tasks={TodoTask} id={"todo-column"} />
                  <Column title={"DONE"} tasks={DoneTasks} id={"done-column"} />
                  <Column title={"IN PROGRESS"} tasks={InProgressTasks} id={"in-progress-column"} />
              </div>
            </DragDropContext>
        </div>
    );
}
