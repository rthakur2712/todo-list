import { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import quotes from './assets/quotes.json'

function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [todos, setTodos] = useState([]);
  const [quote, setQuote] = useState('Loading a quote...');
  const loadingBar = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      loadingBar.current.continuousStart();
      try {
        console.log(quotes);
        console.log(quotes[Math.reandom])
        const quotee = quotes[Math.floor(Math.random()*quotes.length)].quote;
        setQuote(quotee);
      } catch {
        setQuote('Could not load quote');
      }
      try {
        const { data } = await axios.get(`${BACKEND_URL}/todos`);
        setTodos(data);
      } catch (err) {
        console.error('Error fetching todos:', err);
      }
      loadingBar.current.complete();
    };
    fetchData();
  }, []);

  const activeTodos    = useMemo(() => todos.filter(t => !t.completed && new Date(t.deadline) >= new Date()), [todos]);
  const backlogTodos   = useMemo(() => todos.filter(t => !t.completed && new Date(t.deadline) <  new Date()), [todos]);
  const completedTodos = useMemo(() => todos.filter(t =>  t.completed), [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <LoadingBar color="#6366f1" height={4} ref={loadingBar} />

      {/* Hero Quote */}
      <header className="bg-white/80 backdrop-blur-sm py-12 shadow-md">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-xl md:text-3xl font-extrabold text-indigo-600">
            “{quote}”
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Add Todo Form */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <AddTodo todos={todos} setTodos={setTodos} loadingBar={loadingBar} />
        </section>

        {/* Todo Lists Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeTodos.length>0 && 
          <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Active</h2>
            <TodoList
              todos={activeTodos}
              setTodos={setTodos}
              loadingBar={loadingBar}
              emptyMessage="No active tasks!"
              />
          </div>
          }
          {
            completedTodos.length>0 &&
          <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Completed</h2>
            <TodoList
              todos={completedTodos}
              setTodos={setTodos}
              loadingBar={loadingBar}
              emptyMessage="Nothing done yet!"
              />
          </div>
          }
          {
            backlogTodos.length>0 &&
          <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Backlog</h2>
            <TodoList
              todos={backlogTodos}
              setTodos={setTodos}
              loadingBar={loadingBar}
              emptyMessage="No overdue tasks!"
              />
          </div>
          }
        </section>
      </main>
    </div>
  );
}

export default App;
