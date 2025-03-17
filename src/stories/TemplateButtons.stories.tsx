import TemplateButtons from '@components/Row/TemplateButtons'
import { fn } from '@storybook/test'
import { StoryBookIntlProvider } from './utils'
import { useArgs } from '@storybook/preview-api'

import type { Alignment } from '@types'
import { type Meta, type StoryObj } from '@storybook/react'

const meta: Meta<typeof TemplateButtons> = {
  component: TemplateButtons,
  decorators: (Story) => (
    <StoryBookIntlProvider>
      <Story />
    </StoryBookIntlProvider>
  ),
  args: {
    attributes: undefined,
    changeAlignment: fn(),
    handleDelete: fn(),
    items: [],
    listeners: undefined,
    openDialog: fn(),
    selectedAlignment: 'left'
  }
}
type Story = StoryObj<typeof TemplateButtons>

export const ChangeAlignment: Story = {
  render: function (args) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ selectedAlignment }, updateArgs] = useArgs()

    function onChange(alignment: Alignment) {
      updateArgs({ selectedAlignment: alignment })
    }

    return (
      <TemplateButtons
        {...args}
        changeAlignment={(alignment) => onChange(alignment)}
        selectedAlignment={selectedAlignment}
      />
    )
  }
}

export const DisabledAddButton: Story = {
  args: {
    ...meta.args,
    items: [1, 2, 3]
  }
}

export default meta
