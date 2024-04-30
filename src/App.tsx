import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/screens" element={<h1>Pantallas</h1>} />
        <Route path="/screens/:id" element={<h1>Editar Pantalla</h1>} />
        <Route path="/add-screen" element={<h1>Nueva Pantalla</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App