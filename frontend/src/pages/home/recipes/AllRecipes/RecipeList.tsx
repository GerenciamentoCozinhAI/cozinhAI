import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../../../services/recipeService";
import RecipeCard from "../../../../components/home/recipes/RecipeCard";
import Loading from "../../../../components/loading/Loading";
import RecipeFilterNavbar from "../../../../components/home/recipes/RecipeFilterNavbar";

interface Filters {
    search?: string;
    difficulty?: number;
    maxPrepTime?: number;
    ingredient?: string;
    isGeneratedByAI?: boolean;
  }

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<Filters>({});

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

  // Função para filtrar receitas conforme os filtros selecionados
  const filteredRecipes = recipes.filter((recipe) => {
  if (
    filters.search &&
    !recipe.title.toLowerCase().includes(filters.search.toLowerCase()) &&
    !recipe.description.toLowerCase().includes(filters.search.toLowerCase())
  ) {
    return false;
  }
  // Corrigido: converte difficulty para número antes de comparar
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
    return <Loading message="Carregando receitas..." />;
  }

  return (
    <div>
      <RecipeFilterNavbar onFilter={setFilters} />
      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma receita encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
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
              user={recipe.user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;