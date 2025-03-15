import type { Meta, StoryObj } from '@storybook/react'

import Product from '@components/Product/Product'
import { initialProducts } from '@data/products'
import { StoryBookIntlProvider } from './utils'

const meta: Meta<typeof Product> = {
  component: Product,
  decorators: (Story) => (
    <StoryBookIntlProvider>
      <Story />
    </StoryBookIntlProvider>
  )
}

type Story = StoryObj<typeof Product>

const [firstProduct] = Object.keys(initialProducts)

export const Default: Story = {
  args: {
    children: null,
    handleDelete: undefined,
    isActive: false,
    product: { name: firstProduct, ...initialProducts[firstProduct] }
  }
}

export const RemovableProduct: Story = {
  args: {
    ...Default.args,
    handleDelete: () => null
  }
}

export const SelectedProduct: Story = {
  args: {
    ...Default.args,
    children: (
      <div className="bg-medium-gray absolute inset-0 flex items-center justify-center rounded-md">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-400 text-3xl text-white">
          1
        </span>
      </div>
    )
  }
}

export default meta
