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

function getAligmentText(aligment: Alignment) {
  switch (aligment) {
    case 'left':
      return 'Izquierda'
    case 'center':
      return 'Centro'
    case 'right':
      return 'Derecha'
  }
}

const aligmentUtils = {
  getJustifyAligment,
  getAligmentText
}

export default aligmentUtils
