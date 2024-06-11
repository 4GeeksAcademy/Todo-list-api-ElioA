import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const Home = (props) => {

	const navigate = useNavigate()
  
	
  const createYourList=()=>{
        fetch(`https://playground.4geeks.com/todo/users/${props.name}`, {
                method: "POST",
               body: JSON.stringify([]),
               headers: {"Content-Type": "application/json"}
               }).then(resp => {
                 return resp.json(); 
               }).then(data => {
                   console.log(data); 
               }).catch(error => {});

    } 
    
    const handleClick = () => {
      localStorage.setItem("name", props.name)
      createYourList()
      navigate("/list")
      }
    
	
	
	
		
	return (
		<div className="App">
 			<div className="card" id="myDiv" style={{marginTop:"20px"}}>
                <input className="form-control" id="myInput" type="text" placeholder='Put your name here and press Enter' value={props.name} name='text'
                    onChange={(e)=>props.setName(e.target.value)}></input>
                   
                
                {props.name !=="" ? <button id="myThirdButton" onClick={()=>{handleClick()}}>Go to your your list</button> : <button id="myThirdButton" onClick={()=>alert("please create your list")}>put a name</button>}

        </div>
 		</div>
	);
};

export default Home;