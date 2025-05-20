import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos, loadingBar, heading }) => {
  return (
    <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {heading}
      </h2>
      <div className="space-y-4">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            setTodos={setTodos}
            loadingBar={loadingBar}
          />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No todos yet—add your first task above!
        </p>
      )}
    </section>
  );
};

export default React.memo(TodoList);
