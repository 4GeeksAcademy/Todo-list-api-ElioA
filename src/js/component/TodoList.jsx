import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";


const TodoList=()=>{
    
    const [name,setName]=useState("elio")
    const [todos,setTodos]=useState([])
    
    useEffect(()=>{   
        fetch('https://playground.4geeks.com/apis/fake/todos/user/elio', {
            method: "get",
           headers: {"Content-Type": "application/json"}
           }).then(resp => {
               console.log(resp.ok);
               console.log(resp.status);
             return resp.json(); 
           }).then(data => {
               console.log(data); 
               setTodos(data)
           }).catch(error => {
            fetch('https://playground.4geeks.com/apis/fake/todos/user/elio', {
                method: "POST",
               body: JSON.stringify([]),
               headers: {"Content-Type": "application/json"}
               }).then(resp => {
                 return resp.json(); 
               }).then(data => {
                    window.location.reload(false),
                   console.log(data); 
               }).catch(error => {});
           });}
       ,[])
   
  const addTodo= todo =>{
            if (!todo.label || /^\s*$/.test(todo.label)) {
            return;}
            const newTodos=[todo,...todos]
            setTodos(newTodos)

          fetch('https://playground.4geeks.com/apis/fake/todos/user/elio', {
             method: "PUT",
            body: JSON.stringify(newTodos),
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
        fetch('https://playground.4geeks.com/apis/fake/todos/user/elio', {
            method: "PUT",
           body: JSON.stringify(removeArr),
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
        fetch('https://playground.4geeks.com/apis/fake/todos/user/elio', {
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
        if(todos.length==0){return <p>Add a task to the List</p>}
        else {return <p>{todos.length} Tasks remain on the list</p>}
    
    }

return (
        <div className="card"  id="list">
                <button id="myButton" onClick={()=>{deleteList()
                window.location.reload(false)}}>Delete my list</button>
            <div className="card-header text-center">
                <h1 className="d-flex justify-content-center m-3">What are we doing today??</h1>
            </div>
            <TodoForm onSubmit={addTodo}/>
            <Todo todos={todos} removeTodo={removeTodo}/>
            <div className="card-footer" style={{marginTop:"10px", color:"white"}} >
                 {remainingTasks()}
            </div>
        </div>    
        );
}


export default TodoList