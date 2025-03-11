// import './App.css'
import Header from '@components/Header'
import ProductDialog from '@components/ProductDialog/ProductDialog'
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
          <div className="relative flex items-center justify-center">
            <h2 className="my-8 text-center text-4xl">Jeans</h2>
            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <Zoom />
            </div>
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
