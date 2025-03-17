import { useTemplate } from '@hooks/useTemplate'
import StyledButton from './StyledButton'
import { useCallback } from 'react'
import { FormattedMessage } from './FormattedMessage/FormattedMessage'

interface DragErrorProps {
  resetError: () => void
}

export default function DragError({ resetError }: DragErrorProps) {
  const {
    rows: { setRows, setRowContainers }
  } = useTemplate()

  const reset = useCallback(() => {
    setRows({})
    setRowContainers([])
    resetError()
  }, [resetError, setRowContainers, setRows])

  return (
    <div className="my-12 flex flex-col items-center gap-5">
      <p>
        <FormattedMessage id="error-boundary.drag.title" />
      </p>
      <StyledButton
        extraProps={{
          onClick: reset
        }}
        type="button"
      >
        <FormattedMessage id="error-boundary.drag.button" />
      </StyledButton>
    </div>
  )
}
