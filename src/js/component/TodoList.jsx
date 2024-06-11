import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useNavigate } from "react-router";


const TodoList=({name})=>{
    
    const [todos,setTodos]=useState([])
    const [newTodo, setNewTodo] = useState([])
    const navigate=useNavigate()

    
    
    
    const clearInput=()=>{
        setInput("")
    }
    
    const storageName = localStorage.getItem("name")
   
    useEffect(()=>{
       setTimeout(() => {
         fetch(`https://playground.4geeks.com/todo/users/${storageName}`, {
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
        console.log(newTodo)
        const newTodos=[todo,...todos]
        setTodos(newTodos)
        

      fetch(`https://playground.4geeks.com/todo/todos/${storageName}`, {
         method: "POST",
        body: JSON.stringify(todo),
        headers: {"Content-Type": "application/json"}
        }).then(resp => {
            console.log(resp.ok);
            console.log(resp.status);
          return resp.json(); 
        }).then(data => {
            console.log(data);
            setNewTodo(data)
        }).catch(error => {
            console.log(error);
        });
        setTimeout(()=>{
            window.location.reload(false)
        },500)
        
       
            
        

    }

    const removeTodo = async (id) => {
        
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data;                                      
            const text = await response.text();           
            if (text) {
                data = JSON.parse(text);      
            } 
            console.log(data);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));         
        } catch (error) {
            console.log('There was a problem with the fetch operation:', error);
        }
    };

    
    const deleteList= async ()=>{
        
           try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/${storageName}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data;                                      
            const text = await response.text();           
            if (text) {
                data = JSON.parse(text);      
            }         
        } catch (error) {
            console.log('There was a problem with the fetch operation:', error);
        }
        }
    


    const remainingTasks=()=>{
        if(name===""){return <p>Add your name please</p>}
        if(todos.length==0){return <p>Add a task to the List, we need at least one task</p>}
        else {return <p>{todos.length} Tasks remain on the list</p>}
    
    }

    const handleClick =()=>{
        deleteList()
        navigate("/")  
    }

return (
<>

        <div className="card list"  id="list">
            <div className="card-header text-center">
                <h1 className="d-flex justify-content-center m-3">What are we doing today??</h1>
                <button id="myButton" onClick={()=>{handleClick()}}>Delete my list</button>
            </div>
                <TodoForm onSubmit={addTodo}/>
                {storageName !== "" ? <Todo todos={todos} removeTodo={removeTodo}/> : navigate("/")}
            <div className="card-footer" style={{marginTop:"10px", color:"white"}} >
                 {remainingTasks()}
            </div>
        </div>
      
</>
        );
}


export default TodoList