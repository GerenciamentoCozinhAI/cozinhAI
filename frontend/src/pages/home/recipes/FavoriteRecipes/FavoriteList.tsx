import React, { useEffect, useState } from "react";
import { getAllFavorites } from "../../../../services/favoriteService";
import RecipeCard from "../../../../components/home/recipes/RecipeCard";
import Loading from "../../../../components/loading/Loading";

const FavoriteList: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getAllFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Erro ao buscar receitas favoritas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (isLoading) {
    return <Loading message="Carregando favoritos..." />;
  }

  if (favorites.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Nenhuma receita favorita encontrada.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((favorite) => (
        <RecipeCard
          key={favorite.recipe.id}
          id={favorite.recipe.id}
          title={favorite.recipe.title}
          description={favorite.recipe.description}
          image={favorite.recipe.image}
          prepTime={favorite.recipe.prepTime}
          servings={favorite.recipe.servings}
          difficulty={favorite.recipe.difficulty}
          isGeneratedByAI={favorite.recipe.isGeneratedByAI}
          createdAt={favorite.recipe.createdAt}
          likes={favorite.recipe.likes}
        />
      ))}
    </div>
  );
};

export default FavoriteList;
