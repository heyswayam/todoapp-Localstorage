import { createContext, useContext } from "react";

export const todoContext = createContext({
    todos:[{
        id: 1,
        todoMsg: "hello",
        completed: false,
    }],
    addTodo: (msg)=>{},
    editTodo: (id,msg)=>{},
    deleteTodo: (id)=>{},
    toggleCompleted:(id)=>{}
});

export const TodoProvider = todoContext.Provider;

export default function useTodo (){
    return useContext(todoContext);
}


    
