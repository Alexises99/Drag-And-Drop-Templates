import useTemplate from '@hooks/useTemplate'
import zaraLogo from '/logo.svg'

export default function Header() {
  const { handleAddRow } = useTemplate()
  return (
    <header className="flex items-end justify-between">
      <img src={zaraLogo} alt="Zara logo" />
      <button
        className="border-1 px-12 py-2 font-semibold"
        onClick={handleAddRow}
      >
        New Row
      </button>
    </header>
  )
}
