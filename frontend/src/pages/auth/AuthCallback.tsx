"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"
import { googleAuth } from "../../services/authService"
import { useAuth } from "../../contexts/AuthContext"
import Loading from "../../components/loading/Loading"

const AuthCallback = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { setIsAuthenticated } = useAuth()

  const handleAuthRedirect = async () => {
    setIsLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.getSession()
      const session = data?.session

      if (error || !session) {
        console.error("Erro ao obter sessão:", error?.message)
        throw new Error("Erro ao autenticar usuário. Tente novamente.")
      }

      const { error: authError } = await googleAuth()
      if (authError) {
        throw new Error(authError.message)
      }

      localStorage.setItem("token", session.access_token)
      setIsAuthenticated(true)
      setSuccess("Login realizado com sucesso!")
      setTimeout(() => navigate("/home"), 1500)
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro durante a autenticação")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleAuthRedirect()
  }, [navigate, setIsAuthenticated])

  if (isLoading && !error && !success) {
    return <Loading message="Autenticando, por favor aguarde..." />
  }

  const fadeInStyle = {
    animation: "0.5s ease-out 0s 1 fadeIn",
    transition: "all 0.3s ease",
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full border border-green-100" style={fadeInStyle}>
        <h2 className="text-2xl font-semibold mb-4 text-green-800 text-center">
          {success ? "Autenticado!" : error ? "Falha na Autenticação" : "Autenticando..."}
        </h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
            <p className="text-red-700">{error}</p>
            <button
              onClick={handleAuthRedirect}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-200"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700">{success}</p>
            <div className="mt-2 flex justify-center">
              <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-sm text-center text-green-600 mt-2">Redirecionando para a página inicial...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthCallback
