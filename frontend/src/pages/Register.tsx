//src/components/pages/Register.tsx

import RegisterForm from "../components/auth/RegisterForm"
import { useAuth } from "../contexts/AuthContext"

export default function Register() {
  const { register, error, success } = useAuth()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
          <div className="flex flex-grow items-center justify-center p-6">
            <div className="w-full max-w-md">
              {success && (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded mb-4">
                  <p className="text-green-700">{success}</p>
                </div>
              )}
              <RegisterForm onSubmit={register} error={error} />
            </div>
          </div>
    
          <div className="bg-white py-4 text-center text-gray-600 border-t border-gray-200">
            <p>© 2025 CozinhAI. Todos os direitos reservados.</p>
          </div>
        </div>
  )
}