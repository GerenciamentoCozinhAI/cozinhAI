//src/components/auth/LoginForm.tsx
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useState } from "react"
import GoogleButton from "./GoogleButton"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

type LoginFormData = z.infer<typeof loginSchema>

type Props = {
  onSubmit: (data: LoginFormData) => void
  error: string
}

export default function LoginForm({ onSubmit, error }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-green-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800">Bem-vindo ao CozinhAI</h2>
          <p className="text-green-600 mt-2">Entre na sua conta para continuar</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        <div className="flex justify-center">
          <GoogleButton />
        </div>

        <div className="relative flex items-center justify-center mt-6">
          <div className="border-t border-green-200 absolute w-full"></div>
          <div className="bg-white px-4 relative text-green-500 text-sm">ou</div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-green-700">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-green-500" />
            </div>
            <input
              {...register("email")}
              type="email"
              placeholder="seu@email.com"
              className="w-full pl-10 pr-3 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-green-700">Senha</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-green-500" />
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              className="w-full pl-10 pr-10 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-600 hover:text-green-800 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium shadow-sm hover:shadow"
        >
          Entrar
        </button>

        <p className="text-sm text-center text-gray-600">
          Ainda não tem conta?{" "}
          <a
            href="/register"
            className="text-green-600 font-medium hover:text-green-800 hover:underline transition-colors"
          >
            Criar conta
          </a>
        </p>

        <div className="relative flex items-center justify-center mt-6">
          <div className="border-t border-green-200 absolute w-full"></div>
          <div className="bg-white px-4 relative text-green-500 text-sm">Não quero entrar em uma conta</div>
        </div>

        <div className="text-center mt-4">
          <a
            href="/home"
            className="text-green-600 font-medium hover:text-green-800 hover:underline transition-colors"
          >
            Voltar para o CozinhAI
          </a>
        </div>
      </form>
    </div>
  )
}
