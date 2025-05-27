import type React from "react"
import { Monitor, Server, ExternalLink } from "lucide-react"

const About: React.FC = () => (
  <div className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Sobre o CozinhAI</h1>
      <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
    </div>

    <div className="prose prose-lg max-w-none">
      <p className="text-gray-600 text-lg leading-relaxed mb-8">
        O <strong className="text-green-700">CozinhAI</strong> é um projeto criado para Disciplina de Gerenciamento de
        Projetos. Nossa plataforma permite criem receitas, curtam e favoritem.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-8 bg-green-600 rounded-full mr-3"></span>
          Funcionalidades
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">Cadastro e organização de receitas</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">Gerar receitas com IA</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">Interface intuitiva e fácil de usar</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
          Tecnologias
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
              <Monitor className="w-5 h-5 mr-2" />
              Frontend
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                React
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                TypeScript
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                Vite
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                Tailwind CSS
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                React Router
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                Lucide React
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                Context API
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
              <Server className="w-5 h-5 mr-2" />
              Backend
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Node.js
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Express
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                TypeScript
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Prisma ORM
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Google Gemini API
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Pexels API
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Supabase
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-8 bg-green-600 rounded-full mr-3"></span>
          Contato
        </h2>
        <p className="text-gray-600 mb-2">Para saber mais ou contribuir com o projeto, entre em contato:</p>
        <a
          href="https://github.com/eslycaetano"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          GitHub - Esly Caetano
        </a>
      </div>
    </div>
  </div>
)

export default About
