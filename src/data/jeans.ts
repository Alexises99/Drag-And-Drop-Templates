import type { Product } from '@types'
import jeansImages from '@assets/jeans'

export const jeans: Product[] = [
  {
    name: 'Straight Fit Regular',
    image: jeansImages.jeans1,
    price: 29.95
  },
  {
    name: 'Wide Leg',
    image: jeansImages.jeans2,
    price: 29.95
  },
  {
    name: 'Slim Fit Tapered',
    image: jeansImages.jeans3,
    price: 29.95
  },
  {
    name: 'Slim Fit',
    image: jeansImages.jeans4,
    price: 25.95
  },
  {
    name: 'Slim Cropped Fit',
    image: jeansImages.jeans5,
    price: 25.95
  },
  {
    name: 'Flare Fit',
    image: jeansImages.jeans6,
    price: 39.95
  }
]
