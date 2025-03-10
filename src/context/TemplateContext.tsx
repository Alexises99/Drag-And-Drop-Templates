import {
  createContext,
  PropsWithChildren,
  startTransition,
  useState
} from 'react'
import { Row } from '../types'
import { jeans } from '@data/jeans'
import { arrayMove } from '@dnd-kit/sortable'
import { ClientRect, UniqueIdentifier } from '@dnd-kit/core'
import dragDropUtils from '@utils/drag-drop'

export const NEW_ROW_ID = 'add_row'

interface TemplateContextValue {
  rows: Record<UniqueIdentifier, Row>
  showProducts: boolean
  rowContainers: number[]
  handleMoveRows: (activeId: number, overId: number) => void
  handleShowProducts: () => void
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
  const [showProducts, setShowProducts] = useState<boolean>(false)

  const [rows, setRows] = useState<Record<UniqueIdentifier, Row>>({
    1: {
      alignment: 'left',
      id: 1,
      items: jeans.map((jean) => jean.name)
    }
  })

  const [rowContainers, setRowContainers] = useState<number[]>(
    Object.keys(rows)
      .slice(1)
      .map((item) => Number(item))
  )

  console.log(rowContainers)

  const handleShowProducts = () => setShowProducts((prev) => !prev)

  const handleAddRow = () => {
    const size = Object.keys(rows).length
    const newRow: Row = { alignment: 'left', id: size + 1, items: [] }

    startTransition(() => {
      setRows((prev) => ({ ...prev, [newRow.id]: newRow }))
      setRowContainers((prev) => [...prev, newRow.id])
    })
  }

  const handleMoveRows = (activeId: number, overId: number) => {
    const activeIndex = rowContainers.indexOf(activeId)
    const overIndex = rowContainers.indexOf(overId)

    const newRowContainers = arrayMove(rowContainers, activeIndex, overIndex)
    setRowContainers(newRowContainers)
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
    showProducts,
    rowContainers,
    handleMoveRows,
    handleShowProducts,
    handleAddRow,
    handleDragEnd,
    handleDragOver
  }

  return <TemplateContext value={value}>{children}</TemplateContext>
}
