import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";


const TodoList=()=>{
    
    const [name,setName]=useState("")
    const [todos,setTodos]=useState([])

    const clearInput=()=>{
        setInput("")
    }
    

    
    const getYourList=()=>{
        setTimeout(() => {
        fetch(`https://playground.4geeks.com/todo/users/${name}`, {
                    method: "get",
                   headers: {"Content-Type": "application/json"}
                   }).then(resp => {
                       console.log(resp.ok);
                       console.log(resp.status);
                     return resp.json(); 
                   }).then(data => {
                       console.log(data); 
                       setTodos(data.todos)
                       console.log(todos)
                   }).catch(error => {});},1000)
               }

    const createYourList=()=>{
        fetch(`https://playground.4geeks.com/todo/users/${name}`, {
                method: "POST",
               body: JSON.stringify([]),
               headers: {"Content-Type": "application/json"}
               }).then(resp => {
                 return resp.json(); 
               }).then(data => {
                   console.log(data); 
               }).catch(error => {});

    }   
   
  const addTodo= todo =>{
            if (!todo.label || /^\s*$/.test(todo.label)) {
            return;}
            const newTodos=[todo,...todos]
            const todoList=newTodos
            setTodos(todoList)
            const newList={"name" : name, "todos" : todoList}
            console.log(newList)
          fetch(`https://playground.4geeks.com/todo/users/${name}`, {
             method: "PUT",
            body: JSON.stringify(newList),
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
        fetch(`https://playground.4geeks.com/todo/users/${name}`, {
            method: "PUT",
           body: JSON.stringify({"name":name, "todos": removeArr}),
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
        <div className="card" id="myDiv" style={{marginTop:"20px"}}>
                <input className="form-control" id="myInput" type="text" placeholder='Put your name here and press Enter' value={name} name='text'
                    onChange={(e)=>{setName(e.target.value)
                    if(name===""){setTodos([])}}} 
                    onKeyDown={(e)=>{if(e.key==="Enter" && name!==""){setTodos([])
                        createYourList()
                        getYourList()}}}></input>
                <button id="myButton" onClick={()=>{deleteList()
                    setTodos([])
                    setName("")
                    }}>Delete my list</button>
        </div>
        <div className="card list"  id="list">
            <div className="card-header text-center">
                <h1 className="d-flex justify-content-center m-3">What are we doing today??</h1>
            </div>
            {name !=="" ? <TodoForm onSubmit={addTodo}/> : <TodoForm/>}
            {name !=="" ? <Todo todos={todos} removeTodo={removeTodo}/> : <div></div>}
            <div className="card-footer" style={{marginTop:"10px", color:"white"}} >
                 {remainingTasks()}
            </div>
        </div>
      
</>
        );
}


export default TodoList