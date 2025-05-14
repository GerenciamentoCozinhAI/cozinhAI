import React, { useState, useEffect } from "react";
import { createRecipe } from "../../../services/recipeService";
import { searchIngredients } from "../../../services/ingredientService";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  ingredientName?: string; // Adicionando o campo ingredientName para sugestões
}

interface RecipeData {
  title: string;
  description: string;
  prepTime?: number;
  servings?: number;
  difficulty?: number;
  image: string;
  ingredients: Ingredient[];
  instructions: string;
}

interface RecipeFormProps {
  onSuccess: () => void;
  initialData?: RecipeData;
  onSubmit?: (data: RecipeData) => Promise<void>;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  onSuccess,
  initialData,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState<number | undefined>();
  const [servings, setServings] = useState<number | undefined>();
  const [difficulty, setDifficulty] = useState<number | undefined>();
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: 0, unit: "" },
  ]);
  const [instructions, setInstructions] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<
    number | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preencher dados ao editar
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPrepTime(initialData.prepTime);
      setServings(initialData.servings);
      setDifficulty(initialData.difficulty);
      setImage(initialData.image);
      const normalizedIngredients = initialData.ingredients.map((ing) => ({
        name: ing.name || ing.ingredientName || "",
        quantity: ing.quantity,
        unit: ing.unit,
      }));
      setIngredients(normalizedIngredients);
      setInstructions(initialData.instructions);
    }
  }, [initialData]);

  const handleIngredientChange = async (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredients(updatedIngredients);

    if (field === "name") {
      setActiveIngredientIndex(index);
      if (typeof value === "string" && value.length > 1) {
        try {
          const results = await searchIngredients(value);
          setSuggestions(results.map((ingredient: any) => ingredient.name));
        } catch (error) {
          console.error("Erro ao buscar sugestões de ingredientes:", error);
        }
      } else {
        setSuggestions([]);
      }
    }
  };

  const selectSuggestion = (index: number, suggestion: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].name = suggestion;
    setIngredients(updatedIngredients);
    setSuggestions([]);
    setActiveIngredientIndex(null);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData: RecipeData = {
      title,
      description,
      prepTime,
      servings,
      difficulty,
      image,
      ingredients,
      instructions,
    };

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await createRecipe(formData);
        alert("Receita criada com sucesso!");
      }
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
      alert("Erro ao salvar receita.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditMode = !!initialData;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {isEditMode ? "Editar Receita" : "Criar Receita"}
      </h1>

      {/* Título, descrição, tempo, porções, dificuldade, imagem */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Descrição
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Tempo de Preparo (min)
          </label>
          <input
            type="number"
            value={prepTime || ""}
            onChange={(e) => setPrepTime(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Porções
          </label>
          <input
            type="number"
            value={servings || ""}
            onChange={(e) => setServings(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Dificuldade (1-10)
        </label>
        <input
          type="number"
          value={difficulty || ""}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          min={1}
          max={10}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Imagem (URL)
        </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Ingredientes */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Ingredientes
        </label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Nome"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="w-1/3 p-2 border border-gray-300 rounded mr-2"
                required
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", Number(e.target.value))
                }
                className="w-1/3 p-2 border border-gray-300 rounded mr-2"
                required
              />
              <input
                type="text"
                placeholder="Unidade"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                className="w-1/3 p-2 border border-gray-300 rounded mr-2"
                required
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
            {activeIngredientIndex === index && suggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded shadow-md mt-2">
                {suggestions.map((suggestion, i) => (
                  <li
                    key={i}
                    onClick={() => selectSuggestion(index, suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-green-500 hover:text-green-700"
        >
          Adicionar Ingrediente
        </button>
      </div>

      {/* Instruções */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Instruções
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Botão */}
      <button
        type="submit"
        className={`w-full ${
          isEditMode ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
        } text-white p-2 rounded transition-colors ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : isEditMode ? "Salvar Alterações" : "Criar Receita"}
      </button>
    </form>
  );
};

export default RecipeForm;
