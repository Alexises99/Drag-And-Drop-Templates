import { NEW_ROW_ID } from '@context/TemplateContext'
import DroppableContainer from './DroppableContainer'
import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'

interface CreateRowProps {
  openCreateDialog: () => void
}

export default function CreateRow({ openCreateDialog }: CreateRowProps) {
  return (
    <DroppableContainer id={NEW_ROW_ID} items={[]} overStyles="bg-light-gray">
      {(_listeners, attributes) => (
        <button
          className={`border-light-gray text-dark-gray hover:border-medium-gray w-full cursor-pointer border-1 border-dashed py-4 font-semibold`}
          {...attributes}
          onMouseDown={() => openCreateDialog()}
        >
          <FormattedMessage id="list.create-row" />
        </button>
      )}
    </DroppableContainer>
  )
}
