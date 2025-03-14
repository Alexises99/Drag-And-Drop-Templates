import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'
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
        <main className="relative">
          <div className="relative flex items-center justify-between">
            <h2 className="my-8 text-center text-4xl">
              <FormattedMessage id="category.name" />
            </h2>
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
