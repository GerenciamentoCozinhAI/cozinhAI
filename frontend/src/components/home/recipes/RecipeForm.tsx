"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createRecipe } from "../../../services/recipeService"
import { searchIngredients } from "../../../services/ingredientService"
import { Clock, Users, BarChart3, ImageIcon, Plus, Trash2, Save, ChefHat } from "lucide-react"

interface Ingredient {
  name: string
  quantity: number
  unit: string
  ingredientName?: string
}

interface RecipeData {
  title: string
  description: string
  prepTime?: number
  servings?: number
  difficulty?: number
  image: string
  ingredients: Ingredient[]
  instructions: string
}

interface RecipeFormProps {
  onSuccess: () => void
  initialData?: RecipeData
  onSubmit?: (data: RecipeData) => Promise<void>
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSuccess, initialData, onSubmit }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [prepTime, setPrepTime] = useState<number | undefined>()
  const [servings, setServings] = useState<number | undefined>()
  const [difficulty, setDifficulty] = useState<number | undefined>(5)
  const [image, setImage] = useState("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: 0, unit: "" }])
  const [instructions, setInstructions] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState("")

  // Preencher dados ao editar
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setPrepTime(initialData.prepTime)
      setServings(initialData.servings)
      setDifficulty(initialData.difficulty)
      setImage(initialData.image)
      setPreviewImage(initialData.image)
      const normalizedIngredients = initialData.ingredients.map((ing) => ({
        name: ing.name || ing.ingredientName || "",
        quantity: ing.quantity,
        unit: ing.unit,
      }))
      setIngredients(normalizedIngredients)
      setInstructions(initialData.instructions)
    }
  }, [initialData])

  // Update preview image when image URL changes
  useEffect(() => {
    if (image) {
      setPreviewImage(image)
    }
  }, [image])

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
        alert("Ingrediente já adicionado!")
        return
      }
    }

    setIngredients(updatedIngredients)

    if (field === "name") {
      setActiveIngredientIndex(index)
      if (typeof value === "string" && value.length > 1) {
        try {
          const results = await searchIngredients(value)
          // Filtra sugestões para não mostrar ingredientes já adicionados
          const addedNames = ingredients.filter((_, i) => i !== index).map((ing) => ing.name.trim().toLowerCase())
          const filteredSuggestions = results
            .map((ingredient: any) => ingredient.name)
            .filter((name: string) => !addedNames.includes(name.trim().toLowerCase()))
          setSuggestions(filteredSuggestions)
        } catch (error) {
          console.error("Erro ao buscar sugestões de ingredientes:", error)
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

    const formData: RecipeData = {
      title,
      description,
      prepTime,
      servings,
      difficulty,
      image,
      ingredients,
      instructions,
    }

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        await createRecipe(formData)
        alert("Receita criada com sucesso!")
      }
      onSuccess()
    } catch (error) {
      console.error("Erro ao salvar receita:", error)
      alert("Erro ao salvar receita.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEditMode = !!initialData

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <ChefHat className="h-8 w-8 text-green-500" />
        <h1 className="text-3xl font-bold text-gray-800">{isEditMode ? "Editar Receita" : "Criar Nova Receita"}</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Coluna da esquerda */}
        <div>
          {/* Título e descrição */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Título da Receita</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Ex: Bolo de Chocolate Caseiro"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all min-h-[120px]"
              placeholder="Descreva brevemente sua receita..."
            />
          </div>

          {/* Detalhes da receita */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Clock className="h-4 w-4 text-green-500" />
                Tempo
              </label>
              <input
                type="number"
                value={prepTime || ""}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Minutos"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Users className="h-4 w-4 text-green-500" />
                Porções
              </label>
              <input
                type="number"
                value={servings || ""}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="4"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <BarChart3 className="h-4 w-4 text-green-500" />
                Dificuldade
              </label>
              <input
                type="number"
                value={difficulty ?? ""}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="1-10"
                min={1}
                max={10}
              />
            </div>
          </div>

          {/* Imagem */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <ImageIcon className="h-4 w-4 text-green-500" />
              Imagem da Receita (Opcional)
            </label>
            <input
              type="text"
              placeholder="URL da imagem (preferencialmente do Unsplash)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            {previewImage && (
              <div className="mt-3 relative rounded-lg overflow-hidden h-48">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewImage("")}
                />
              </div>
            )}
          </div>
        </div>

        {/* Coluna da direita */}
        <div>
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
                        required
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
                        required
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

          {/* Instruções */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Modo de Preparo</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all min-h-[200px]"
              placeholder="Descreva passo a passo como preparar esta receita..."
              required
            />
          </div>
        </div>
      </div>

      {/* Botão de submissão */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all ${
            isEditMode ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          <Save className="h-5 w-5" />
          {isSubmitting ? "Enviando..." : isEditMode ? "Salvar Alterações" : "Criar Receita"}
        </button>
      </div>
    </form>
  )
}

export default RecipeForm
