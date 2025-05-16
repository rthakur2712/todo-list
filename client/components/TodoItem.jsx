import axios from 'axios';
import React, { useRef } from 'react'

const TodoItem = ({todo,setTodos,loadingBar}) => {
  const BACKEND_URL = "http://localhost:3000";
  const removeHandler = async()=>{
    loadingBar.current.continuousStart();
    console.log("entered removehandler",todo._id);
    try{
      const res = await axios.delete(`${BACKEND_URL}/todos/${todo._id}`);
      console.log( "Successfully deleted todo" );
      setTodos((prev)=>prev.filter((task)=>task._id!=todo._id))
    } catch(err){
      console.log("Error while deleting the todo",err);
    }
    
    loadingBar.current.complete();
  }
  
  const statusHandler = async()=>{
    try{
      
      loadingBar.current.continuousStart();
      const res = await axios.put(`${BACKEND_URL}/todos/${todo._id}`);
      console.log("Successfully updated the status of this todo");
    }catch(err){
      console.log("error while changing todo status",err);
    }
    setTodos((prev)=>prev.map(task=>task._id===todo._id?{...task,completed:!task.completed}:task));
    
    loadingBar.current.complete();
  }
  return (
    <div>
      {/* {todo.title}
      {todo.createdAt}
      {todo.completed} */}
      <p>{todo.title}</p>
      <p>{todo.completed?"Completed":"Pending"}</p>
      <p>{todo.createdAt}</p>
      <button onClick={removeHandler} >Remove</button>
      <button onClick={statusHandler} >Completed</button>
    </div>
  )
}

export default TodoItem
