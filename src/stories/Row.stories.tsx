import { StoryBookDecorator } from './utils'
import Row from '@components/Row/Row'
import { initialProducts } from '@data/products'

import type { Row as RowType } from '@types'
import type { Meta, StoryObj } from '@storybook/react'

const defaultRow: RowType = {
  alignment: 'left',
  id: 1,
  items: Object.keys(initialProducts).slice(0, 2),
  name: 'Untitled'
}

const meta: Meta<typeof Row> = {
  component: Row,
  decorators: (Story) => (
    <StoryBookDecorator>
      <Story />
    </StoryBookDecorator>
  ),
  args: {
    row: defaultRow,
    isDraggable: false,
    listeners: undefined,
    attributes: undefined,
    openDialog: undefined
  }
}

type Story = StoryObj<typeof Row>

export const Default: Story = {}

export const EmptyRow: Story = {
  args: {
    ...meta.args,
    row: { ...defaultRow, items: [] }
  }
}

export default meta
