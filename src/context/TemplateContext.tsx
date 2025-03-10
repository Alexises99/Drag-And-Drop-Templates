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
  handleShowProducts: () => void
  handleMoveRows: (activeId: number, overId: number) => void
  handleDeleteRow: (id: number) => void
  handleAddRow: () => void
  changeCategoryName: (id: number, value: string) => void
  removeItemFromRow: (rowId: number) => (itemId: string) => void
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
      name: 'Productos',
      id: 1,
      items: jeans.map((jean) => jean.name)
    }
  })

  const [rowContainers, setRowContainers] = useState<number[]>(
    Object.keys(rows)
      .slice(1)
      .map((item) => Number(item))
  )

  const handleShowProducts = () => setShowProducts((prev) => !prev)

  const handleAddRow = () => {
    const size = Object.keys(rows).length
    const newRow: Row = {
      alignment: 'left',
      id: size + 1,
      items: [],
      name: 'Sin nombre'
    }

    startTransition(() => {
      setRows((prev) => ({ ...prev, [newRow.id]: newRow }))
      setRowContainers((prev) => [...prev, newRow.id])
    })
  }

  const handleDeleteRow = (id: number) => {
    startTransition(() => {
      setRows((prev) => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
      setRowContainers((prev) =>
        prev.filter((containerId) => containerId !== id)
      )
    })
  }

  const changeCategoryName = (id: number, value: string) => {
    setRows((prev) => {
      const copy = { ...prev }
      copy[id].name = value
      return copy
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

  const removeItemFromRow = (rowId: number) => (itemId: string) => {
    setRows((prev) => {
      const copy = { ...prev }
      return {
        ...copy,
        [rowId]: {
          ...copy[rowId],
          items: copy[rowId].items.filter((item) => item !== itemId)
        }
      }
    })
  }

  const value: TemplateContextValue = {
    rows,
    showProducts,
    rowContainers,
    handleAddRow,
    handleMoveRows,
    handleDeleteRow,
    handleShowProducts,
    changeCategoryName,
    handleDragEnd,
    handleDragOver,
    removeItemFromRow
  }

  return <TemplateContext value={value}>{children}</TemplateContext>
}
