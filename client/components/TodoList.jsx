import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({todos, setTodos,loadingBar}) => {
  return (
    <div>
      {todos.map(todo=>(
        <TodoItem key={todo._id} todo = {todo} setTodos = {setTodos} loadingBar = {loadingBar} />
      ))}
    </div>
  )
}

export default TodoList
