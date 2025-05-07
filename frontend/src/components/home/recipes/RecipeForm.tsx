import React, { useState } from "react";
import { createRecipe } from "../../../services/recipeService";
import { searchIngredients } from "../../../services/ingredientService";

interface RecipeFormProps {
  onSuccess: () => void;
  initialData?: any;
  onSubmit?: (data: any) => Promise<void>;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState<number | undefined>();
  const [servings, setServings] = useState<number | undefined>();
  const [difficulty, setDifficulty] = useState<number | undefined>();
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: number; unit: string }[]
  >([{ name: "", quantity: 0, unit: "" }]);
  const [instructions, setInstructions] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<
    number | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIngredientChange = async (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredients(updatedIngredients);

    // Definir o índice ativo
    if (field === "name") {
      setActiveIngredientIndex(index);
    }

    // Buscar sugestões de ingredientes
    if (field === "name" && typeof value === "string" && value.length > 1) {
      try {
        const results = await searchIngredients(value);
        setSuggestions(results.map((ingredient: any) => ingredient.name));
      } catch (error) {
        console.error("Erro ao buscar sugestões de ingredientes:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (index: number, suggestion: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].name = suggestion;
    setIngredients(updatedIngredients);
    setSuggestions([]);
    setActiveIngredientIndex(null); // Limpar o índice ativo
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Evita múltiplos cliques

    setIsSubmitting(true); // Desabilita o botão

    try {
      await createRecipe({
        title,
        description,
        prepTime,
        servings,
        difficulty,
        image,
        ingredients,
        instructions,
      });
      alert("Receita criada com sucesso!");
      onSuccess();
    } catch (error) {
      console.error("Erro ao criar receita:", error);
      alert("Erro ao criar receita.");
    } finally {
      setIsSubmitting(false); // Reabilita o botão após a conclusão
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Criar Receita</h1>
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
                  handleIngredientChange(
                    index,
                    "quantity",
                    Number(e.target.value)
                  )
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
            {/* Exibir sugestões */}
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
      <button
        type="submit"
        className={`w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting} // Desabilita o botão enquanto está enviando
      >
        {isSubmitting ? "Enviando..." : "Criar Receita"}
      </button>
    </form>
  );
};

export default RecipeForm;
