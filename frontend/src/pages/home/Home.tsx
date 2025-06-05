import { useState } from "react";
import Navbar from "../../components/home/NavBar";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/home/Footer";
import { ToastProvider } from "../../contexts/ToastContext";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false); // começa escondida!

  return (
    <ToastProvider>
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
          fixed top-0 left-0 h-screen bg-[#1e5128] text-white overflow-x-hidden transition-transform duration-300
          ${showNavbar ? "translate-x-0" : "-translate-x-full"}
          w-64 z-40
          md:fixed md:translate-x-0 md:block
        `}
      >
        <Navbar setShowNavbar={setShowNavbar} />
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8 flex items-center justify-center overflow-y-auto md:ml-64">
        <div className="w-full">
          <Outlet />
          <div className="pt-15">
            <Footer />
          </div>
        </div>
      </main>
    </div>
    </ToastProvider>
  );
}
