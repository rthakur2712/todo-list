import axios from 'axios';
import React, { useRef, useState } from 'react'

const AddTodo = ({setTodos,loadingBar})=>{

  const BACKEND_URL = "http://localhost:3000";
  const [inputValue, setInputValue] = useState('');
  const submitHandler = async(e)=>{
    // call the add todo functionality
    loadingBar.current.continuousStart();
    e.preventDefault();
    try{
      const res = await axios.post(`${BACKEND_URL}/todos`,{
        title : inputValue
      });
      setTodos((prev)=>[...prev, res.data]);
      setInputValue('');
      console.log("Successfully posted todo",res.data);
    } catch(err){
      console.log("Unable to post todo",err);
    }
    loadingBar.current.complete();
  }
  return(
    <form onSubmit={submitHandler} >
      <input type='text' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} ></input>
      <button type='submit' >Submit</button>
    </form>
  )
}


export default AddTodo
