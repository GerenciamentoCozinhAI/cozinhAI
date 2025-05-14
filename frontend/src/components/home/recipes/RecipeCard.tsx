"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { Clock, Utensils, Calendar, Heart } from "lucide-react"
import DifficultyRating from "./DifficultyRating"

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
}

const RecipeCard: React.FC<RecipeCardProps> = ({
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
}) => {
  const navigate = useNavigate()

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
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium">
            Gerada por IA
          </span>
        )}
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

export default RecipeCard
