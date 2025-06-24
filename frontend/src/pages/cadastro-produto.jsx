"use client"

import { useState } from "react"
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
import { Upload, X, DollarSign, Package, Tag, FileText } from "lucide-react"

const CadastroProduto = () => {
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    preco: "",
    descricao: "",
    materiais: "",
    dimensoes: "",
    peso: "",
    tempoProducao: "",
    estoque: "",
  })

  const [imagens, setImagens] = useState([])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Produto:", formData)
    console.log("Imagens:", imagens)
    // Implementar lógica de cadastro do produto aqui
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Para controlar Select customizado
  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      categoria: value,
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }))
    setImagens([...imagens, ...newImages])
  }

  const removeImage = (id) => {
    setImagens(imagens.filter((img) => img.id !== id))
  }

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
                    >
                      <SelectTrigger className="w-full pl-10">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Selecione a categoria</SelectItem>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Preço e Estoque */}
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
                  <label htmlFor="estoque" className="text-sm font-medium text-gray-700">
                    Quantidade em Estoque
                  </label>
                  <Input
                    id="estoque"
                    name="estoque"
                    type="number"
                    placeholder="Quantidade disponível"
                    value={formData.estoque}
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

              {/* Materiais e Dimensões */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="materiais" className="text-sm font-medium text-gray-700">
                    Materiais Utilizados
                  </label>
                  <Input
                    id="materiais"
                    name="materiais"
                    placeholder="Ex: Madeira de eucalipto, verniz natural"
                    value={formData.materiais}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="dimensoes" className="text-sm font-medium text-gray-700">
                    Dimensões
                  </label>
                  <Input
                    id="dimensoes"
                    name="dimensoes"
                    placeholder="Ex: 30cm x 20cm x 15cm"
                    value={formData.dimensoes}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Peso e Tempo de Produção */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="peso" className="text-sm font-medium text-gray-700">
                    Peso (kg)
                  </label>
                  <Input
                    id="peso"
                    name="peso"
                    type="number"
                    step="0.1"
                    placeholder="Peso do produto"
                    value={formData.peso}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tempoProducao" className="text-sm font-medium text-gray-700">
                    Tempo de Produção
                  </label>
                  <Input
                    id="tempoProducao"
                    name="tempoProducao"
                    placeholder="Ex: 5 dias úteis"
                    value={formData.tempoProducao}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Upload de Imagens */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Imagens do Produto</label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Clique para adicionar imagens ou arraste e solte</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB cada</p>
                  </label>
                </div>

                {/* Preview das Imagens */}
                {imagens.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagens.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.url || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
