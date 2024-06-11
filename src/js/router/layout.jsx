import React, { useState } from 'react'



import Home from "../component/home"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from '../component/TodoList';



function Layout() {

    const [name, setName]=useState("")
    
  
    return (
    <div>
     <BrowserRouter>
        <Routes>
            <Route element={<Home setName={setName} name={name}/>} path='/'/>
            <Route element={<TodoList name={name}/>} path="/list"/>
            <Route element={<h1>404 Page not found</h1>} path='/*'/>
        </Routes>
     </BrowserRouter>
    </div>
  )
}

export default Layout;
