import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
  ShoppingBag,
  User,
  Menu,
  Home,
  LogIn,
  UserPlus,
  Plus,
  ChevronDown,
  LogOut,
} from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const accountRef = useRef(null)

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: "/", label: "Início", icon: Home },
    { path: "/login", label: "Login", icon: LogIn },
    { path: "/cadastro", label: "Cadastro", icon: UserPlus },
    { path: "/cadastro-produto", label: "Cadastrar Produto", icon: Plus },
  ]

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Exemplo simples de logout
  const handleLogout = () => {
    setIsAccountOpen(false)
    // Aqui você pode limpar tokens, contexto, etc
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 hidden sm:block">ArtesãoShop</span>
            <span className="text-lg font-bold text-gray-900 sm:hidden">AS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive(path)
                    ? "text-blue-600 bg-blue-50 shadow-sm"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="whitespace-nowrap">{label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center relative" ref={accountRef}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              aria-haspopup="true"
              aria-expanded={isAccountOpen}
            >
              <User className="h-4 w-4 mr-2" />
              <span className="hidden xl:inline">Minha Conta</span>
              <span className="xl:hidden">Conta</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>

            {isAccountOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/perfil"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsAccountOpen(false)}
                >
                  Perfil
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive(path) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}

              {/* Mobile account dropdown */}
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  aria-haspopup="true"
                  aria-expanded={isAccountOpen}
                >
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Minha Conta</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isAccountOpen ? "rotate-180" : ""}`} />
                </button>
                {isAccountOpen && (
                  <div className="mt-1 space-y-1 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                    <Link
                      to="/perfil"
                      className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsAccountOpen(false)
                        setIsMenuOpen(false)
                      }}
                    >
                      Perfil
                    </Link>
                    <button
                      className="w-full text-left px-6 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut className="h-4 w-4" />
                        <span>Sair</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
