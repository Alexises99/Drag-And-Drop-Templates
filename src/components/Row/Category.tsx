import { PencilIcon } from '@assets/icons'
import { useRef, useState, type KeyboardEvent } from 'react'

interface CategoryProps {
  name: string
  id: number
  handleChangeName: (id: number, name: string) => void
}

export default function Category({
  id,
  name,
  handleChangeName
}: CategoryProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClickEdit = () => {
    setIsEditing(true)
    requestAnimationFrame(() => inputRef.current?.select())
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    } else if (e.key === 'Escape') {
      inputRef.current!.value = name
      setIsEditing(false)
    }
  }

  return isEditing ? (
    <div className="h-fit max-w-80 min-w-0 flex-1">
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={({ target: { value } }) => handleChangeName(id, value)}
        onKeyDown={handleKeyDown}
        className="border-medium-gray w-full rounded-lg border-1 bg-white px-2 py-1 outline-0"
        onBlur={() => setIsEditing(false)}
      />
    </div>
  ) : (
    <div
      className="flex h-fit gap-3"
      onClick={handleClickEdit}
      data-testid="change-category-name"
    >
      <h3>{name}</h3>
      <PencilIcon className="text-dark-gray" />
    </div>
  )
}
