"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { toast } from "sonner"
import { User, Mail, Phone, MapPin, ShoppingBag } from "lucide-react"

const PerfilUsuario = ({ onLogout, onEdit }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId")
      if (!userId) {
        toast.error("Usuário não autenticado.")
        setLoading(false)
        return
      }

      try {
        console.log(userId)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/artesao/id/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Não foi possível obter os dados do perfil.")
        }

        const data = await response.json()
        setUser(data)
      } catch (error) {
        toast.error("Erro ao carregar o perfil do usuário.")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Carregando perfil...</div>
  }

  if (!user) {
    return <div className="p-6 text-center text-red-600">Perfil não encontrado.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex justify-center items-start pt-20">
      <div className="max-w-xl w-full">
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <ShoppingBag className="h-10 w-10 text-green-600" />
              <CardTitle className="text-3xl">Perfil do Artesão</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Campo label="Nome Completo" value={user.nome} icon={<User />} />
            <Campo label="Email" value={user.email} icon={<Mail />} />
            <Campo label="Telefone" value={user.telefone || "-"} icon={<Phone />} />
            <div className="grid grid-cols-2 gap-4">
              <Campo label="Cidade" value={user.cidade} icon={<MapPin />} />
              <Campo label="Estado" value={user.estado} />
            </div>
            <Campo label="Tipo de Artesão" value={user.tipoArtesao || "-"} />
            <Campo label="Especialidade" value={user.especialidade || "-"} />

            <div className="flex space-x-4 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => onEdit && onEdit()}>
                Editar Perfil
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => {
                  localStorage.removeItem("userId")
                  onLogout && onLogout()
                  window.location.href = "/login"
                }}
              >
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const Campo = ({ label, value, icon }) => (
  <div>
    <label className="flex items-center text-gray-700 font-medium mb-1">
      {icon && <span className="mr-2 h-5 w-5 text-gray-500">{icon}</span>}
      {label}
    </label>
    <input
      type="text"
      value={value}
      disabled
      className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
    />
  </div>
)

export default PerfilUsuario
