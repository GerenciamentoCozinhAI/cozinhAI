import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../../services/recipeService";
import { addFavorite, removeFavorite } from "../../../services/favoriteService";
import { addLike, removeLike } from "../../../services/likeService";

import Loading from "../../../components/loading/Loading";

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        const data = await getRecipeById(id);
        setRecipe(data);
        setIsLiked(data.isLiked || false); // Supondo que o backend retorna se o usuário curtiu
        setIsFavorited(data.isFavorited || false); // Supondo que o backend retorna se o usuário favoritou
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <img
        src={recipe.image || "https://via.placeholder.com/600"}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
      <p className="text-gray-600 mb-4">{recipe.description || "Sem descrição disponível."}</p>
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>⏱️ {recipe.prepTime ? `${recipe.prepTime} min` : "Tempo não informado"}</span>
        <span>🍽️ {recipe.servings ? `${recipe.servings} porções` : "Porções não informadas"}</span>
        <span>🔥 Dificuldade: {recipe.difficulty || "Não informada"}</span>
      </div>
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ingredientes</h2>
          <ul className="list-disc list-inside text-gray-600">
            {recipe.ingredients.map((ingredient: any, index: number) => (
              <li key={index}>
                {ingredient.ingredientName} - {ingredient.quantity > 0 && `${ingredient.quantity} `} {ingredient.unit}
              </li>
            ))}
          </ul>
        </div>
      )}
      {recipe.instructions && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Instruções</h2>
          <p className="text-gray-600 whitespace-pre-line">{recipe.instructions}</p>
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded ${
            isLiked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {isLiked ? "❤️ Curtido" : "🤍 Curtir"}
        </button>
        <button
          onClick={handleFavorite}
          className={`px-4 py-2 rounded ${
            isFavorited ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {isFavorited ? "⭐ Favoritado" : "☆ Favoritar"}
        </button>
      </div>
    </div>
  );
};

export default RecipePage;