import axios from 'axios';
import React, { useRef, useState } from 'react'

const TodoItem = ({todo,setTodos,loadingBar}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

  const clickEditHandler = ()=>{
    setIsEditing(true);
    setDraftValue(todo.title);
  }
  const submitEditHandler = async()=>{
    setIsEditing(false);
    // call the api
    try{
      const res = await axios.post(`${BACKEND_URL}/todos/${todo._id}/edit`,{
        newTodoTitle : draftValue
      })
      // how to update on frontend, we have no idea for that
    } catch(err){
      console.log("error in editing todo",err);
    }
    setTodos((prev)=>prev.map(t=>t._id===todo._id?{...t,title:draftValue}:t));
  }
  return (
    <div>
      {isEditing?
        <div>
          <form onSubmit={submitEditHandler}>
            <input type='text' value={draftValue} onChange={(e)=>setDraftValue(e.target.value)} ></input>
            <button type='submit' >Save</button>
            <button onClick={()=>setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      :
        <div>
          <p>{todo.title}</p>
          <p>{todo.completed?"Completed":"Pending"}</p>
          <p>{todo.createdAt}</p>
          <button onClick={removeHandler} >Remove</button>
          <button onClick={statusHandler} >Completed</button>
          <button onClick={clickEditHandler} >Edit</button>
        </div>
      }
    </div>
  )
}

export default TodoItem
