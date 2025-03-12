import type { Alignment } from '@types'

function getJustifyAligment(aligment: Alignment) {
  switch (aligment) {
    case 'left':
      return 'justify-start'
    case 'center':
      return 'justify-center'
    case 'right':
      return 'justify-end'
  }
}

const aligmentUtils = {
  getJustifyAligment
}

export default aligmentUtils
