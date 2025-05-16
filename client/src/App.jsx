import { useEffect, useState } from 'react'
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import { useRef } from 'react';

function App() {
  const BACKEND_URL = process.env.BACKEND_URL;
  const [todos, setTodos] = useState([]);
  const loadingBar = useRef(null);

  useEffect(()=>{
    const fetchData = async()=>{
      loadingBar.current.continuousStart();
      try{
        const res = await axios.get(`${BACKEND_URL}/todos`);
        const result = res.data;
        setTodos(result);
      }catch(err){
        console.log("Error fetching todos:",err);
      }
      loadingBar.current.complete();
    }
    fetchData();
  },[])
  
  
  return (
    <>
      <LoadingBar color="#f11946" ref={loadingBar} />
      <AddTodo todos={todos} setTodos = {setTodos} loadingBar = {loadingBar} />
      <TodoList todos = {todos} setTodos = {setTodos} loadingBar = {loadingBar} />
    </>
  )
}


export default App
