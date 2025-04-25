import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen flex flex-col items-center bg-green-50 text-gray-800">
        <header className="w-full bg-green-700 text-white py-8 text-center">
          <h1 className="text-4xl font-bold">Bem-vindo ao CozinhAI</h1>
          <p className="mt-2 text-lg">Descubra e crie receitas de forma prática!</p>
          <button
          onClick={() => navigate('/home')} 
          className="mt-4 px-6 py-2 bg-white text-green-700 font-semibold rounded hover:bg-gray-100 transition-colors">
            Começar Agora
          </button>
        </header>
  
        <main className="w-full py-12 px-4">
          <section className="flex flex-col md:flex-row justify-around items-center w-full max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-4">
            <div className="text-center max-w-sm p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-green-800">Organização</h2>
              <p className="mt-2 text-gray-600">Mantenha suas receitas organizadas em um só lugar.</p>
            </div>
  
            <div className="text-center max-w-sm p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-green-800">Colaboração</h2>
              <p className="mt-2 text-gray-600">Compartilhe receitas com amigos e familiares.</p>
            </div>
  
            <div className="text-center max-w-sm p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-green-800">Produtividade</h2>
              <p className="mt-2 text-gray-600">Crie receitas com ajuda da IA de forma rápida e eficiente.</p>
            </div>
          </section>
  
          <section className="mt-16 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Como o CozinhAI funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-green-700">Descreva o que deseja</h3>
                <p className="mt-2 text-gray-600">
                  Informe os ingredientes que você tem ou o tipo de prato que deseja preparar.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-green-700">Receba sugestões</h3>
                <p className="mt-2 text-gray-600">
                  Nossa IA irá gerar receitas personalizadas com base nas suas preferências.
                </p>
              </div>
            </div>
          </section>
  
          <section className="mt-16 bg-green-600 text-white py-12 px-4 rounded-lg max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Pronto para começar a cozinhar?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Junte-se a outras pessoas que já estão usando o CozinhAI para criar refeições deliciosas.
              </p>
              <button
                onClick={() => navigate('/home')}
                className="px-8 py-3 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Experimente Gratuitamente
              </button>
            </div>
          </section>
        </main>
  
        <footer className="w-full bg-green-800 text-white py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold">CozinhAI</h2>
                <p className="text-green-200">Seu site de receitas</p>
              </div>
  
              <div className="flex space-x-6">
                <a href="#" className="hover:text-green-200 transition-colors">
                  Sobre
                </a>
                <a href="#" className="hover:text-green-200 transition-colors">
                  Contato
                </a>
                <a href="#" className="hover:text-green-200 transition-colors">
                  Termos
                </a>
                <a href="#" className="hover:text-green-200 transition-colors">
                  Privacidade
                </a>
              </div>
            </div>
  
            <div className="border-t border-green-700 mt-6 pt-6 text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} CozinhAI. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
  