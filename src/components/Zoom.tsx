import { useTemplate } from '@hooks/useTemplate'

export default function Zoom() {
  const {
    zoom: { decreaseZoom, increaseZoom, zoom }
  } = useTemplate()

  return (
    <div className="flex w-fit items-center space-x-3 rounded-lg p-2 shadow-lg sm:p-4">
      <span>Zoom</span>
      <button
        id="zoomOut"
        className="bg-light-gray cursor-pointer rounded-lg px-4 py-2 text-gray-700 hover:scale-115 hover:bg-gray-300"
        onClick={decreaseZoom}
      >
        -
      </button>
      <span id="zoomLevel" className="text-lg font-semibold">
        {zoom * 100}%
      </span>
      <button
        id="zoomIn"
        className="bg-light-gray cursor-pointer rounded-lg px-4 py-2 text-gray-700 hover:scale-115 hover:bg-gray-300"
        onClick={increaseZoom}
      >
        +
      </button>
    </div>
  )
}
