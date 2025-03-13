import type { Product } from '@types'
import jeansImages from '@assets/jeans'

export const initialProducts: Record<string, Omit<Product, 'name'>> = {
  'Straight Fit Regular': {
    image: jeansImages.jeans1,
    price: 29.95
  },
  'Wide Leg': {
    image: jeansImages.jeans2,
    price: 29.95
  },
  'Slim Fit Tapered': {
    image: jeansImages.jeans3,
    price: 29.95
  },
  'Slim Fit': {
    image: jeansImages.jeans4,
    price: 25.95
  },
  'Slim Cropped Fit': {
    image: jeansImages.jeans5,
    price: 25.95
  },
  'Flare Fit': {
    image: jeansImages.jeans6,
    price: 39.95
  },
  'Jeans Straight Fit Relaxed': {
    image: jeansImages.jeans7,
    price: 39.95
  },
  'Jeans Baggy Fit': {
    image: jeansImages.jeans8,
    price: 59.95
  },
  'Jeans Slim Fit': {
    image: jeansImages.jeans9,
    price: 19.95
  },
  'Jeans Fit Relaxed': {
    image: jeansImages.jeans10,
    price: 49.95
  },
  'Jeans Baggy Fit Estampado Lavado': {
    image: jeansImages.jeans11,
    price: 49.95
  }
}
