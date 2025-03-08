// import './App.css'
import Header from '@components/Header'
import ProductSelector from '@components/ProductSelector'
import RowContainer from '@components/RowContainer'

function App() {
  return (
    <>
      <Header />
      <main>
        <h2 className="my-8 text-center text-5xl">Jeans</h2>
        <h3>Products</h3>
        <ProductSelector />
        <RowContainer />
      </main>
    </>
  )
}

export default App
