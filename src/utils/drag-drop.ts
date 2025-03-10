import { UniqueIdentifier } from '@dnd-kit/core'
import { DragItem } from '@types'

function findContainer(
  rows: Record<UniqueIdentifier, DragItem>,
  activeItemId: UniqueIdentifier
) {
  // Find rows (container) id
  if (activeItemId in rows) {
    return activeItemId
  }

  // Find product (items) id
  return Object.values(rows).find((row) => row.items.includes(activeItemId))?.id
}

function getItemIndex(
  rows: Record<UniqueIdentifier, DragItem>,
  activeItemId: UniqueIdentifier
) {
  const container = findContainer(rows, activeItemId)

  if (!container) {
    return -1
  }

  const index = rows[container].items.indexOf(activeItemId)

  return index
}

function getIndex(
  rows: Record<UniqueIdentifier, DragItem>,
  container: UniqueIdentifier,
  id: UniqueIdentifier
) {
  const items = rows[container].items

  const index = items.indexOf(id)

  return index
}

const dragDropUtils = {
  findContainer,
  getItemIndex,
  getIndex
}

export default dragDropUtils
