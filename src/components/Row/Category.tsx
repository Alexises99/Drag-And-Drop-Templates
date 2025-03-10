import { PencilIcon } from '@assets/icons'
import { useRef, useState } from 'react'

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
    inputRef.current?.focus()
  }

  return (
    <div className="flex items-center gap-3">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={({ target: { value } }) => handleChangeName(id, value)}
          className="border-medium-gray rounded-lg border-1 bg-white px-2 py-1 outline-0"
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <h3 className="flex items-center gap-3" onClick={handleClickEdit}>
          {name}
          <PencilIcon className="text-dark-gray" />
        </h3>
      )}
    </div>
  )
}
