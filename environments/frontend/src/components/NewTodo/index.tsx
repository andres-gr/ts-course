import React, {
  FC,
  FormEvent,
  useCallback,
  useRef,
} from 'react'

interface NewTodoProps {
  submit: (text: string) => void
}

const NewTodo: FC<NewTodoProps> = ({ submit }) => {
  const textInput = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    const text = textInput.current!.value
    submit(text)
    textInput.current!.value = ''
  }, [submit])

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="todo-text">
          Todo Text
        </label>
        <input
          ref={ textInput }
          id="todo-text"
          type="text"
        />
      </div>
      <button type="submit">
        Add Todo
      </button>
    </form>
  )
}

export default NewTodo
