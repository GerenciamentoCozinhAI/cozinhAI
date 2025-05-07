import React from "react"
import { Flame } from 'lucide-react'

interface DifficultyRatingProps {
  difficulty?: number
}

const DifficultyRating: React.FC<DifficultyRatingProps> = ({ difficulty }) => {
  if (!difficulty) return <span className="text-gray-500">Não informada</span>

  // Limitar a dificuldade entre 1 e 10
  const level = Math.max(1, Math.min(10, difficulty))

  // Calcular quantas chamas completas (cada uma vale 2 pontos)
  const fullFlames = Math.floor(level / 2)
  // Verificar se há meia chama (valor ímpar)
  const hasHalfFlame = level % 2 !== 0
  // Calcular chamas vazias
  const emptyFlames = 5 - fullFlames - (hasHalfFlame ? 1 : 0)

  return (
    <div className="flex items-center" aria-label={`Dificuldade ${level} de 10`}>
      {/* Chamas completas */}
      {Array(fullFlames)
        .fill(0)
        .map((_, i) => (
          <Flame key={`full-${i}`} size={16} className="text-green-600 fill-green-600" />
        ))}

      {/* Meia chama (se necessário) */}
      {hasHalfFlame && (
        <div className="relative w-4 h-4">
          <Flame size={16} className="absolute text-gray-300 fill-gray-300" />
          <div className="absolute overflow-hidden w-2 h-4">
            <Flame size={16} className="text-green-600 fill-green-600" />
          </div>
        </div>
      )}

      {/* Chamas vazias */}
      {Array(emptyFlames)
        .fill(0)
        .map((_, i) => (
          <Flame key={`empty-${i}`} size={16} className="text-gray-400" />
        ))}
    </div>
  )
}

export default DifficultyRating
