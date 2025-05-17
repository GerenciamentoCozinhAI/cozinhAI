import React, { useEffect, useState } from "react";
import { getMyRecipes } from "../../../../services/recipeService";
import MyRecipeCard from "../../../../components/home/recipes/MyRecipes/MyRecipeCard";
import Loading from "../../../../components/loading/Loading";

const MyRecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const data = await getMyRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Erro ao buscar minhas receitas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  const handleDelete = (id: string) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
  };

  if (isLoading) {
    return <Loading message="Carregando suas receitas..." />;
  }

  if (recipes.length === 0) {
    return <p className="text-center text-gray-500">Nenhuma receita encontrada.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <MyRecipeCard
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
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MyRecipeList;