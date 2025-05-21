import type React from "react"
import { useState, useEffect } from "react"
import { Search, Clock, ChefHat, Cpu, X, Filter, Trash2 } from "lucide-react"

interface RecipeFilterProps {
  onFilter: (filters: {
    search?: string
    difficulty?: number
    maxPrepTime?: number
    ingredient?: string
    isGeneratedByAI?: boolean
  }) => void
}

const RecipeFilterNavbar: React.FC<RecipeFilterProps> = ({ onFilter }) => {
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState<number | "">("")
  const [maxPrepTime, setMaxPrepTime] = useState<number | "">("")
  const [ingredient, setIngredient] = useState("")
  const [isGeneratedByAI, setIsGeneratedByAI] = useState<null | boolean>(null)
  const [activeFilters, setActiveFilters] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  // Calcula quantos filtros estão ativos
  useEffect(() => {
    let count = 0
    if (search) count++
    if (difficulty !== "") count++
    if (maxPrepTime !== "") count++
    if (ingredient) count++
    if (isGeneratedByAI !== null) count++
    setActiveFilters(count)
  }, [search, difficulty, maxPrepTime, ingredient, isGeneratedByAI])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter({
      search: search || undefined,
      difficulty: difficulty ? Number(difficulty) : undefined,
      maxPrepTime: maxPrepTime ? Number(maxPrepTime) : undefined,
      ingredient: ingredient || undefined,
      isGeneratedByAI: isGeneratedByAI === null ? undefined : isGeneratedByAI,
    })
  }

  const handleClearFilters = () => {
    setSearch("")
    setDifficulty("")
    setMaxPrepTime("")
    setIngredient("")
    setIsGeneratedByAI(null)

    onFilter({})
  }

  const toggleExpand = (e: React.MouseEvent) => {
    // Evitar que cliques em botões dentro do cabeçalho acionem a expansão/retração
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest("button") || e.target.closest("input") || e.target.closest("select"))
    ) {
      return
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-green-50 rounded-lg mb-6 shadow">
      <div className="p-4 flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
        <h2 className="text-lg font-medium text-green-800 flex items-center">
          <Filter className="mr-2 h-5 w-5 flex-shrink-0" />
          Filtrar Receitas
          {activeFilters > 0 && (
            <span className="ml-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {activeFilters}
            </span>
          )}
        </h2>
        <div className="flex gap-2">
          {activeFilters > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleClearFilters()
              }}
              className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
              title="Limpar todos os filtros"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Limpar
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="text-green-700 hover:text-green-900"
            aria-expanded={isExpanded}
          >
            {isExpanded ? <X className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end p-4 pt-0">
            <div className="filter-group">
              <div className="flex items-center mb-1">
                <Search className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-700">Buscar</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Título ou descrição"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="filter-input pl-8 w-full sm:w-60"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="filter-group">
              <div className="flex items-center mb-1">
                <ChefHat className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-700">Dificuldade</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={10}
                  placeholder="1-10"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value ? Number(e.target.value) : "")}
                  className="filter-input w-full sm:w-20"
                />
                {difficulty && (
                  <button
                    type="button"
                    onClick={() => setDifficulty("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="filter-group">
              <div className="flex items-center mb-1">
                <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-700">Tempo máx. (min)</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  placeholder="Ex: 30"
                  value={maxPrepTime}
                  onChange={(e) => setMaxPrepTime(e.target.value ? Number(e.target.value) : "")}
                  className="filter-input w-full sm:w-20"
                />
                {maxPrepTime && (
                  <button
                    type="button"
                    onClick={() => setMaxPrepTime("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="filter-group">
              <div className="flex items-center mb-1">
                <ShoppingBag className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-700">Ingrediente</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Frango"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  className="filter-input w-full sm:w-32"
                />
                {ingredient && (
                  <button
                    type="button"
                    onClick={() => setIngredient("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="filter-group">
              <div className="flex items-center mb-1">
                <Cpu className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-700">Gerada por IA?</span>
              </div>
              <select
                value={isGeneratedByAI === null ? "" : isGeneratedByAI ? "sim" : "nao"}
                onChange={(e) => setIsGeneratedByAI(e.target.value === "" ? null : e.target.value === "sim")}
                className="filter-input w-full sm:w-24"
              >
                <option value="">-</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Aplicar Filtros
              </button>

              {activeFilters > 0 && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors"
                >
                  Limpar
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Resumo dos filtros ativos quando colapsado */}
      {!isExpanded && activeFilters > 0 && (
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {search && <FilterTag label={`Busca: ${search}`} onRemove={() => setSearch("")} />}
          {difficulty !== "" && <FilterTag label={`Dificuldade: ${difficulty}`} onRemove={() => setDifficulty("")} />}
          {maxPrepTime !== "" && (
            <FilterTag label={`Tempo máx: ${maxPrepTime} min`} onRemove={() => setMaxPrepTime("")} />
          )}
          {ingredient && <FilterTag label={`Ingrediente: ${ingredient}`} onRemove={() => setIngredient("")} />}
          {isGeneratedByAI !== null && (
            <FilterTag label={`IA: ${isGeneratedByAI ? "Sim" : "Não"}`} onRemove={() => setIsGeneratedByAI(null)} />
          )}
        </div>
      )}
    </div>
  )
}

// Componente para tags de filtro
const FilterTag: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => {
  return (
    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
      {label}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        className="ml-1 text-green-600 hover:text-green-800"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

// Ícone de seta para baixo
const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

// Ícone de sacola de compras
const ShoppingBag: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
)

export default RecipeFilterNavbar
