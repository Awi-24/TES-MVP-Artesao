"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ShoppingBag, Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nome: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verifica se o email existe
      const resEmail = await fetch(
        `http://localhost:3000/email/${encodeURIComponent(formData.email)}`
      );

      if (resEmail.status === 404) {
        // Cria novo artesão
        if (!formData.nome) {
          toast.error("Informe seu nome para criar conta.");
          setLoading(false);
          return;
        }

        const resCreate = await fetch("http://localhost:3000/id", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: formData.nome,
            email: formData.email,
            senha: formData.password,
          }),
        });

        if (!resCreate.ok) {
          toast.error("Erro ao criar conta.");
          setLoading(false);
          return;
        }

        toast.success("Conta criada! Faça login agora.");
        setLoading(false);
        return;
      }

      if (!resEmail.ok) {
        toast.error("Erro ao buscar email.");
        setLoading(false);
        return;
      }

      // Se email existe, "logar"
      const data = await resEmail.json();
      if (data.senha !== formData.password) {
        toast.error("Senha incorreta.");
        setLoading(false);
        return;
      }

      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">ArtesãoShop</span>
          </div>
          <p className="text-gray-600">Entre ou crie sua conta</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login / Cadastro</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!formData.nome && (
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                    Nome (apenas para cadastro)
                  </label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
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

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Processando..." : "Entrar / Criar Conta"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
