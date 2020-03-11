import React, { FC } from 'react'

interface ItemProps {
  id: string
  onClick: (todoId: string) => void
  text: string
}

const Item: FC<ItemProps> = ({
  id,
  onClick,
  text,
}) => {
  const handleDelete = () => onClick(id)

  return (
    <li>
      <span>{ text }</span>
      <button
        type="button"
        onClick={ handleDelete }
      >
        Delete
      </button>
    </li>
  )
}

export default Item
