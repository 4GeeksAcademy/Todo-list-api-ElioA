import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useNavigate } from "react-router";


const TodoList=({name})=>{
    
    const [todos,setTodos]=useState([])
    const navigate=useNavigate()

    const clearInput=()=>{
        setInput("")
    }
    
   
    useEffect(()=>{
       setTimeout(() => {
         fetch(`https://playground.4geeks.com/todo/users/${name}`, {
                    method: "GET",
                   headers: {"Content-Type": "application/json"}
                   }).then(resp => {
                       console.log(resp.ok);
                       console.log(resp.status);
                     return resp.json(); 
                   }).then(data => {
                       console.log(data.todos); 
                       setTodos(data.todos)
                   }).catch(error => {});}, 500)
    },[])

   
  const addTodo= todo =>{
    
    if (!todo.label || /^\s*$/.test(todo.label)) {
        return;}
        const newTodos=[todo,...todos]
        const todoList=newTodos
        setTodos(todoList)
        console.log(todoList);
      fetch(`https://playground.4geeks.com/todo/todos/${name}`, {
         method: "POST",
        body: JSON.stringify(todo),
        headers: {"Content-Type": "application/json"}
        }).then(resp => {
            console.log(resp.ok);
            console.log(resp.status);
          return resp.json(); 
        }).then(data => {
            console.log(data); 
        }).catch(error => {
            console.log(error);
        });
    }

    const removeTodo=id=>{
        
        const removeArr = [...todos].filter(todo=> todo.id !== id);
        setTodos(removeArr)
        
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
           headers: {"Content-Type": "application/json"}
           }).then(resp => {
            return resp.json();
           }).then(data => {
               console.log(data); 
           }).catch(error => {
               console.log(error);
           });
    }

    
    const deleteList=()=>{
        fetch(`https://playground.4geeks.com/todo/users/${name}`, {
            method: "delete",
           headers: {"Content-Type": "application/json"}
           }).then(resp => {
             return resp.json(); 
           }).then(data => {
               console.log(data); 
           }).catch(error => {
               console.log(error);
           });
        }
    


    const remainingTasks=()=>{
        if(name===""){return <p>Add your name please</p>}
        if(todos.length==0){return <p>Add a task to the List, we need at least one task</p>}
        else {return <p>{todos.length} Tasks remain on the list</p>}
    
    }

return (
<>
      
        <div className="card list"  id="list">
            <div className="card-header text-center">
                <h1 className="d-flex justify-content-center m-3">What are we doing today??</h1>
                <button id="myButton" onClick={()=>{deleteList() 
                   navigate("/")
                   window.location.reload(false)
                    }}>Delete my list</button>
            </div>
                <TodoForm onSubmit={addTodo}/>
                {name!=="" ? <Todo todos={todos} removeTodo={removeTodo}/> : navigate("/")} 
            <div className="card-footer" style={{marginTop:"10px", color:"white"}} >
                 {remainingTasks()}
            </div>
        </div>
      
</>
        );
}


export default TodoList