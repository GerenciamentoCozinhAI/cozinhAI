import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../../../services/recipeService";
import RecipeCard from "../../../../components/home/recipes/RecipeCard";
import Loading from "../../../../components/loading/Loading";

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return <Loading message="Carregando receitas..." />;
  }

  if (recipes.length === 0) {
    return (
      <p className="text-center text-gray-500">Nenhuma receita encontrada.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          description={recipe.description}
          image={recipe.image}
          prepTime={recipe.prepTime}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
          isGeneratedByAI={recipe.isGeneratedByAI}
          createdAt={recipe.createdAt}
          likes={recipe.likes}
        />
      ))}
    </div>
  );
};

export default RecipeList;
