import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import DisplayPage from "./pages/DisplayPages";
import FormDisplayPage from "./pages/FormDisplayPage";
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
              <Route path="/display/form" element={<FormDisplayPage />} />
              <Route
                path="/display/form/:id"
                element={<h1>Editar Pantalla</h1>}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </DisplayProvider>
    </AuthProvider>
  );
}

export default App;
