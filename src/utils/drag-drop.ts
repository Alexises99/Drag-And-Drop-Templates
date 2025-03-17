import {
  closestCenter,
  CollisionDetection,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  UniqueIdentifier
} from '@dnd-kit/core'
import { RowState } from '@hooks/useRows'
import { DragItem } from '@types'
import { RefObject } from 'react'

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

// Optimize the collission strategy by container levels
function collisionDetectionStrategy(
  rows: RowState,
  activeId: UniqueIdentifier | null,
  lastOverId: RefObject<UniqueIdentifier | null>,
  recentlyMovedToNewContainer: RefObject<boolean>
): CollisionDetection {
  return (args) => {
    if (activeId && activeId in rows) {
      const pointerCollisions = pointerWithin({
        ...args,
        droppableContainers: args.droppableContainers.filter(
          (container) => container.id in rows
        )
      })

      // Collision detection algorithms return an array of collisions
      if (pointerCollisions.length > 0) {
        return pointerCollisions
      }

      return closestCenter({
        ...args,
        droppableContainers: args.droppableContainers.filter(
          (container) => container.id in rows
        )
      })
    }

    // Start by finding any intersecting droppable
    const pointerIntersections = pointerWithin(args)
    const intersections =
      pointerIntersections.length > 0
        ? // If there are droppables intersecting with the pointer, return those
          pointerIntersections
        : rectIntersection(args)
    let overId = getFirstCollision(intersections, 'id')

    if (overId != null) {
      if (overId in rows) {
        const containerItems = rows[overId].items
        // If a container is matched and it contains items
        if (containerItems.length > 0) {
          // Return the closest droppable within that container
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId && containerItems.includes(container.id)
            )
          })[0]?.id
        }
      }

      lastOverId.current = overId

      return [{ id: overId }]
    }

    // When a draggable item moves to a new container, the layout may shift
    // and the `overId` may become `null`. We manually set the cached `lastOverId`
    // to the id of the draggable item that was moved to the new container, otherwise
    // the previous `overId` will be returned which can cause items to incorrectly shift positions
    if (recentlyMovedToNewContainer.current) {
      lastOverId.current = activeId
    }

    // If no droppable is matched, return no collision
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }
}

const dragDropUtils = {
  findContainer,
  getItemIndex,
  getIndex,
  collisionDetectionStrategy
}

export default dragDropUtils
