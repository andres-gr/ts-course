import React, {
  FC,
  useCallback,
  useState,
} from 'react'
import uniqueId from 'lodash/uniqueId'
import TodoList, { Item } from 'Components/TodoList'
import NewTodo from 'Components/NewTodo'

const Home: FC = () => {
  const [
    todos,
    setTodos,
  ] = useState<Item[]>([])

  const handleAddTodo = useCallback((text: string) => {
    setTodos(state => [
      ...state,
      {
        id: uniqueId('t'),
        text,
      },
    ])
  }, [])

  const handleDeleteTodo = useCallback((todoId: string) => {
    setTodos(state => state.filter(({ id }) => id !== todoId))
  }, [])

  return (
    <div className="App">
      <NewTodo submit={ handleAddTodo } />
      <TodoList
        deleteTodo={ handleDeleteTodo }
        items={ todos }
      />
    </div>
  )
}

export default Home
