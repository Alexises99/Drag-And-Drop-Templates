import { describe, test, expect, vi } from 'vitest'
import { render, renderHook } from '@testing-library/react'
import TemplateProvider from '@context/Template/Template/TemplateProvider'
import { useContext } from 'react'
import { useProducts } from '@hooks/useProducts'
import useZoom from '@hooks/useZoom'
import { useRows } from '@hooks/useRows'
import { useDragDrop } from '@hooks/useDragDrop'
import { TemplateContext } from '@context/Template/Template/TemplateContext'
import { NEW_ROW_ID } from '@utils/rows'

// Mock all hooks
vi.mock('@hooks/useProducts', () => ({
  useProducts: vi.fn()
}))

vi.mock('@hooks/useZoom', () => ({
  default: vi.fn()
}))

vi.mock('@hooks/useRows', () => ({
  useRows: vi.fn()
}))

vi.mock('@hooks/useDragDrop', () => ({
  useDragDrop: vi.fn()
}))

describe('TemplateContext', () => {
  const mockProducts = {
    productsData: {},
    addProduct: vi.fn(),
    removeProduct: vi.fn()
  }

  const mockZoom = {
    zoom: 1,
    increaseZoom: vi.fn(),
    decreaseZoom: vi.fn()
  }

  const mockRows = {
    rows: {},
    rowContainers: [],
    setRows: vi.fn()
  }

  const mockDragDrop = {
    handleDragEnd: vi.fn(),
    handleDragOver: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup mock implementations
    vi.mocked(useProducts).mockReturnValue(mockProducts)
    vi.mocked(useZoom).mockReturnValue(mockZoom)
    vi.mocked(useRows).mockReturnValue({
      ...mockRows,
      addItemToRow: () => {},
      addNewRow: () => {},
      changeAlignment: () => {},
      changeCategoryName: () => {},
      deleteItemFromRow: () => () => {},
      deleteRow: () => {},
      handleMoveRows: () => {},
      setRowContainers: () => {}
    })
    vi.mocked(useDragDrop).mockReturnValue(mockDragDrop)
  })

  test('NEW_ROW_ID constant is defined correctly', () => {
    expect(NEW_ROW_ID).toBe('add_row')
  })

  test('TemplateProvider renders children', () => {
    const TestChild = () => <div>Test Child</div>
    const { getByText } = render(
      <TemplateProvider>
        <TestChild />
      </TemplateProvider>
    )

    expect(getByText('Test Child')).toBeInTheDocument()
  })

  test('TemplateProvider provides correct context value', () => {
    const TestConsumer = () => {
      const context = useContext(TemplateContext)
      if (!context) throw new Error('Context is null')

      return (
        <div>
          <span data-testid="zoom-value">{context.zoom.zoom}</span>
        </div>
      )
    }

    const { getByTestId } = render(
      <TemplateProvider>
        <TestConsumer />
      </TemplateProvider>
    )

    expect(getByTestId('zoom-value').textContent).toBe('1')
  })

  test('hooks are called in correct order', () => {
    render(
      <TemplateProvider>
        <div />
      </TemplateProvider>
    )

    expect(useProducts).toHaveBeenCalled()
    expect(useZoom).toHaveBeenCalled()
    expect(useRows).toHaveBeenCalled()
    expect(useDragDrop).toHaveBeenCalledWith(mockRows.rows, mockRows.setRows)
  })

  test('context is null outside provider', () => {
    const { result } = renderHook(() => useContext(TemplateContext))
    expect(result.current).toBeNull()
  })

  test('context provides all required properties', () => {
    const TestConsumer = () => {
      const context = useContext(TemplateContext)
      if (!context) throw new Error('Context is null')

      // Check if all properties exist
      expect(context.products).toBeDefined()
      expect(context.zoom).toBeDefined()
      expect(context.rows).toBeDefined()
      expect(context.dragDrop).toBeDefined()

      return null
    }

    render(
      <TemplateProvider>
        <TestConsumer />
      </TemplateProvider>
    )
  })
})
