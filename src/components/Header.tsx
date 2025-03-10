import useTemplate from '@hooks/useTemplate'
import zaraLogo from '/logo.svg'

export default function Header() {
  const { products } = useTemplate()
  const { handleShowProducts, showProducts } = products
  return (
    <header className="flex items-end justify-between">
      <img src={zaraLogo} alt="Zara logo" className="max-h-14" />
      <button
        className="border-1 px-6 py-2 font-semibold"
        onClick={handleShowProducts}
      >
        {showProducts ? 'Ocultar Productos' : 'Mostrar Productos'}
      </button>
    </header>
  )
}
