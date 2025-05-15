import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Book, LogOut, User, Heart, Home, Bot, Menu, Plus } from "lucide-react";
import { getMyUser } from "../../services/userService";
import { useEffect, useState } from "react";

interface NavbarProps {
  setShowNavbar: (value: boolean) => void;
}

export default function Navbar({ setShowNavbar }: NavbarProps) {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado");
          return;
        }
        const userData = await getMyUser();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
  
    fetchUser();
  }, []);

  return (
    <div className="h-screen w-64 bg-[#1e5128] text-white flex flex-col overflow-y-auto">
      {/* Botão de fechar (só aparece no mobile) */}
      <div className="md:hidden flex justify-end p-4">
        <button
          onClick={() => setShowNavbar(false)}
          className="sticky top-4 left-4 z-50 p-2 text-white rounded-lg hover:bg-[#4e9f3d]/20 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Perfil do usuário */}
      <div className="p-4 flex flex-col items-center border-b border-[#4e9f3d]/30">
        <Link to="/home/profile" className="group flex flex-col items-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#8fd14f] group-hover:border-white transition-all duration-200">
        <img
          src={user?.avatar! || "https://sistemas.ft.unicamp.br/agenda/imagens/sem_foto.png"}
          alt="Foto de perfil"
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-200"
        />
          </div>
          <p className="mt-2 text-center font-medium group-hover:text-[#8fd14f] transition-colors">
        {user?.name || "Meu Perfil"}
          </p>
        </Link>
      </div>

      {/* Links de navegação */}
      <nav className="flex-1 p-4">
        <div className="space-y-3">
          <Link
            to="/home"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#4e9f3d]/20 transition-colors"
          >
            <Home size={20} />
            <span>Início</span>
          </Link>

          <Link
            to="/home/recipes"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#4e9f3d]/20 transition-colors"
          >
            <Book size={20} />
            <span>Receitas</span>
          </Link>

          <Link
            to="/home/my-recipes"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#4e9f3d]/20 transition-colors"
          >
            <User size={20} />
            <span>Minhas Receitas</span>
          </Link>

          <Link
            to="/home/favorites"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#4e9f3d]/20 transition-colors"
          >
            <Heart size={20} />
            <span>Favoritas</span>
          </Link>

          <Link
            to="/home/create-recipe"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#4e9f3d]/20 transition-colors"
          >
            <Plus size={20} />
            <span>Criar Nova Receita</span>
          </Link>

          <Link
            to="/home/chefIA"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#4e9f3d]/20 transition-colors"
          >
            <Bot size={20} />
            <span>ChefIA</span>
          </Link>
        </div>
      </nav>

      {/* Botão de logout */}
      <div className="p-4 border-t border-[#4e9f3d]/30">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#4e9f3d]/20 transition-colors cursor-pointer"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#4e9f3d]/20 transition-colors cursor-pointer"
          >
            <LogOut size={20} />
            <span>Entrar</span>
          </Link>
        )}
      </div>
    </div>
  );
}
