// import './App.css'
import Header from '@components/Header'
import ProductSelector from '@components/ProductSelector'
import RowContainer from '@components/RowContainer'
import DragDropContext from '@context/DragDropContext'

function App() {
  return (
    <>
      <Header />
      <DragDropContext>
        <main>
          <ProductSelector />
          <h2 className="my-8 text-center text-4xl">Jeans</h2>
          <RowContainer />
        </main>
      </DragDropContext>
    </>
  )
}

export default App
