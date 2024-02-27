"use client";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Badge } from "@/components/ui/badge"
import { Label } from "@radix-ui/react-label";

type TaskInterface = {
    id: string;
    index: number;
    title: string;
    date: string;
  }

export default function Task({ task }: { task: TaskInterface }) {
    return (
        <div><Draggable draggableId={task.id} key={task.id} index={task.index}>
        {(provided) => (
                <div className="text-center pb-1.5"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Badge className="w-35 h-9 flex items-center justify-center bg-gray-800 rounded-none"><Label>{task.title}</Label></Badge>
                </div>
            )}
    </Draggable></div>
    
)};