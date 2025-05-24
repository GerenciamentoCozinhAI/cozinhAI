import type React from "react"
import { useState, useEffect } from "react"
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react"

interface RecipeSortProps {
  onSort: (sort: { field: "createdAt" | "likes" | "difficulty" | "prepTime"; order: "asc" | "desc" }) => void
  sort?: { field: "createdAt" | "likes" | "difficulty" | "prepTime"; order: "asc" | "desc" }
}

const sortOptions = [
  { label: "Mais recente", value: "createdAt" },
  { label: "Likes", value: "likes" },
  { label: "Dificuldade", value: "difficulty" },
  { label: "Tempo de Preparo", value: "prepTime" },
]

const RecipeSortNavbar: React.FC<RecipeSortProps> = ({ onSort, sort }) => {
  const [field, setField] = useState<"createdAt" | "likes" | "difficulty" | "prepTime">(sort?.field || "createdAt")
  const [order, setOrder] = useState<"asc" | "desc">(sort?.order || "desc")

  // Atualiza o estado local se o sort externo mudar
  useEffect(() => {
    if (sort) {
      setField(sort.field)
      setOrder(sort.order)
    }
  }, [sort])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = e.target.value as "createdAt" | "likes" | "difficulty" | "prepTime"
    setField(newField)
    onSort({ field: newField, order })
  }

  const toggleOrder = () => {
    const newOrder = order === "asc" ? "desc" : "asc"
    setOrder(newOrder)
    onSort({ field, order: newOrder })
  }

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-green-800 font-medium">Ordenar por:</span>
      <select
        value={field}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-green-800"
      >
        {sortOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={toggleOrder}
        className="text-green-700 hover:text-green-900 flex items-center"
        title={order === "asc" ? "Ordem crescente" : "Ordem decrescente"}
      >
        {order === "asc" ? <ArrowUpWideNarrow className="h-5 w-5" /> : <ArrowDownWideNarrow className="h-5 w-5" />}
      </button>
    </div>
  )
}

export default RecipeSortNavbar