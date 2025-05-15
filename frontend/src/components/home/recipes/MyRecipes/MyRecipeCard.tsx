"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { deleteRecipe } from "../../../../services/recipeService"
import { Edit, Trash2, Clock, Utensils, Calendar, Heart, Bot } from "lucide-react"
import DifficultyRating from "../DifficultyRating"

interface RecipeCardProps {
  id: string
  title: string
  description?: string
  image?: string
  prepTime?: number
  servings?: number
  difficulty?: number
  isGeneratedByAI?: boolean
  createdAt?: string
  likes?: number
  onDelete: (id: string) => void
}

const MyRecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  description,
  image,
  prepTime,
  servings,
  difficulty,
  isGeneratedByAI,
  createdAt,
  likes,
  onDelete,
}) => {
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta receita?")) {
      try {
        await deleteRecipe(id)
        onDelete(id)
        alert("Receita excluída com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir receita:", error)
        alert("Erro ao excluir receita.")
      }
    }
  }

  const handleEdit = () => {
    navigate(`/home/edit-recipe/${id}`)
  }

  const handleView = () => {
    navigate(`/home/recipe/${id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/300"}
          alt={title}
          className="w-full h-40 object-cover cursor-pointer transition-transform hover:scale-105 duration-300"
          onClick={handleView}
        />
        {isGeneratedByAI && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
            Gerada por IA
            <Bot size={16} />
            </span>
        )}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleEdit}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-500 transition-colors"
            aria-label="Editar receita"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            aria-label="Excluir receita"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-bold text-gray-800 cursor-pointer hover:text-green-600 transition-colors"
          onClick={handleView}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{description || "Sem descrição disponível."}</p>
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Clock size={16} className="text-green-600" />
            {prepTime ? `${prepTime} min` : "Tempo não informado"}
          </span>
          <span className="flex items-center gap-1">
            <Utensils size={16} className="text-green-600" />
            {servings ? `${servings} porções` : "Porções não informadas"}
          </span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-green-600 mr-1">Dificuldade:</span>
            <DifficultyRating difficulty={difficulty} />
          </div>
          {createdAt && (
            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-green-600" />
              {new Date(createdAt).toLocaleDateString("pt-BR")}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-center gap-1 text-sm text-green-700 font-medium">
          <Heart size={16} className="fill-green-600 text-green-600" />
          <span>{likes || 0} curtidas</span>
        </div>
      </div>
    </div>
  )
}

export default MyRecipeCard
