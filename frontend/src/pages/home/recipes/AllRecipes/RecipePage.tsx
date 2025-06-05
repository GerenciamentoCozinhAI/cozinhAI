import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../../../services/recipeService";
import {
  addFavorite,
  removeFavorite,
} from "../../../../services/favoriteService";
import { addLike, removeLike } from "../../../../services/likeService";
import { Clock, Utensils, Heart, Star, ChevronRight } from "lucide-react";
import DifficultyRating from "../../../../components/home/recipes/DifficultyRating";
import Loading from "../../../../components/loading/Loading";

interface Ingredient {
  ingredientName: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  id: string;
  title: string;
  description?: string;
  image?: string;
  prepTime?: number;
  servings?: number;
  difficulty?: number;
  ingredients?: Ingredient[];
  instructions?: string;
  isLiked?: boolean;
  isFavorited?: boolean;
  createdAt?: string;
  isGeneratedByAI?: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        const data = await getRecipeById(id);
        setRecipe(data);
        setIsLiked(data.isLiked || false);
        setIsFavorited(data.isFavorited || false);
      } catch (error) {
        console.error("Erro ao buscar receita:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    if (!id) return;

    try {
      if (isLiked) {
        await removeLike(id);
        setIsLiked(false);
      } else {
        await addLike(id);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Erro ao curtir/desclicar a receita:", error);
    }
  };

  const handleFavorite = async () => {
    if (!id) return;

    try {
      if (isFavorited) {
        await removeFavorite(id);
        setIsFavorited(false);
      } else {
        await addFavorite(id);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar a receita:", error);
    }
  };

  if (isLoading) {
    return <Loading message="Carregando receita..." />;
  }

  if (!recipe) {
    return <p className="text-center text-gray-500">Receita não encontrada.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="relative mb-6">
        <img
          src={recipe.image || "https://via.placeholder.com/600"}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
        {recipe.isGeneratedByAI && (
          <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-md font-medium text-sm">
            Gerada por IA
          </span>
        )}
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-1">{recipe.title}</h1>
      {recipe.user && (
        <p className="text-gray-500 text-base mb-4">
          Criada por <span className="font-semibold">{recipe.user.name}</span>
        </p>
      )}
      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
        {recipe.description || "Sem descrição disponível."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={20} className="text-green-600" />
          <span>
            {recipe.prepTime
              ? `${recipe.prepTime} minutos`
              : "Tempo não informado"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Utensils size={20} className="text-green-600" />
          <span>
            {recipe.servings
              ? `${recipe.servings} porções`
              : "Porções não informadas"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-green-600 mr-1">Dificuldade:</span>
          <DifficultyRating difficulty={recipe.difficulty} />
        </div>
      </div>

      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 pb-2 border-b border-green-100">
            Ingredientes
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient: Ingredient, index: number) =>
              ingredient.ingredientName ? (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <ChevronRight
                    size={18}
                    className="text-green-500 mt-1 flex-shrink-0"
                  />
                  <span>
                    <strong>{ingredient.ingredientName}</strong>
                    {ingredient.quantity > 0 && ` - ${ingredient.quantity}`}
                    {ingredient.unit && ` ${ingredient.unit}`}
                  </span>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      {recipe.instructions && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 pb-2 border-b border-green-100">
            Instruções
          </h2>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
            {recipe.instructions.split("\n").map(
              (instruction, index) =>
                instruction.trim() && (
                  <p key={index} className="mb-4">
                    {instruction}
                  </p>
                )
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isLiked
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
          }`}
        >
          <Heart size={20} className={isLiked ? "fill-white" : "fill-none"} />
          <span>{isLiked ? "Curtido" : "Curtir"}</span>
        </button>
        <button
          onClick={handleFavorite}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isFavorited
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
          }`}
        >
          <Star
            size={20}
            className={isFavorited ? "fill-white" : "fill-none"}
          />
          <span>{isFavorited ? "Favoritado" : "Favoritar"}</span>
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
