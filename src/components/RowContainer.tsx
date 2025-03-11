import { useTemplate } from '@/hooks/useTemplate'
import CreateRow from './DragDrop/CreateRow'
import DroppableRow from './Row/DroppableRow'
import { useDialogContext } from '@hooks/useDialogContext'

export default function RowContainer() {
  const {
    rows: { rowContainers, rows },
    zoom: { zoom }
  } = useTemplate()

  const { openDialog } = useDialogContext()

  return (
    <>
      <ul
        className="flex flex-col gap-4"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
      >
        {rowContainers.map((rowId) => (
          <DroppableRow
            row={rows[rowId]}
            key={rowId}
            openDialog={() => openDialog('list', rowId)}
          />
        ))}
        <CreateRow openCreateDialog={() => openDialog('list')} />
      </ul>
    </>
  )
}
