//src/components/pages/Login.tsx

import LoginForm from "../components/auth/LoginForm"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const { login, error, success } = useAuth()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-grow flex-col md:flex-row">
        {/* Left side - Modern design */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
          {/* Background gradient with pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-800">
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-12 text-white">
            {/* Logo and brand */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-green-600"
                  >
                    <path
                      d="M25.3333 5.33333H6.66667C5.95942 5.33333 5.28115 5.61428 4.78105 6.11438C4.28095 6.61448 4 7.29276 4 8V24C4 24.7072 4.28095 25.3855 4.78105 25.8856C5.28115 26.3857 5.95942 26.6667 6.66667 26.6667H25.3333C26.0406 26.6667 26.7189 26.3857 27.219 25.8856C27.719 25.3855 28 24.7072 28 24V8C28 7.29276 27.719 6.61448 27.219 6.11438C26.7189 5.61428 26.0406 5.33333 25.3333 5.33333Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 13.3333H28"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.6667 20H10.68"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 20H16.0133"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.3333 20H21.3467"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold">CozinhAI</h1>
              </div>
              <p className="text-lg opacity-90">Sua assistente de cozinha inteligente</p>
            </div>

            {/* Decorative elements */}
            <div className="flex-grow flex items-center justify-center">
              <div className="relative">
                {/* Circular elements */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>

                {/* Main illustration */}
                <div
                  className="relative z-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white border-opacity-20"
                  style={{ backgroundColor: "rgba(0, 50, 0, 0.2)" }}
                >
                  <div className="flex flex-col items-center">
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-6 text-green-300"
                    >
                      <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="4" />
                      <path
                        d="M85 35H35C32.2386 35 30 37.2386 30 40V80C30 82.7614 32.2386 85 35 85H85C87.7614 85 90 82.7614 90 80V40C90 37.2386 87.7614 35 85 35Z"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M30 50H90"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M45 70H45.05"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M60 70H60.05"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M75 70H75.05"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M50 25V35"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M70 25V35"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M40 95L45 85"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M80 95L75 85"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h2 className="text-xl font-semibold mb-2">Descubra novas receitas</h2>
                    <p className="text-center opacity-90">
                      Acesse milhares de receitas e dicas culinárias com a ajuda da nossa IA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features - Only two as requested */}
            <div className="mt-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Receitas personalizadas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Comunidade de chefs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Login</h2>
            {success && (
              <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded mb-4">
                <p className="text-green-700">{success}</p>
              </div>
            )}
            <LoginForm onSubmit={login} error={error} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-4 text-center text-gray-600 border-t border-gray-200">
        <p>© 2025 CozinhAI. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
