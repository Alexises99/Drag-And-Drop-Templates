import LeftIcon from './left.svg?react'
import CenterIcon from './center.svg?react'
import RightIcon from './right.svg?react'
export { default as PencilIcon } from './pencil.svg?react'
export { default as DragIcon } from './drag.svg?react'
export { default as DeleteIcon } from './delete.svg?react'
export { default as AddIcon } from './add.svg?react'

import type { FunctionComponent, SVGProps } from 'react'
import type { Alignment } from '@types'

export const aligmentRecord: Record<
  Alignment,
  FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string
      titleId?: string
      desc?: string
      descId?: string
    }
  >
> = {
  left: LeftIcon,
  center: CenterIcon,
  right: RightIcon
}
