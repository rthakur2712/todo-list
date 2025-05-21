import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos, loadingBar, emptyMessage }) => {
  return (
    <>
      {todos.length === 0 ? (
        <p className="mt-4 text-center text-gray-400 italic">{emptyMessage}</p>
      ) : (
        <ul className="space-y-4 overflow-auto">
          {todos.map(todo => (
            <li key={todo._id}>
              <TodoItem
                todo={todo}
                setTodos={setTodos}
                loadingBar={loadingBar}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default React.memo(TodoList);
