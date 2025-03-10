import { createContext, PropsWithChildren, useState } from 'react'
import { Row } from '../types'
import { jeans } from '@data/jeans'
import { arrayMove } from '@dnd-kit/sortable'
import { ClientRect, UniqueIdentifier } from '@dnd-kit/core'
import dragDropUtils from '@utils/drag-drop'

interface TemplateContextValue {
  rows: Record<UniqueIdentifier, Row>
  handleAddRow: () => void
  handleDragOver: (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier,
    activeContainer: UniqueIdentifier,
    overContainer: UniqueIdentifier,
    activeRect: ClientRect | null,
    overRect: ClientRect
  ) => void
  handleDragEnd: (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier,
    activeContainer: UniqueIdentifier,
    overContainer: UniqueIdentifier
  ) => void
}

export const TemplateContext = createContext<TemplateContextValue | null>(null)

export default function TemplateProvider({ children }: PropsWithChildren) {
  const [rows, setRows] = useState<Record<UniqueIdentifier, Row>>({
    1: {
      alignment: 'left',
      id: 1,
      items: jeans.map((jean) => jean.name)
    }
  })

  const handleAddRow = () => {
    const size = Object.keys(rows).length
    const newRow: Row = { alignment: 'left', id: size + 1, items: [] }
    setRows((prev) => ({ ...prev, [newRow.id]: newRow }))
  }

  const handleDragOver = (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier,
    activeContainer: UniqueIdentifier,
    overContainer: UniqueIdentifier,
    activeRect: ClientRect | null,
    overRect: ClientRect
  ) => {
    const activeIndex = dragDropUtils.getIndex(rows, activeContainer, activeId)
    const overIndex = dragDropUtils.getIndex(rows, overContainer, overId)

    const overItems = rows[overContainer].items

    let newIndex: number
    // Is a container
    if (overId in rows) {
      newIndex = overItems.length + 1
    } else {
      const isBelow =
        activeRect && activeRect.right > overRect.right + overRect.width
      const modifier = isBelow ? 1 : 0
      newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
    }

    setRows((prev) => ({
      ...prev,
      [activeContainer]: {
        ...prev[activeContainer],
        items: prev[activeContainer].items.filter((item) => item !== activeId)
      },
      [overContainer]: {
        ...prev[overContainer],
        items: [
          ...prev[overContainer].items.slice(0, newIndex),
          prev[activeContainer].items[activeIndex],
          ...prev[overContainer].items.slice(
            newIndex,
            prev[overContainer].items.length
          )
        ]
      }
    }))
  }

  const handleDragEnd = (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier,
    activeContainer: UniqueIdentifier,
    overContainer: UniqueIdentifier
  ) => {
    const activeIndex = dragDropUtils.getIndex(rows, activeContainer, activeId)
    const overIndex = dragDropUtils.getIndex(rows, overContainer, overId)

    if (activeIndex !== overIndex) {
      setRows((prev) => ({
        ...prev,
        [overContainer]: {
          ...prev[overContainer],
          items: arrayMove(rows[overContainer].items, activeIndex, overIndex)
        }
      }))
    }
  }

  const value: TemplateContextValue = {
    rows,
    handleAddRow,
    handleDragEnd,
    handleDragOver
  }

  return <TemplateContext value={value}>{children}</TemplateContext>
}
