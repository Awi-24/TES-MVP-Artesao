import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "../src/components/navbar"
import Home from "../src/pages/home"
import Login from "./pages/login"
import Cadastro from "./pages/cadastro"
import CadastroProduto from "./pages/cadastro-produto"
import Perfil from "./pages/perfil"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-produto" element={<CadastroProduto />} />
          <Route path="/perfil" element={<Perfil />} />  {/* <-- rota do perfil */}
          {/* outras rotas */}
        </Routes>
      </div>
    </Router>
  )
}
