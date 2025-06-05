// src/pages/home/recipes/CreateRecipe.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../../../../components/home/recipes/RecipeForm";

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redireciona para a página de lista de receitas ou outra página após criar a receita
    navigate("/home/my-recipes");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <RecipeForm onSuccess={handleSuccess} />
    </div>
  );
};

export default CreateRecipe;
