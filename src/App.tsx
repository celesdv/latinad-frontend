import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage"
import DisplayPage from "./pages/DisplayPages";;
import { AuthProvider } from "./context/AuthContext";
import { DisplayProvider } from "./context/DisplayContext";


function App() {
  return (
    <AuthProvider>
      <DisplayProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/display" element={<DisplayPage />} />
              <Route path="/display/:id" element={<h1>Editar Pantalla</h1>} />
              <Route path="/add-display" element={<h1>Nueva Pantalla</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DisplayProvider>
    </AuthProvider>
  );
}

export default App;
