import axios from 'axios';
import React, { useState } from 'react';

const TodoItem = ({ todo, setTodos, loadingBar }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState('');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const removeHandler = async () => {
    loadingBar.current.continuousStart();
    try {
      await axios.delete(`${BACKEND_URL}/todos/${todo._id}`);
      setTodos(prev => prev.filter(task => task._id !== todo._id));
    } catch (err) {
      console.error("Error while deleting the todo", err);
    }
    loadingBar.current.complete();
  };

  const statusHandler = async () => {
    loadingBar.current.continuousStart();
    console.log("Entered the status handler");
    try {
      await axios.put(`${BACKEND_URL}/todos/${todo._id}`);
      console.log("Before setTodos");
      setTodos(prev =>
        prev.map(task =>
          task._id === todo._id
          ? { ...task, completed: !task.completed }
          : task
        )
      );
      console.log("After setTodos");
    } catch (err) {
      console.error("Error while toggling status", err);
    }
    loadingBar.current.complete();
  };

  const clickEditHandler = () => {
    setIsEditing(true);
    setDraftValue(todo.title);
  };

  const submitEditHandler = async e => {
    e.preventDefault();
    setIsEditing(false);
    loadingBar.current.continuousStart();
    try {
      await axios.put(`${BACKEND_URL}/todos/${todo._id}`, { title: draftValue });
      setTodos(prev =>
        prev.map(t =>
          t._id === todo._id ? { ...t, title: draftValue } : t
        )
      );
    } catch (err) {
      console.error("Error in editing todo", err);
    }
    loadingBar.current.complete();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-3">
      {isEditing ? (
        <form onSubmit={submitEditHandler} className="flex flex-col space-y-2">
          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            type="text"
            value={draftValue}
            onChange={e => setDraftValue(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded px-4 py-2 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded px-4 py-2 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
          <p className="text-sm text-gray-500">
            Created at:
            {new Date(todo.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-red-400">
            Deadline:
            {new Date(todo.deadline).toLocaleString()}
          </p>
          <span
            className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
              todo.completed
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {todo.completed ? 'Completed' : 'Pending'}
          </span>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={removeHandler}
              className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded px-3 py-1 transition"
            >
              Remove
            </button>
            <button
              onClick={statusHandler}
              className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded px-3 py-1 transition"
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={clickEditHandler}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded px-3 py-1 transition"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TodoItem);
