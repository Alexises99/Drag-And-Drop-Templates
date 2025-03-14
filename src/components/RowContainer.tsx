import { useTemplate } from '@/hooks/useTemplate'

import DroppableRow from './Row/DroppableRow'
import { useDialogContext } from '@hooks/useDialogContext'

import CreateRow from './DragDrop/CreateRow'

export default function RowContainer({
  isOrderingContainer
}: {
  isOrderingContainer: boolean
}) {
  const {
    rows: { rowContainers, rows },
    zoom: { zoom }
  } = useTemplate()

  const { openDialog } = useDialogContext()

  return (
    <ul
      className="mb-8 flex flex-col gap-4"
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: 'top left',
        width: `${100 / zoom}%`,
        position: zoom === 1 ? 'static' : 'absolute'
      }}
    >
      {rowContainers.map((rowId) => (
        <li key={rowId}>
          <DroppableRow
            row={rows[rowId]}
            openDialog={() => openDialog('list', rowId)}
          />
        </li>
      ))}
      <li>
        <CreateRow
          openCreateDialog={() => openDialog('list')}
          disabled={isOrderingContainer}
        />
      </li>
    </ul>
  )
}
