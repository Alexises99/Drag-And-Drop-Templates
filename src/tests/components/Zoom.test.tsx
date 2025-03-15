import { describe, test, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import Zoom from '@components/Zoom'
import { renderWithContext, translate } from '../test-utils'
import { templateContextMock } from '../mocks/useTemplate.mock'

describe('Zoom', () => {
  test('renders zoom controls correctly', () => {
    renderWithContext(<Zoom />)

    expect(screen.getByText('-')).toBeInTheDocument()
    expect(screen.getByText('+')).toBeInTheDocument()
    expect(
      screen.getByText(`${templateContextMock.zoom.zoom * 100}%`)
    ).toBeInTheDocument()
  })

  test('calls decreaseZoom when minus button is clicked', () => {
    const decreaseZoomSpy = vi.spyOn(templateContextMock.zoom, 'decreaseZoom')
    renderWithContext(<Zoom />)

    const minusButton = screen.getByRole('button', {
      name: translate('zoom.decrease.label')
    })
    fireEvent.click(minusButton)

    expect(decreaseZoomSpy).toHaveBeenCalledTimes(1)
  })

  test('calls increaseZoom when plus button is clicked', () => {
    const increaseZoomSpy = vi.spyOn(templateContextMock.zoom, 'increaseZoom')
    renderWithContext(<Zoom />)

    const plusButton = screen.getByRole('button', {
      name: translate('zoom.increase.label')
    })
    fireEvent.click(plusButton)

    expect(increaseZoomSpy).toHaveBeenCalledTimes(1)
  })

  test('displays correct zoom percentage', () => {
    const newValue = {
      ...templateContextMock,
      zoom: { ...templateContextMock.zoom, zoom: 1.5 }
    }
    renderWithContext(<Zoom />, newValue)

    expect(screen.getByText(`${newValue.zoom.zoom * 100}%`)).toBeInTheDocument()
  })

  test('buttons have correct accessibility attributes', () => {
    renderWithContext(<Zoom />)

    expect(
      screen.getByRole('button', { name: translate('zoom.decrease.label') })
    ).toHaveAttribute('id', 'zoomOut')
    expect(
      screen.getByRole('button', { name: translate('zoom.increase.label') })
    ).toHaveAttribute('id', 'zoomIn')
  })
})
