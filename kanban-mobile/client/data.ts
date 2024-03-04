
interface TaskItem {
    key: string;
    content: string;
  }

export const todoDataMock = <TaskItem[]>([
    {
      key: "1",
      content: "Conectar com Graphql",
    },
    {
      key: "2",
      content: "Adicionar opções de CRUD",
    },
  ]);

export const doneDataMock= <TaskItem[]>([
    {
      key: "3",
      content: "Knaban Web",
    },
  ]);

export const InProgressDataMock = <TaskItem[]>([
    {
      key: "4",
      content: "KanBan Mobile",
    },
    {
      key: "5",
      content: "Projetao",
    },
  ]);