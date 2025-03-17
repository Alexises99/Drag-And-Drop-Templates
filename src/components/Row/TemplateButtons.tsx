import { alignmentRecord, DragIcon, DeleteIcon, AddIcon } from '@assets/icons'
import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'
import { MAX_PRODUCTS } from '@utils/products'
import { useIntl } from 'react-intl'

import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { Alignment } from '@types'

function DeleteButton({
  handleDelete,
  className
}: {
  handleDelete: () => void
  className: string
}) {
  return (
    <button
      data-testid="remove-row"
      className={`cursor-pointer hover:text-red-400 ${className}`}
      onClick={handleDelete}
    >
      <DeleteIcon />
    </button>
  )
}

interface TemplateButtonProps
  extends Pick<TemplateButtonsProps, 'changeAlignment'> {
  alignment: Alignment
  selectedAlignment: Alignment
}

function TemplateButton({
  alignment,
  selectedAlignment,
  changeAlignment
}: TemplateButtonProps) {
  const IconComponent = alignmentRecord[alignment]
  return (
    <button
      className="text-medium-gray hover:text-dark-gray cursor-pointer"
      onClick={() => changeAlignment(alignment)}
      data-testid={`${alignment}-alignment-button`}
      aria-controls="alignment"
    >
      <IconComponent
        className={selectedAlignment === alignment ? 'text-blue-300' : ''}
      />
    </button>
  )
}

interface TemplateButtonsProps {
  selectedAlignment: Alignment
  listeners: SyntheticListenerMap | undefined
  attributes: DraggableAttributes | undefined
  items: UniqueIdentifier[]
  changeAlignment: (alignment: Alignment) => void
  handleDelete: () => void
  openDialog: () => void
}

export default function TemplateButtons({
  changeAlignment,
  handleDelete,
  openDialog,
  items,
  listeners,
  attributes,
  selectedAlignment
}: TemplateButtonsProps) {
  const intl = useIntl()
  return (
    <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-6">
      <DeleteButton
        handleDelete={handleDelete}
        className="hidden group-hover:block"
      />
      <div className="order-2 flex items-center gap-4 sm:order-1" role="group">
        <span
          id="alignment"
          aria-live="polite"
          aria-label={intl.formatMessage({
            id: 'row.alignment.aria-label'
          })}
        >
          {intl.formatMessage({
            id: `alignment.${selectedAlignment}`
          })}
        </span>
        <TemplateButton
          selectedAlignment={selectedAlignment}
          alignment={'left'}
          changeAlignment={changeAlignment}
        />
        <TemplateButton
          selectedAlignment={selectedAlignment}
          alignment={'center'}
          changeAlignment={changeAlignment}
        />
        <TemplateButton
          selectedAlignment={selectedAlignment}
          alignment={'right'}
          changeAlignment={changeAlignment}
        />
      </div>
      <div className="flex items-center gap-4 sm:order-2">
        <DeleteButton handleDelete={handleDelete} className="sm:hidden" />
        <button
          type="button"
          aria-label={intl.formatMessage({
            id: 'row.remove.aria-label'
          })}
          className="disabled:bg-light-gray flex cursor-pointer items-center gap-2 rounded-full border-1 bg-white disabled:cursor-auto sm:px-4 sm:py-1"
          onClick={() => openDialog()}
          disabled={items.length === MAX_PRODUCTS}
        >
          <AddIcon />
          <span className="hidden sm:inline">
            <FormattedMessage id="row.add-product" />
          </span>
        </button>
        <button
          className="cursor-pointer"
          {...listeners}
          {...attributes}
          data-testid="row-drag-handle"
          aria-label={intl.formatMessage({
            id: 'row.drag.aria-label'
          })}
        >
          <DragIcon />
        </button>
      </div>
    </div>
  )
}
