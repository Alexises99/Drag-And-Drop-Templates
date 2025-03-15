import TemplateButtons from '@components/Row/TemplateButtons'
import { Meta, StoryObj } from '@storybook/react'
import { StoryBookIntlProvider } from './utils'
import { useArgs } from '@storybook/preview-api'
import { Alignment } from '@types'

import { fn } from '@storybook/test'

const meta: Meta<typeof TemplateButtons> = {
  component: TemplateButtons,
  decorators: (Story) => (
    <StoryBookIntlProvider>
      <Story />
    </StoryBookIntlProvider>
  ),
  args: {
    attributes: undefined,
    changeAligment: fn(),
    handleDelete: fn(),
    items: [],
    listeners: undefined,
    openDialog: fn(),
    selectedAligment: 'left'
  }
}
type Story = StoryObj<typeof TemplateButtons>

export const ChangeAligment: Story = {
  render: function (args) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ selectedAligment }, updateArgs] = useArgs()

    console.log({ selectedAligment, updateArgs })

    function onChange(aligment: Alignment) {
      updateArgs({ selectedAligment: aligment })
    }

    return (
      <TemplateButtons
        {...args}
        changeAligment={(aligment) => onChange(aligment)}
        selectedAligment={selectedAligment}
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
