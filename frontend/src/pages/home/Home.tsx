import { useState } from "react";
import Navbar from "../../components/home/NavBar";
import { Menu } from "lucide-react";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false); // começa escondida!

  return (
    <div className="flex min-h-screen bg-[#d8f3dc]">
      {/* Botão para abrir a Navbar (só aparece no mobile) */}
      {!showNavbar && (
        <button
          onClick={() => setShowNavbar(true)}
          className="
            fixed top-4 left-4 z-50 p-2 rounded-lg transition-colors duration-300 md:hidden text-white bg-[#1e5128]
          "
        >
          <Menu size={24} />
        </button>
      )}

      {/* Overlay escuro */}
      {showNavbar && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setShowNavbar(false)}
        ></div>
      )}

      {/* Navbar lateral */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-[#1e5128] text-white overflow-x-hidden transition-transform duration-300
          ${showNavbar ? "translate-x-0" : "-translate-x-full"}
          w-64 z-40
          md:relative md:translate-x-0 md:block
        `}
      >
        <Navbar setShowNavbar={setShowNavbar} />
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-[#1e5128] mb-4">
            Bem-vindo ao CozinhAI! 👨‍🍳
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Aqui você pode compartilhar e descobrir receitas incríveis! Explore,
            crie e inspire-se na cozinha.
          </p>
        </div>
      </main>
    </div>
  );
}
