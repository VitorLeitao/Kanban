"use client";
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createRoot } from "react-dom/client"; 
import client from '../gql/apolloClient';
import BarChart from '@/components/barChart';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import LineChart from '@/components/lineChart';
import { Label } from '@radix-ui/react-label';

function dash() {
  const sizeTodoTasks = getTasksLength('todoTasks');
  const sizeDoneTasks = getTasksLength('doneTasks');
  const sizeProgressTasks = getTasksLength('inProgressTasks');

  const doneTasksString = localStorage.getItem('doneTasks');
  const doneTasks = doneTasksString ? JSON.parse(doneTasksString) : [];
  const data = doneTasks.reduce((accumulator: { [date: string]: number }, task: { date: string }) => {
    const date = task.date;
    accumulator[date] = (accumulator[date] || 0) + 1; 
    return accumulator;
  }, {});
  const dataArray = Object.keys(data).map(date => ({ date, number: data[date] }));

  return (
    <ApolloProvider client={client}>
      <div className='justify-center items-center bg-gray-100 h-screen'>
        
        <div className=' h-[40%] bg-gray-100'>
          
          <div className='flex justify-center items-center'>
          <BarChart numberToDo={sizeTodoTasks} numberDone={sizeDoneTasks} numberInProgress={sizeProgressTasks}/>

          <Label>O gráfico de barras utilizado aqui é uma representação visual que ilustra o progresso das tarefas em um contexto específico. Composto por três colunas distintas, cada uma representa uma etapa do fluxo de trabalho: TODO, DONE e IN PROGRESS. O número de tarefas associadas a cada estágio é refletido pela altura das barras correspondentes. Essa representação simplificada permite uma rápida avaliação do status geral das tarefas, identificando facilmente quantas estão pendentes, concluídas ou em andamento..</Label>
          </div>
        </div>

        
        <div className=' h-[40%] bg-gray-100'>
        
        <div className='flex justify-center items-center'>
          <Label>O gráfico de linha apresentado é uma representação visual que exibe a evolução dos dados ao longo do tempo. Composto por uma linha contínua que conecta pontos de dados, ele fornece uma maneira eficaz de acompanhar tendências e variações ao longo de uma série temporal. Neste contexto específico, os dados são representados por pares de valores: datas no eixo horizontal e números no eixo vertical. Cada ponto no gráfico corresponde a um ponto de dados específico, onde a posição vertical indica o valor associado a essa data. Essa visualização simplificada permite uma análise rápida e intuitiva da evolução dos números ao longo do tempo, identificando padrões e anomalias com facilidade.</Label>
          <LineChart data={dataArray} />
        </div>
        </div>
      </div>
      
    </ApolloProvider>
  );
}

function getTasksLength(key: string): number {
  const tasksString = localStorage.getItem(key);
  return tasksString ? JSON.parse(tasksString).length : 0;
}


export default dash; 