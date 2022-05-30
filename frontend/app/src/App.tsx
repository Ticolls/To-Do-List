import { DeletedContextProvider } from "./contexts/DeletedContext"
import { IdContextProvider } from "./contexts/idContext"
import { ModalContextProvider } from "./contexts/ModalContext"
import { Home } from "./pages/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <IdContextProvider>
        <ModalContextProvider>
          <DeletedContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home/:userName" element={<Login />} />
            </Routes>
          </DeletedContextProvider>
        </ModalContextProvider>
      </IdContextProvider>
    </BrowserRouter>
  )
}

export default App
