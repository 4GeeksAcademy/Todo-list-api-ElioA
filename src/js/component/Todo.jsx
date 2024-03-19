import React, {useState} from 'react'
import TodoForm from './TodoForm'

function Todo({todos, completeTodo, removeTodo}) {
   
    const[edit,setEdit]=useState({
        id:null,
        value:""
    })


    return todos.map((todo,index)=> (
        <div  id="myTodo" className="todo-row" key={index}>
            <div key={todo.id}>
                {todo.label}
                <span className="rounded" onClick={()=>removeTodo(todo.id)}><i className="fas fa-trash"></i></span>
            </div>
            
        </div>
    ))

  
}

export default Todo
