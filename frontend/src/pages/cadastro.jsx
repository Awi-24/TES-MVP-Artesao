"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { ShoppingBag, Eye, EyeOff, User, Mail, Lock, Phone, MapPin } from "lucide-react"

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    tipoArtesao: "",
    especialidade: "",
    password: "",
    confirmPassword: "",
  })

  const estados = [
    "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
  ]

  const tiposArtesao = [
    "Ceramista",
    "Marceneiro",
    "Costureiro(a)",
    "Joalheiro(a)",
    "Pintor(a)",
    "Escultor(a)",
    "Tecelão/Tecelã",
    "Bordadeiro(a)",
    "Sapateiro(a)",
    "Outro",
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }
    console.log("Cadastro:", formData)
    // Lógica de cadastro aqui
  }

  // Controla mudanças em inputs normais
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Para atualizar selects personalizados (estado e tipoArtesao)
  const handleSelectChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ShoppingBag className="h-12 w-12 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">ArtesãoShop</span>
          </div>
          <p className="text-gray-600">Cadastre-se como artesão</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Cadastro de Artesão</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Dados Pessoais */}
              {/* ... seus Inputs normais aqui ... */}

              {/* Estado e Tipo de Artesão com Select personalizado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                    Estado *
                  </label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => handleSelectChange("estado", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Selecione o estado</SelectItem>
                      {estados.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="tipoArtesao" className="text-sm font-medium text-gray-700">
                    Tipo de Artesão *
                  </label>
                  <Select
                    value={formData.tipoArtesao}
                    onValueChange={(value) => handleSelectChange("tipoArtesao", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Selecione o tipo</SelectItem>
                      {tiposArtesao.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* O resto do formulário permanece igual */}

              {/* Especialidade */}
              <div className="space-y-2">
                <label htmlFor="especialidade" className="text-sm font-medium text-gray-700">
                  Especialidade
                </label>
                <Input
                  id="especialidade"
                  name="especialidade"
                  placeholder="Descreva sua especialidade (ex: cerâmica decorativa, móveis rústicos)"
                  value={formData.especialidade}
                  onChange={handleChange}
                />
              </div>

              {/* Senhas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirme sua senha"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Botão de Cadastro */}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Cadastrar como Artesão
              </Button>

              {/* Link para login */}
              <div className="text-center">
                <span className="text-sm text-gray-600">Já tem uma conta? </span>
                <Link to="/login" className="text-sm text-green-600 hover:text-green-800 font-medium">
                  Faça login aqui
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Cadastro
