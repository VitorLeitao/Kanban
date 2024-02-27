"use client";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label";

type TaskInterface = {
    id: string;
    index: number;
    title: string;
    date: string;
  }


export default function Column({ title, tasks , id}: {title: string, tasks: TaskInterface[] , id: string}) {
    let color = "";
    if (title === "TO DO") {
        color = "bg-red-200";
    } else if (title === "IN PROGRESS") {
        color = "bg-yellow-200";
    } else if (title === 'DONE') {
        color = "bg-blue-200";
    }   
    return (
        <div className="flex flex-col h-screen">
            <div className={`flex justify-center items-center h-[10%] w-[100%] ${color}`}><Label className="text-2xl text-center font-semibold">{title}</Label></div>
            <Droppable droppableId={id}>   
                {(provided, snapshot) => (
                    <ScrollArea className="h-[400px] w-[400px] rounded-md border ">
                    <div className="p-3 transition duration-200 ease-in bg-gray-100 flex-grow w-[400px] h-[400px] rounded w-full"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >

                    {tasks.map((task) => (
                        <Task key={task.index} task={task} />
                    ))}

                    {provided.placeholder}
                    
                    
                </div>
                </ScrollArea>
                )}
            </Droppable></div>   
    );
}