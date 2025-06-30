"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Select, SelectItem } from "@/components/ui/select"
import { DollarSign, Package, Tag, FileText } from "lucide-react"
import useSessionState from "../hooks/useSessionState"

const CadastroProduto = () => {
  // ** Importante: aqui o artesao_id deve vir do usuário logado, por exemplo do localStorage
  const [user, ] = useSessionState("User", {auth: false, id: ""})

  const [formData, setFormData] = useState({
    artesao_id: user.id,
    nome: "",
    categoria: "",
    preco: "",
    descricao: "",
    quantidade: "",
  })

  const categorias = [
    "Cerâmica",
    "Madeira",
    "Tecido",
    "Couro",
    "Metal",
    "Vidro",
    "Pedra",
    "Papel",
    "Joias",
    "Decoração",
    "Utensílios",
    "Arte",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.artesao_id) {
      alert("Usuário não autenticado.")
      return
    }

    try {
      const produtoParaEnviar = {
        artesao_id: formData.artesao_id,
        nome: formData.nome,
        categoria: formData.categoria,
        preco: Number(formData.preco),
        descricao: formData.descricao,
        quantidade: Number(formData.quantidade) || 0,
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/produto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoParaEnviar),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao cadastrar produto")
      }

      const data = await response.json()
      console.log("Produto cadastrado:", data)
      alert("Produto cadastrado com sucesso!")

      // Limpar formulário
      setFormData({
        ...formData,
        nome: "",
        categoria: "",
        preco: "",
        descricao: "",
        quantidade: "",
      })

    } catch (error) {
      console.error(error)
      alert(`Erro ao cadastrar produto: ${error.message}`)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      categoria: value,
    })
  }
  if(!user.auth) return <h1>faça login para cadastrar um produto</h1>
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cadastrar Produto</h1>
          <p className="text-gray-600">Adicione um novo produto ao seu catálogo</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Informações do Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome e Categoria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                    Nome do Produto *
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="nome"
                      name="nome"
                      placeholder="Nome do seu produto"
                      value={formData.nome}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="categoria" className="text-sm font-medium text-gray-700">
                    Categoria *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                    <Select
                      value={formData.categoria}
                      onValueChange={handleSelectChange}
                      className="w-full pl-10"
                      placeholder="Selecione a categoria"
                      required
                    >
                      <SelectItem value="">Selecione a categoria</SelectItem>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              {/* Preço e Quantidade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="preco" className="text-sm font-medium text-gray-700">
                    Preço (R$) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="preco"
                      name="preco"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={formData.preco}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quantidade" className="text-sm font-medium text-gray-700">
                    Quantidade em Estoque
                  </label>
                  <Input
                    id="quantidade"
                    name="quantidade"
                    type="number"
                    placeholder="Quantidade disponível"
                    value={formData.quantidade}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                  Descrição *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows={4}
                    placeholder="Descreva seu produto, suas características e diferenciais..."
                    value={formData.descricao}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                    required
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Cadastrar Produto
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Salvar como Rascunho
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CadastroProduto
