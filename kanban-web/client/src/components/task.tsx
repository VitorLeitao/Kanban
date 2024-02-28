"use client";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Badge } from "@/components/ui/badge"
import { Label } from "@radix-ui/react-label";
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { useForm, Resolver } from "react-hook-form"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { VscEdit } from "react-icons/vsc";

type TaskInterface = {
    id: string;
    index: number;
    title: string;
    date: string;
  }

export let reload = false

const formSchema = z.object({
titleForm: z.string().min(2, {}),
})

export default function Task({ task, column }: { task: TaskInterface, column: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titleForm: task.title,
        },
      })
    
    function handleDelete(){

    }
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        let nameColumn = ""
        if (column === "TO DO") {
            nameColumn = 'todoTasks'
        } else if (column === "IN PROGRESS") {
            nameColumn = 'inProgressTasks'
        } else if (column === 'DONE') {
            nameColumn = 'doneTasks'
        }

        const tasksArray = localStorage.getItem(nameColumn)

        if(tasksArray){
            const tasksArrayJson = JSON.parse(tasksArray);
            console.log('Array logo antes do erro: ', tasksArrayJson)
            const element = tasksArrayJson.find((item: TaskInterface) => item.id === task.id)
            
            tasksArrayJson[element.index].title = values.titleForm
            localStorage.setItem(nameColumn, JSON.stringify(tasksArrayJson));
            task.title = values.titleForm
            
        }
    }

    return (
        <div><Draggable draggableId={task.id} key={task.id} index={task.index}>
        {(provided) => (
                <div className="text-center pb-1.5"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Badge className="w-35 h-9 flex items-center justify-center bg-gray-800 rounded-none">
                        <Label>{task.title}</Label>
                        <div className="ml-auto"> 
                            <AlertDialog>
                                <AlertDialogTrigger><VscEdit /></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Digite o nome da sua nova Task</AlertDialogTitle>
                                    <AlertDialogDescription>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit((values) => onSubmit(values))} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="titleForm"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                                
                                                <div className="flex items-center justify-center"><AlertDialogAction><Button type="submit">Concluir alterações</Button></AlertDialogAction></div>
                                        
                                            </form>
                                            </Form>
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                </AlertDialogContent>
                        </AlertDialog>
                        </div>
                    </Badge>
                </div>
            )}
    </Draggable></div>
    
)};