import { Row } from '@types'
import TemplateButtons from './TemplateButtons'
import { jeans } from '@data/jeans'
import aligmentUtils from '@utils/aligment'
import Product from '@components/Product'

interface RowOverlayProps {
  row: Row
}

export default function RowOverlay({ row }: RowOverlayProps) {
  const { alignment, id, items } = row

  const selectedAligment = aligmentUtils.getJustifyAligment(alignment)

  return (
    <section
      className={
        'border-medium-gray my-12 flex w-full flex-col gap-3 border-1 p-4'
      }
    >
      <header className="flex items-center justify-between">
        <span>{`Categoria ${id}`}</span>
        <TemplateButtons
          listeners={undefined}
          attributes={undefined}
          changeAligment={() => null}
        />
      </header>
      <div
        className={`flex min-h-44 w-full items-center gap-4 ${selectedAligment}`}
      >
        {items.map((item) => {
          const jean = jeans.find((jean) => jean.name === item)
          return <Product product={jean!} key={jean?.name} />
        })}
      </div>
    </section>
  )
}
