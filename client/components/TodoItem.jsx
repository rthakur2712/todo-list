import axios from 'axios';
import React, { useState } from 'react';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TodoItem = ({ todo, setTodos, loadingBar }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(todo.title);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const removeHandler = async () => {
    loadingBar.current.continuousStart();
    try {
      await axios.delete(`${BACKEND_URL}/todos/${todo._id}`);
      setTodos(prev => prev.filter(t => t._id !== todo._id));
    } catch (err) {
      console.error(err);
    }
    loadingBar.current.complete();
  };

  const statusHandler = async () => {
    loadingBar.current.continuousStart();
    try {
      await axios.put(`${BACKEND_URL}/todos/${todo._id}`);
      setTodos(prev =>
        prev.map(t => t._id === todo._id ? { ...t, completed: !t.completed } : t)
      );
    } catch (err) {
      console.error(err);
    }
    loadingBar.current.complete();
  };

  const submitEditHandler = async e => {
    e.preventDefault();
    setIsEditing(false);
    loadingBar.current.continuousStart();
    try {
      await axios.put(`${BACKEND_URL}/todos/${todo._id}`, { title: draftValue });
      setTodos(prev =>
        prev.map(t => t._id === todo._id ? { ...t, title: draftValue } : t)
      );
    } catch (err) {
      console.error(err);
    }
    loadingBar.current.complete();
  };

  return (
    <div className="bg-indigo-50 hover:bg-indigo-100 transition rounded-lg p-4 shadow-sm">
      {isEditing ? (
        <form onSubmit={submitEditHandler} className="flex space-x-2">
          <input
            className="flex-1 border border-indigo-200 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-300"
            type="text"
            value={draftValue}
            onChange={e => setDraftValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded px-4 py-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded px-4 py-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <button
                onClick={statusHandler}
                className={`mt-1 w-5 h-5 rounded border ${
                  todo.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-500'
                } flex items-center justify-center`}
              >
                {todo.completed && <CheckIcon className="w-4 h-4" />}
              </button>
              <div>
                <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.title}
                </h3>
                <p className="text-xs text-gray-500">
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-red-400">
                  Due: {new Date(todo.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                todo.completed
                  ? 'bg-green-200 text-green-800'
                  : 'bg-yellow-200 text-yellow-800'
              }`}
            >
              {todo.completed ? 'Done' : 'Pending'}
            </span>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
              title="Edit"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={removeHandler}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
              title="Delete"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(TodoItem);
