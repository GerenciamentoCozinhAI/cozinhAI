//src/pages/home/recipes/EditRecipe.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../../../../components/home/recipes/RecipeForm";
import {
  getRecipeById,
  updateRecipe,
} from "../../../../services/recipeService";
import Loading from "../../../../components/loading/Loading";
import { useToast } from "../../../../contexts/ToastContext";

const EditRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Erro ao buscar receita:", error);
        showToast("Erro ao carregar a receita.", "error");
        navigate("/home/my-recipes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate, showToast]);

  const handleSuccess = () => {
    navigate("/home/my-recipes");
  };

  const handleSubmit = async (updatedRecipe: any) => {
    if (!id) return;

    try {
      await updateRecipe(id, updatedRecipe);
      showToast("Receita atualizada com sucesso!", "success");
      handleSuccess();
    } catch (error) {
      console.error("Erro ao atualizar receita:", error);
      showToast("Erro ao atualizar receita.", "error");
    }
  };

  if (isLoading) {
    return <Loading message="Carregando receita para edição..." />;
  }

  if (!recipe) {
    return <p className="text-center text-gray-500">Receita não encontrada.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <RecipeForm
        onSuccess={handleSuccess}
        initialData={recipe}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditRecipe;
