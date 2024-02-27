// Defina o tipo TaskInterface
type TaskInterface = {
    userId: number;
    id: string;
    index: number;
    title: string;
    completed: boolean;
  }
  
  // Defina as tarefas em três arrays
  export const todoTasks: TaskInterface[] = [
    {
      userId: 1,
      id: '1',
      index: 0,
      title: "Task 1 - To Do",
      completed: false
    },
    {
      userId: 1,
      id: '2',
      index: 1,
      title: "Task 2 - To Do",
      completed: false
    },
    {
      userId: 1,
      id: '3',
      index: 2,
      title: "Task 3 - To Do",
      completed: false
    },
  ];
  
  export const doneTasks: TaskInterface[] = [
    {
      userId: 1,
      id: '4',
      index: 0,
      title: "Task 4 - Done",
      completed: true
    },
    {
      userId: 1,
      id: '5',
      index: 1,
      title: "Task 5 - Done",
      completed: true
    },
    {
      userId: 1,
      id: '6',
      index: 2,
      title: "Task 6 - Done",
      completed: true
    },
    // Adicione mais tarefas aqui se necessário
  ];
  
  export const inProgressTasks: TaskInterface[] = [
    {
      userId: 1,
      id: '7',
      index: 0,
      title: "Task 7 - In Progress",
      completed: false
    },
    {
      userId: 1,
      id: '8',
      index: 1,
      title: "Task 8 - In Progress",
      completed: false
    },
    {
      userId: 1,
      id: '9',
      index: 2,
      title: "Task 9 - In Progress",
      completed: false
    },
    // Adicione mais tarefas aqui se necessário
  ];
  
// localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
// localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
// localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks));




