"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectItem } from "@/components/ui/select"
import {
  Search,
  Filter,
  Heart,
  ShoppingCart,
  Star,
  MapPin,
  Eye,
} from "lucide-react"

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [sortBy, setSortBy] = useState("relevancia")
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch("http://localhost:3000/produto")
        if (!res.ok) throw new Error("Erro ao buscar produtos")
        const data = await res.json()
        // Supondo que data seja array de produtos conforme backend
        setProdutos(data)
      } catch (err) {
        console.error("Erro ao buscar produtos:", err)
      }
    }
    fetchProdutos()
  }, [])

  const categorias = [
    "Cerâmica",
    "Madeira",
    "Tecido",
    "Couro",
    "Metal",
    "Vidro",
    "Joias",
    "Decoração",
  ]

  const estados = ["BA", "PE", "CE", "MG", "SP", "PR", "RJ", "RS"]

  const faixasPreco = [
    { label: "Até R$ 50", value: "0-50" },
    { label: "R$ 51 - R$ 100", value: "51-100" },
    { label: "R$ 101 - R$ 200", value: "101-200" },
    { label: "R$ 201 - R$ 500", value: "201-500" },
    { label: "Acima de R$ 500", value: "500+" },
  ]

  const produtosFiltrados = useMemo(() => {
    const filtered = produtos.filter((produto) => {
      // Ajustar propriedades conforme sua API
      const nome = produto.nome || ""
      // Supondo que artesao seja um objeto com nome ou artesao_id
      const artesaoNome = produto.artesao_nome || produto.artesao?.nome || "Desconhecido"
      const categoria = produto.categoria || ""
      const estado = produto.estado || ""
      const preco = Number(produto.preco) || 0

      const matchSearch =
        nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artesaoNome.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCategory = !selectedCategory || categoria === selectedCategory
      const matchState = !selectedState || estado === selectedState

      let matchPrice = true
      if (priceRange) {
        if (priceRange === "500+") {
          matchPrice = preco >= 500
        } else {
          const [min, max] = priceRange.split("-").map(Number)
          matchPrice = preco >= min && preco <= max
        }
      }

      return matchSearch && matchCategory && matchState && matchPrice
    })

    switch (sortBy) {
      case "preco-menor":
        filtered.sort((a, b) => a.preco - b.preco)
        break
      case "preco-maior":
        filtered.sort((a, b) => b.preco - a.preco)
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "nome":
        filtered.sort((a, b) => (a.nome || "").localeCompare(b.nome || ""))
        break
    }

    return filtered
  }, [produtos, searchTerm, selectedCategory, priceRange, selectedState, sortBy])

  const limparFiltros = () => {
    setSearchTerm("")
    setSelectedCategory("")
    setPriceRange("")
    setSelectedState("")
    setSortBy("relevancia")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-400 to-green-300 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Descubra o Artesanato Brasileiro
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Conectando você aos melhores artesões do Brasil
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Busque por produtos ou artesãos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white text-gray-900 border-0 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filtros:</span>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="min-w-[150px]"
              placeholder="Todas as categorias"
            >
              <SelectItem value="">Todas as categorias</SelectItem>
              {categorias.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </Select>

            <Select
              value={priceRange}
              onValueChange={setPriceRange}
              className="min-w-[150px]"
              placeholder="Qualquer preço"
            >
              <SelectItem value="">Qualquer preço</SelectItem>
              {faixasPreco.map((faixa) => (
                <SelectItem key={faixa.value} value={faixa.value}>
                  {faixa.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              value={selectedState}
              onValueChange={setSelectedState}
              className="min-w-[120px]"
              placeholder="Todos os estados"
            >
              <SelectItem value="">Todos os estados</SelectItem>
              {estados.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </Select>

            <Select
              value={sortBy}
              onValueChange={setSortBy}
              className="min-w-[150px]"
              placeholder="Relevância"
            >
              <SelectItem value="relevancia">Relevância</SelectItem>
              <SelectItem value="preco-menor">Menor preço</SelectItem>
              <SelectItem value="preco-maior">Maior preço</SelectItem>
              <SelectItem value="rating">Melhor avaliado</SelectItem>
              <SelectItem value="nome">Nome A-Z</SelectItem>
            </Select>

            <Button variant="outline" onClick={limparFiltros} size="sm">
              Limpar Filtros
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            {produtosFiltrados.length} produto
            {produtosFiltrados.length !== 1 ? "s" : ""} encontrado
            {produtosFiltrados.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <Card
              key={produto.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={produto.imagem || "/placeholder.svg"}
                  alt={produto.nome}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`bg-white/80 hover:bg-white ${
                      produto.favorito ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        produto.favorito ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/80 hover:bg-white text-gray-600"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {produto.nome}
                </h3>

                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{produto.rating || 0}</span>
                  <span className="text-sm text-gray-500">
                    ({produto.reviews || 0})
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {produto.cidade}, {produto.estado}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  por {produto.artesao_nome || produto.artesao?.nome || "Desconhecido"}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
                  </span>
                  <Button
                    size="sm"
                    className="bg-green-300 hover:bg-green-500"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Comprar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {produtosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar seus filtros ou busque outro termo.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
