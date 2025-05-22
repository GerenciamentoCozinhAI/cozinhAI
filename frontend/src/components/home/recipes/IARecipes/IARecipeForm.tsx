
import React, { useState } from "react"
import { createRecipeWithAI } from "../../../../services/recipeService"
import { searchIngredients } from "../../../../services/ingredientService"
import { Plus, Trash2, Bot, Save } from "lucide-react"
import { useToast } from "../../../../contexts/ToastContext"

interface Ingredient {
  name: string
  quantity: number
  unit: string
}

interface IARecipeFormProps {
  onSuccess: () => void
}

const IARecipeForm: React.FC<IARecipeFormProps> = ({ onSuccess }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: 0, unit: "" }])
  const [observations, setObservations] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleIngredientChange = async (index: number, field: keyof Ingredient, value: string | number) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    }

    // Impede ingredientes duplicados pelo nome (case insensitive)
    if (field === "name" && typeof value === "string") {
      const nameLower = value.trim().toLowerCase()
      const isDuplicate = ingredients.some(
        (ing, i) => i !== index && ing.name.trim().toLowerCase() === nameLower && nameLower !== "",
      )
      if (isDuplicate) {
        showToast("Ingrediente já adicionado!", "error");
        return
      }
    }

    setIngredients(updatedIngredients)

    if (field === "name") {
      setActiveIngredientIndex(index)
      if (typeof value === "string" && value.length > 1) {
        try {
          const results = await searchIngredients(value)
          const addedNames = ingredients.filter((_, i) => i !== index).map((ing) => ing.name.trim().toLowerCase())
          const filteredSuggestions = results
            .map((ingredient: any) => ingredient.name)
            .filter((name: string) => !addedNames.includes(name.trim().toLowerCase()))
          setSuggestions(filteredSuggestions)
        } catch (error) {
          setSuggestions([])
        }
      } else {
        setSuggestions([])
      }
    }
  }

  const selectSuggestion = (index: number, suggestion: string) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index].name = suggestion
    setIngredients(updatedIngredients)
    setSuggestions([])
    setActiveIngredientIndex(null)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      await createRecipeWithAI({
        ingredients,
        observations: observations.trim() || undefined,
      })
      showToast("Receita gerada com sucesso!", "success");
      onSuccess()
    } catch (error: any) {
      showToast("Erro ao gerar receita: " + error.error, "error");
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <Bot className="h-8 w-8 text-green-500" />
        <h1 className="text-2xl font-bold text-gray-800">Criar Receita com IA</h1>
      </div>

      {/* Ingredientes */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Ingredientes</label>
        <div className="bg-green-50 p-4 rounded-lg">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="mb-4 relative">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Nome"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  {activeIngredientIndex === index && suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion, i) => (
                        <li
                          key={i}
                          onClick={() => selectSuggestion(index, suggestion)}
                          className="p-3 cursor-pointer hover:bg-green-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Qtd"
                    value={ingredient.quantity || ""}
                    onChange={(e) => handleIngredientChange(index, "quantity", Number(e.target.value))}
                    className="w-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    min={0}
                  />
                  <input
                    type="text"
                    placeholder="Unidade"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                    className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"                   
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-3 text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remover ingrediente"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center gap-2 text-green-600 hover:text-green-800 cursor-pointer font-medium p-2 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Adicionar Ingrediente
          </button>
        </div>
      </div>

      {/* Observações */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Observações para a IA (opcional)</label>
        <textarea
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all min-h-[100px]"
          placeholder="Ex: Indique se quer que a IA adicione ingredientes ou não, se quer uma receita vegana, sem glúten, etc. Você pode também adicionar características da receita que você quer e não passar ingrediente algum."
          rows={8}
        />
      </div>

      {/* Botão de submissão */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all bg-green-600 hover:bg-green-700 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          <Save className="h-5 w-5" />
          {isSubmitting ? "Gerando..." : "Gerar Receita com IA"}
        </button>
      </div>
    </form>
  )
}

export default IARecipeForm