import React from "react";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  description?: string;
  image?: string;
  prepTime?: number;
  servings?: number;
  difficulty?: number;
  isGeneratedByAI?: boolean;
  createdAt?: string;
  likes?: number; // Número de likes
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  description,
  image,
  prepTime,
  servings,
  difficulty,
  isGeneratedByAI,
  createdAt,
  likes,
}) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/home/recipe/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/300"}
          alt={title}
          className="w-full h-40 object-cover cursor-pointer"
          onClick={handleView}
        />
        {isGeneratedByAI && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Gerada por IA
          </span>
        )}
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-bold text-gray-800 cursor-pointer hover:text-[#4e9f3d] transition-colors"
          onClick={handleView}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          {description || "Sem descrição disponível."}
        </p>
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span>⏱️ {prepTime ? `${prepTime} min` : "Tempo não informado"}</span>
          <span>🍽️ {servings ? `${servings} porções` : "Porções não informadas"}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>🔥 Dificuldade: {difficulty || "Não informada"}</span>
          {createdAt && (
            <span>
              📅 Criada em: {new Date(createdAt).toLocaleDateString("pt-BR")}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <span>❤️ {likes || 0} curtidas</span> {/* Exibe o número de likes */}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;