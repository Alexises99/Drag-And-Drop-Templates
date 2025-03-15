import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import ProductListDialog from '@components/ProductDialogs/ProductListDialog'
import { StoryBookDecorator } from './utils'
import { translate } from '../tests/test-utils'

const meta = {
  component: ProductListDialog,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: (Story) => (
    <StoryBookDecorator>
      <Story />
    </StoryBookDecorator>
  ),
  args: {
    editedRowId: null,
    handleClose: fn()
  }
} satisfies Meta<typeof ProductListDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SelectProducts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const saveButton = canvas.getByText(
      translate('dialog.dialog-controls.save')
    )
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toHaveAttribute('disabled')
    const [first, second, thrid, fourth] = canvas.getAllByRole('button', {
      name: /Selecciona el producto/i
    })
    expect(first).toBeInTheDocument()
    expect(second).toBeInTheDocument()
    expect(thrid).toBeInTheDocument()
    expect(fourth).toBeInTheDocument()
    await userEvent.click(first)
    await userEvent.click(second)
    await userEvent.click(thrid)
    const [firstSelector, secondSelector, thirdSelector, fourthSelector] =
      canvas.queryAllByTestId('product-index-selector')
    expect(firstSelector).toBeInTheDocument()
    expect(secondSelector).toBeInTheDocument()
    expect(thirdSelector).toBeInTheDocument()
    expect(fourthSelector).toBeUndefined()
    expect(firstSelector).toHaveTextContent('1')
    expect(secondSelector).toHaveTextContent('2')
    expect(thirdSelector).toHaveTextContent('3')
    expect(saveButton).not.toHaveAccessibleName('disabled')
  }
}
