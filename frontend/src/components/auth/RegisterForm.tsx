//src/components/auth/RegisterForm.tsx
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, Mail, Lock, ImageIcon, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    avatar_url: z.string().url("URL inválida").optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type RegisterFormData = z.infer<typeof registerSchema>

type Props = {
  onSubmit: (data: Omit<RegisterFormData, "confirmPassword">) => void
  error: string
}

export default function RegisterForm({ onSubmit, error }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const submitHandler = (data: RegisterFormData) => {
    const { confirmPassword, ...rest } = data
    onSubmit(rest)
  }

  const inputFields = [
    {
      label: "Nome",
      name: "name",
      type: "text",
      placeholder: "Seu nome",
      icon: <User className="h-5 w-5 text-green-500" />,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "seu@email.com",
      icon: <Mail className="h-5 w-5 text-green-500" />,
    },
    {
      label: "Senha",
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "••••••",
      icon: <Lock className="h-5 w-5 text-green-500" />,
      rightIcon: (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-600 hover:text-green-800 transition-colors"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      ),
    },
    {
      label: "Confirmar senha",
      name: "confirmPassword",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "••••••",
      icon: <Lock className="h-5 w-5 text-green-500" />,
      rightIcon: (
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-600 hover:text-green-800 transition-colors"
        >
          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      ),
    },
    {
      label: "Avatar URL (opcional)",
      name: "avatar_url",
      type: "text",
      placeholder: "https://exemplo.com/sua-imagem.jpg",
      icon: <ImageIcon className="h-5 w-5 text-green-500" />,
    },
  ]

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white p-8 rounded-xl shadow-lg w-full space-y-6 border border-green-100"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-800">Criar conta</h2>
        <p className="text-green-600 mt-2">Junte-se a nós e comece a cozinhar</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {inputFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-green-700">{field.label}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{field.icon}</div>
              <input
                {...register(field.name as keyof RegisterFormData)}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full pl-10 pr-3 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              {field.rightIcon}
            </div>
            {errors[field.name as keyof RegisterFormData] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name as keyof RegisterFormData]?.message?.toString()}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium shadow-sm hover:shadow"
      >
        Criar conta
      </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Já tem uma conta?{" "}
        <a href="/login" className="text-green-600 font-medium hover:text-green-800 hover:underline transition-colors">
          Entrar
        </a>
      </p>
    </form>
  )
}
