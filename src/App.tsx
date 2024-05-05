import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import FormDisplayPage from "./pages/FormDisplayPage";
import { AuthProvider } from "./context/AuthContext";
import { DisplayProvider } from "./context/DisplayContext";
import DisplayPage from "./pages/DisplayPage";
import LandingPage from "./pages/LandingPage"
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <DisplayProvider>
        <BrowserRouter >
          <NavBar />
          <Routes >
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/display" element={<DisplayPage />} />
              <Route path="/display/form" element={<FormDisplayPage />} />
              <Route
                path="/display/form/:id"
                element={<FormDisplayPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-center" richColors closeButton />
      </DisplayProvider>
    </AuthProvider>
  );
}

export default App;
