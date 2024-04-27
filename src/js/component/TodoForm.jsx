import React, {useState} from 'react'
import Todo from './Todo';

function TodoForm(props) {
  
  
  const [input,setInput]=useState("");

  const handleChange=e=>{
    setInput(e.target.value)
  }
  
  
  const handleSubmit= e =>{
    e.preventDefault();

    props.onSubmit({
       id:Math.floor(Math.random()*10000),
       label: input[0].toUpperCase()+input.slice(1),
       is_done: false
       })
       setInput("")
  };

  
  
    return (
    <form className="todo-form d-flex justify-content-center" onSubmit={handleSubmit}>
        <input className="form-control todo-input" type="text" placeholder='add a todo' value={input} name='text' onChange={handleChange}></input>
        <button className='todo-button'>add todo</button>
    </form>
  )
}

export default TodoForm
