import React, { useEffect, useState } from "react";
import { getMyRecipes } from "../../../../services/recipeService";
import MyRecipeCard from "../../../../components/home/recipes/MyRecipes/MyRecipeCard";
import Loading from "../../../../components/loading/Loading";
import RecipeFilterNavbar from "../../../../components/home/recipes/RecipeFilterNavbar";

interface Filters {
  search?: string;
  difficulty?: number;
  maxPrepTime?: number;
  ingredient?: string;
  isGeneratedByAI?: boolean;
}

const MyRecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({});

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

  // Filtro igual ao RecipeList
  const filteredRecipes = recipes.filter((recipe) => {
    if (
      filters.search &&
      !recipe.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !recipe.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.difficulty &&
      recipe.difficulty !== Number(filters.difficulty)
    ) {
      return false;
    }
    if (filters.maxPrepTime && recipe.prepTime > filters.maxPrepTime) {
      return false;
    }
    if (
      filters.ingredient &&
      !recipe.ingredients.some((ing: any) =>
        filters.ingredient &&
        ing.ingredientName?.toLowerCase().includes(filters.ingredient.toLowerCase())
      )
    ) {
      return false;
    }
    if (
      filters.isGeneratedByAI !== undefined &&
      filters.isGeneratedByAI !== null &&
      recipe.isGeneratedByAI !== filters.isGeneratedByAI
    ) {
      return false;
    }
    return true;
  });

  if (isLoading) {
    return <Loading message="Carregando suas receitas..." />;
  }

  return (
    <div>
      <RecipeFilterNavbar onFilter={setFilters} />
      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma receita encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
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
      )}
    </div>
  );
};

export default MyRecipeList;