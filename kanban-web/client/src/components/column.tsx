"use client";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";
import { ScrollArea } from "@/components/ui/scroll-area"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { VscAdd } from "react-icons/vsc";
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Label } from "@radix-ui/react-label";
import { useForm, Resolver } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type TaskInterface = {
    id: string;
    index: number;
    title: string;
    date: string;
  }

  const formSchema = z.object({
    titleForm: z.string().min(2, {}),
  })


export default function Column({ title, tasks , id}: {title: string, tasks: TaskInterface[] , id: string}) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titleForm: "",
        },
      })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        let nameColumn = ""
        if (title === "TO DO") {
            nameColumn = 'todoTasks'
        } else if (title === "IN PROGRESS") {
            nameColumn = 'inProgressTasks'
        } else if (title === 'DONE') {
            nameColumn = 'doneTasks'
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const storedId: string | null = localStorage.getItem('ultimoId');

        const tasksArray = localStorage.getItem(nameColumn)

        console.log('id: ', storedId )
        console.log('array: ', tasksArray , 'name: ', nameColumn)
        if(storedId && tasksArray){
            const tasksArrayJson = JSON.parse(tasksArray);
            let newIndex =  0
            if(tasksArrayJson.length != 0){
                newIndex = tasksArrayJson[tasksArrayJson.length -1].index + 1
            }
            const newTask: TaskInterface = {id: storedId, index: newIndex, title: values.titleForm, date: `${day}/${month}/${year}`}; 

            const newId: number = parseInt(storedId, 10);
            const newIdString = (newId + 1).toString();
            localStorage.setItem('ultimoId', newIdString);
            
            tasks.push(newTask)
            localStorage.setItem(nameColumn, JSON.stringify(tasks));
        }else{
            console.log('id invalido')
        }
    }

    let color = "";
    if (title === "TO DO") {
        color = "bg-red-200";
    } else if (title === "IN PROGRESS") {
        color = "bg-yellow-200";
    } else if (title === 'DONE') {
        color = "bg-blue-200";
    }   
    return (
        <div className="flex flex-col h-screen w-screnn">
            <div className={`flex justify-center items-center h-[10%] w-[100%] ${color}`}>
            <div className="">
                    <Label className="text-2xl text-center font-semibold pl-2">{title}</Label>
            </div>
                <div className="ml-auto pr-3">
                <AlertDialog>
                    <AlertDialogTrigger><VscAdd></VscAdd></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Digite o nome de sua task?</AlertDialogTitle>
                        <AlertDialogDescription>
                        <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                    
                                    <div className="flex items-center justify-center">
                                        <AlertDialogAction><Button type="submit">Criar</Button></AlertDialogAction>
                                    </div>
                                    
                                </form>
                                </Form>
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
                </div>

            </div>
            <Droppable droppableId={id}>   
                {(provided, snapshot) => (
                    <ScrollArea className="h-[1/2] w-[400px] rounded-md border ">
                    <div className="p-3 transition duration-200 ease-in bg-gray-100 flex-grow h-[1/2] rounded w-full"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >

                    {tasks.map((task) => (
                        <Task key={task.index} task={task} column={title}/>
                    ))}

                    {provided.placeholder}
                    
                    
                </div>
                </ScrollArea>
                )}
            </Droppable></div>   
    );
}