import { aligmentRecord, DragIcon, DeleteIcon, AddIcon } from '@assets/icons'
import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'

import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { Alignment } from '@types'
import { MAX_PRODUCTS } from '@utils/products'
import { useIntl } from 'react-intl'

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
  extends Pick<TemplateButtonsProps, 'changeAligment'> {
  aligment: Alignment
  selectedAligment: Alignment
}

function TemplateButton({
  aligment,
  selectedAligment,
  changeAligment
}: TemplateButtonProps) {
  const IconComponent = aligmentRecord[aligment]
  return (
    <button
      className="text-medium-gray hover:text-dark-gray cursor-pointer"
      onClick={() => changeAligment(aligment)}
      data-testid={`${aligment}-alignment-button`}
      aria-controls="aligment"
    >
      <IconComponent
        className={selectedAligment === aligment ? 'text-blue-300' : ''}
      />
    </button>
  )
}

interface TemplateButtonsProps {
  selectedAligment: Alignment
  listeners: SyntheticListenerMap | undefined
  attributes: DraggableAttributes | undefined
  items: UniqueIdentifier[]
  changeAligment: (alignment: Alignment) => void
  handleDelete: () => void
  openDialog: () => void
}

export default function TemplateButtons({
  changeAligment,
  handleDelete,
  openDialog,
  items,
  listeners,
  attributes,
  selectedAligment
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
          id="aligment"
          aria-live="polite"
          aria-label={intl.formatMessage({
            id: 'row.aligment.aria-label'
          })}
        >
          {intl.formatMessage({
            id: `aligment.${selectedAligment}`
          })}
        </span>
        <TemplateButton
          selectedAligment={selectedAligment}
          aligment={'left'}
          changeAligment={changeAligment}
        />
        <TemplateButton
          selectedAligment={selectedAligment}
          aligment={'center'}
          changeAligment={changeAligment}
        />
        <TemplateButton
          selectedAligment={selectedAligment}
          aligment={'right'}
          changeAligment={changeAligment}
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
