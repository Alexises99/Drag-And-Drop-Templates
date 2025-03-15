import { NEW_ROW_ID } from '@utils/rows'
import DroppableContainer from './DroppableContainer'
import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'

interface CreateRowProps {
  openCreateDialog: () => void
  disabled?: boolean
}

export default function CreateRow({
  openCreateDialog,
  disabled = false
}: CreateRowProps) {
  return (
    <DroppableContainer
      id={NEW_ROW_ID}
      items={[]}
      overStyles="bg-light-gray"
      disabled={disabled}
    >
      {(_listeners, attributes) => (
        <button
          className={`border-light-gray hover:border-medium-gray w-full cursor-pointer border-1 border-dashed py-4 font-semibold text-gray-900`}
          {...attributes}
          onMouseDown={() => openCreateDialog()}
        >
          <FormattedMessage id="list.create-row" />
        </button>
      )}
    </DroppableContainer>
  )
}
