import Navbar from "../components/home/NavBar"

export default function Home() {

  return (
    <div className="flex min-h-screen bg-[#d8f3dc] items-center justify-center">
      {/* Navbar lateral */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-[#1e5128] mb-4">Bem-vindo ao CozinhAI! 👨‍🍳</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Aqui você pode compartilhar e descobrir receitas incríveis! Explore, crie e inspire-se na cozinha.
          </p>
        </div>
      </main>
    </div>
  )
}
