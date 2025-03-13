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
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          width: `${100 / zoom}%`
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
        <CreateRow openCreateDialog={() => openDialog('list')} />
      </ul>
    </>
  )
}
