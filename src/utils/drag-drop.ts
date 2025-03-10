import { UniqueIdentifier } from '@dnd-kit/core'
import { type Row } from '@types'

function findContainer(
  rows: Record<UniqueIdentifier, Row>,
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
  rows: Record<UniqueIdentifier, Row>,
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
  rows: Record<UniqueIdentifier, Row>,
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
