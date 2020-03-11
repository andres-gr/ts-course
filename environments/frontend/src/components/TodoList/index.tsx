import React, { FC } from 'react'
import Item from './Item'

export interface Item {
  id: string
  text: string
}

interface TodoListProps {
  deleteTodo: (todoId: string) => void
  items: Item[]
}

const TodoList: FC<TodoListProps> = ({
  deleteTodo,
  items,
}) => (
  <ul>
    {
      items.map(({
        id,
        text,
      }) => (
        <Item
          key={ id }
          id={ id }
          text={ text }
          onClick={ deleteTodo }
        />
      ))
    }
  </ul>
)

export default TodoList
