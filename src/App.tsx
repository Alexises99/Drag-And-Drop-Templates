import { FormattedMessage } from '@components/FormattedMessage/FormattedMessage'
import Header from '@components/Header'
import ProductDialog from '@components/ProductDialogs/ProductDialog'
import Zoom from '@components/Zoom'
import DragDrop from '@components/DragDrop/DragDrop'

import { useDialogContext } from '@hooks/useDialogContext'
import { createPortal } from 'react-dom'

function App() {
  const { dialogRef, editedRow } = useDialogContext()
  return (
    <>
      <Header />
      <main className="relative">
        <div className="relative flex items-center justify-between">
          <h2 className="my-8 text-center text-4xl">
            <FormattedMessage id="category.name" />
          </h2>
          <Zoom />
        </div>
        <DragDrop />
      </main>
      {createPortal(
        <ProductDialog ref={dialogRef} editedRowId={editedRow} />,
        document.body
      )}
    </>
  )
}

export default App
