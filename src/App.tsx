import zaraLogo from '/logo.svg'
import './App.css'

function App() {
  return (
    <>
      <header>
        <img src={zaraLogo} alt="Zara logo" />
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <h1>Jeans</h1>
      </main>
    </>
  )
}

export default App
