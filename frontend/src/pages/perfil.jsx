"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { User, Mail, Phone, MapPin, ShoppingBag } from "lucide-react"

const PerfilUsuario = ({ userData, onLogout, onEdit }) => {
  // userData seria passado pela rota, contexto ou API
  // para demo, vamos criar um state interno com dados mock (remova depois)
  const [user] = useState(
    userData || {
      nome: "João Silva",
      email: "joao.silva@email.com",
      telefone: "(11) 99999-9999",
      cidade: "São Paulo",
      estado: "SP",
      tipoArtesao: "Ceramista",
      especialidade: "Cerâmica decorativa",
    }
  )

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
            {/* Nome */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-1">
                <User className="mr-2 h-5 w-5 text-gray-500" />
                Nome Completo
              </label>
              <input
                type="text"
                value={user.nome}
                disabled
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-1">
                <Mail className="mr-2 h-5 w-5 text-gray-500" />
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-1">
                <Phone className="mr-2 h-5 w-5 text-gray-500" />
                Telefone
              </label>
              <input
                type="text"
                value={user.telefone || "-"}
                disabled
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
              />
            </div>

            {/* Cidade e Estado */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                  Cidade
                </label>
                <input
                  type="text"
                  value={user.cidade}
                  disabled
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1">
                  Estado
                </label>
                <input
                  type="text"
                  value={user.estado}
                  disabled
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Tipo de Artesão */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-1">
                Tipo de Artesão
              </label>
              <input
                type="text"
                value={user.tipoArtesao}
                disabled
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
              />
            </div>

            {/* Especialidade */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-1">
                Especialidade
              </label>
              <input
                type="text"
                value={user.especialidade || "-"}
                disabled
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 cursor-not-allowed"
              />
            </div>

            {/* Botões */}
            <div className="flex space-x-4 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onEdit && onEdit()}
              >
                Editar Perfil
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => onLogout && onLogout()}
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

export default PerfilUsuario
