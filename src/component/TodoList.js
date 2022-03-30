import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({todos, author}) {  
  return (
    <ul>
      {todos.map(item => <TodoItem key={item.id} {...item} author={author} />)}
    </ul>
  )
}