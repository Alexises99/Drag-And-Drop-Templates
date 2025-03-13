import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import DroppableContainer from '@components/DragDrop/DroppableContainer'
import { DndContext } from '@dnd-kit/core'

vi.mock('@dnd-kit/sortable', () => ({
  useSortable: vi.fn(() => ({
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
    listeners: { onPointerDown: vi.fn() },
    attributes: { role: 'button' },
    isOver: false
  }))
}))

describe('DroppableContainer', () => {
  const mockId = 'test-container'
  const mockItems = ['item-1', 'item-2']

  test('renders without crashing', () => {
    render(
      <DndContext>
        <DroppableContainer id={mockId} items={mockItems}>
          {(listeners, attributes) => (
            <button {...attributes} {...listeners}>
              Arrastrar
            </button>
          )}
        </DroppableContainer>
      </DndContext>
    )

    expect(
      screen.getByRole('button', { name: 'Arrastrar' })
    ).toBeInTheDocument()
  })

  test('applies overStyles when item is dragged over', async () => {
    vi.mocked((await import('@dnd-kit/sortable')).useSortable).mockReturnValue({
      setNodeRef: vi.fn(),
      transform: null,
      transition: undefined,
      listeners: { onPointerDown: vi.fn() },
      attributes: {
        role: 'button',
        'aria-describedby': '',
        'aria-disabled': false,
        'aria-pressed': false,
        'aria-roledescription': '',
        tabIndex: 0
      },
      isOver: true,
      active: null,
      activeIndex: 0,
      data: { sortable: { containerId: '', index: 0, items: [] } },
      index: 0,
      isDragging: false,
      isSorting: false,
      items: [],
      newIndex: 0,
      node: { current: null },
      over: null,
      overIndex: 0,
      rect: { current: null },
      setActivatorNodeRef: () => {},
      setDraggableNodeRef: () => {},
      setDroppableNodeRef: () => {}
    })

    const overStyles = 'bg-blue-500'

    render(
      <DndContext>
        <DroppableContainer
          id={mockId}
          items={mockItems}
          overStyles={overStyles}
        >
          {(listeners, attributes) => (
            <div {...attributes} {...listeners}>
              Contenido
            </div>
          )}
        </DroppableContainer>
      </DndContext>
    )

    const container = screen.getByText('Contenido').parentElement
    expect(container).toHaveClass('bg-blue-500')
  })

  test('passes correct attributes and listeners to children', () => {
    render(
      <DndContext>
        <DroppableContainer id={mockId} items={mockItems}>
          {(listeners, attributes) => (
            <div {...attributes} {...listeners}>
              Draggable
            </div>
          )}
        </DroppableContainer>
      </DndContext>
    )

    const child = screen.getByText('Draggable')
    expect(child).toHaveAttribute('role', 'button')
  })
})
