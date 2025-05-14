// src/components/home/userProfile/UserProfile.tsx
import type React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { getMyUser, deleteMyUser } from "../../../services/userService";
import {getMyRecipeCount} from "../../../services/recipeService"
import { getFavoriteCount } from "../../../services/favoriteService";
import { Edit, Mail, User } from "lucide-react";
import UserForm from "./UserForm";
import { User as UserType } from "./UserForm";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const { logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("info");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token não encontrado");
          return;
        }
         // Buscar informações do usuário
         const userData = await getMyUser();

         // Buscar contagem de receitas criadas
         const recipeCount = await getMyRecipeCount();
 
         // Buscar contagem de receitas favoritas
         const favoriteCount = await getFavoriteCount();
 
         // Atualizar o estado do usuário com os novos dados
         setUser({
           ...userData,
           recipeCount,
           favoriteCount,
         });
      } catch (error) {
        setError("Erro ao buscar usuário");
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

    const handleDeleteAccount = async () => {
      if (window.confirm("Tem certeza que deseja excluir sua conta?")){
        try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Token não encontrado");
            return;
        }
        await deleteMyUser();
        alert("Conta excluída com sucesso!");
        await logout(); // Logout após a exclusão da conta
        } catch (error) {
        setError("Erro ao excluir conta");
        console.error("Erro ao excluir conta:", error);
        } finally {
        setLoading(false);
        }
      }
    };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4e9f3d]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Erro! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  const tabs = [
    { id: "info", label: "Informações" },
    { id: "settings", label: "Configurações" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 flex flex-col items-center w-full">
      {user && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full ">
          {/* Banner e foto de perfil */}
          <div className="relative">
            <div className="h-40 bg-gradient-to-r from-[#1e5128] to-[#4e9f3d]"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                  <img
                    src={
                      user.avatar ||
                      "https://sistemas.ft.unicamp.br/agenda/imagens/sem_foto.png"
                    }
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-[#4e9f3d] text-white p-2 rounded-full hover:bg-[#8fd14f] transition-colors">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Nome e informações básicas */}
          <div className="mt-20 text-center px-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {user.name || "Usuário"}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Membro desde {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Tabs de navegação */}
          <div className="mt-6 border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-[#4e9f3d] text-[#1e5128]"
                      : "text-gray-500 hover:text-[#4e9f3d]"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo da tab */}
          <div className="p-6">
            {activeTab === "info" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-[#1e5128] mb-4">
                      Informações Pessoais
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="text-[#4e9f3d] mr-3" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Nome</p>
                          <p className="font-medium">
                            {user.name || "Não informado"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="text-[#4e9f3d] mr-3" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">
                            {user.email || "Não informado"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-[#1e5128] mb-4">
                      Estatísticas Culinárias
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Receitas Criadas</span>
                        <span className="font-medium">
                          {0}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#8fd14f] h-2.5 rounded-full"
                          style={{ width: `${(user.recipeCount / 100) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Receitas Favoritas
                        </span>
                        <span className="font-medium">
                          {0}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#8fd14f] h-2.5 rounded-full"
                          style={{ width: `${(user.favoriteCount / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h3 className="text-lg font-medium text-[#1e5128] mb-4">
                  Configurações da Conta
                </h3>
                <div className="space-y-4">
    
                  <UserForm user={user} setUser={setUser}/>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 text-red-600">
                      Zona de Perigo
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Ações nesta seção são permanentes e não podem ser
                      desfeitas.
                    </p>
                    <button onClick={handleDeleteAccount} className="bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-md hover:bg-red-200 transition-colors">
                      Excluir Minha Conta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;