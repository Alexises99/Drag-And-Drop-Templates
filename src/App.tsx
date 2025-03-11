// import './App.css'
import Header from '@components/Header'
import ProductDialog from '@components/ProductDialog/ProductDialog'
import RowContainer from '@components/RowContainer'
import DragDropContext from '@context/DragDropContext'
import useDialogContext from '@hooks/useDialogContext'
import { createPortal } from 'react-dom'

function App() {
  const { dialogRef, editedRow } = useDialogContext()
  return (
    <>
      <Header />
      <DragDropContext>
        <main>
          {/* <ProductSelector /> */}
          <h2 className="my-8 text-center text-4xl">Jeans</h2>
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
