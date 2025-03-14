import { useTemplate } from '@hooks/useTemplate'
import { FormattedMessage } from './FormattedMessage/FormattedMessage'
import { useIntl } from 'react-intl'

export default function Zoom() {
  const {
    zoom: { decreaseZoom, increaseZoom, zoom }
  } = useTemplate()

  const intl = useIntl()
  const zoomPercentage = Math.round(zoom * 100)

  return (
    <div
      className="flex w-fit items-center space-x-3 rounded-lg p-2 shadow-lg sm:p-4"
      role="group"
      aria-label={intl.formatMessage({ id: 'zoom.controls.label' })}
    >
      <span>
        <FormattedMessage id="zoom" />
      </span>
      <button
        id="zoomOut"
        aria-controls="zoomLevel"
        aria-label={intl.formatMessage({ id: 'zoom.decrease.label' })}
        type="button"
        className="bg-light-gray cursor-pointer rounded-lg px-4 py-2 text-gray-700 hover:scale-115 hover:bg-gray-300"
        onClick={decreaseZoom}
      >
        -
      </button>
      <span
        id="zoomLevel"
        className="text-lg font-semibold"
        aria-live="polite"
        aria-label={intl.formatMessage(
          { id: 'zoom.level.label' },
          { percentage: zoomPercentage }
        )}
      >
        {zoomPercentage}%
      </span>
      <button
        id="zoomIn"
        aria-controls="zoomLevel"
        aria-label={intl.formatMessage({ id: 'zoom.increase.label' })}
        type="button"
        className="bg-light-gray cursor-pointer rounded-lg px-4 py-2 text-gray-700 hover:scale-115 hover:bg-gray-300"
        onClick={increaseZoom}
      >
        +
      </button>
    </div>
  )
}
