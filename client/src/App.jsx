import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';


function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [backlogTodos, setBacklogTodos] = useState([]);
  const [quote,setQuote] = useState("Loading a quote...");
  const loadingBar = useRef(null);
  const ai = import.meta.env.VITE_GEMINI_API_KEY;
  const prompt = "Generate a random quote which questions life and makes people go into deep thinking";

  useEffect(() => {
    const fetchData = async () => {
      loadingBar.current.continuousStart();
      // getting the quote
      try {
        const res = await axios.get(`${BACKEND_URL}/generate-quote`);
        setQuote(res.data.quote);
      } catch (err) {
        console.error("Error generating quote:", err);
        setQuote("Could not load quote");
      }
      //getting the todos
      try {
        const res = await axios.get(`${BACKEND_URL}/todos`);
        // how to classify them into 3 groups active_todos, completed_todos, backlog_todos
        const list = res.data;
        const active=[];
        const completed=[];
        const backlog=[];
        for (const todo of list) {
          const deadlineMs = new Date(todo.deadline).getTime();
          console.log("todo showing: ",todo);
        if (todo.completed) {
          completed.push(todo);
        } else if (deadlineMs < Date.now()) {
          backlog.push(todo);
        } else {
          active.push(todo);
        }
      }
        setTodos(list);
        setActiveTodos(active);
        setCompletedTodos(completed);
        setBacklogTodos(backlog);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
      loadingBar.current.complete();
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-lg p-6 bg-gray-50 min-h-screen">
      {/* Loading Bar */}
      <LoadingBar color="#f11946" ref={loadingBar} />

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-8">
        {quote}
      </h1>

      {/* Add Todo Form */}
      <div className="mb-6">
        <AddTodo todos={todos} setTodos={setTodos} loadingBar={loadingBar} />
      </div>

      {/* Todo Items */}
      <div className="space-y-4">
        <TodoList todos={activeTodos} setTodos={setActiveTodos} loadingBar={loadingBar} heading = "Active Todos" />
        <TodoList todos={completedTodos} setTodos={setCompletedTodos} loadingBar={loadingBar} heading = "Completed Todos" />
        <TodoList todos={backlogTodos} setTodos={setBacklogTodos} loadingBar={loadingBar} heading = "Backlog Todos" />
      </div>
    </div>
  );
}

export default App;
