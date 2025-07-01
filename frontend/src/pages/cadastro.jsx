"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Select, SelectItem } from "@/components/ui/select"
import { ShoppingBag, Eye, EyeOff, Lock } from "lucide-react"
import useSessionState from "../hooks/useSessionState"

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [, setUser] = useSessionState("User", {auth: false, id: ""})
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    logradouro: "",
    cep: "",
    password: "",
    confirmPassword: "",
  })

  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
    "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS",
    "RO", "RR", "SC", "SP", "SE", "TO",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }

    const payload = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      logradouro: formData.logradouro,
      cidade: formData.cidade,
      estado: formData.estado,
      cep: formData.cep,
      senha_hash: formData.password
    }

    try {
      console.log("rodrigo")
      const res = await fetch(`${import.meta.env.VITE_API_URL}/artesao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      console.log("data:", data)
      alert("Cadastro realizado com sucesso!")

      setUser({auth: true, id: data.id})
      
      window.location.href = "/perfil" // redireciona para tela de perfil

    } catch (error) {
      console.error(error)
      alert(`Erro ao cadastrar artesão: ${error.message}`)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <Input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
                <Input name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required />
                <Input name="logradouro" placeholder="Logradouro" value={formData.logradouro} onChange={handleChange} required />
                <Input name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="estado" className="text-sm font-medium text-gray-700">Estado *</label>
                <Select
                  value={formData.estado}
                  onValueChange={(value) => handleSelectChange("estado", value)}
                  placeholder="Selecione o estado"
                  className="w-full"
                >
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha *</label>
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
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmar Senha *</label>
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

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Cadastrar como Artesão
              </Button>

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
