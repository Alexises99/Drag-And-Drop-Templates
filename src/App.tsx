// import './App.css'
import Header from '@components/Header'
import ProductDialog from '@components/ProductDialogs/ProductDialog'
import RowContainer from '@components/RowContainer'
import Zoom from '@components/Zoom'
import DragDropContext from '@context/DragDropContext'
import { useDialogContext } from '@hooks/useDialogContext'
import { createPortal } from 'react-dom'

function App() {
  const { dialogRef, editedRow } = useDialogContext()
  return (
    <>
      <Header />
      <DragDropContext>
        <main>
          <div className="relative flex items-center justify-between">
            <h2 className="my-8 text-center text-4xl">Jeans</h2>
            <Zoom />
          </div>
          <RowContainer />
        </main>
      </DragDropContext>
      {createPortal(
        <ProductDialog ref={dialogRef} editedRowId={editedRow} />,
        document.body
      )}
    </>
  )
}

export default App
