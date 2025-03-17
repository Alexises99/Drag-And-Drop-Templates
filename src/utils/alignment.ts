import type { Alignment } from '@types'

function getJustifyAlignment(alignment: Alignment) {
  switch (alignment) {
    case 'left':
      return 'justify-start'
    case 'center':
      return 'justify-center'
    case 'right':
      return 'justify-end'
  }
}

const alignmentUtils = {
  getJustifyAlignment
}

export default alignmentUtils
