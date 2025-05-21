import React, { useState } from "react";

interface RecipeFilterProps {
  onFilter: (filters: {
    search?: string;
    difficulty?: number;
    maxPrepTime?: number;
    ingredient?: string;
    isGeneratedByAI?: boolean;
  }) => void;
}

const RecipeFilterNavbar: React.FC<RecipeFilterProps> = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<number | "">("");
  const [maxPrepTime, setMaxPrepTime] = useState<number | "">("");
  const [ingredient, setIngredient] = useState("");
  const [isGeneratedByAI, setIsGeneratedByAI] = useState<null | boolean>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      search: search || undefined,
      difficulty: difficulty ? Number(difficulty) : undefined,
      maxPrepTime: maxPrepTime ? Number(maxPrepTime) : undefined,
      ingredient: ingredient || undefined,
      isGeneratedByAI: isGeneratedByAI === null ? undefined : isGeneratedByAI,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 items-end bg-green-50 p-4 rounded-lg mb-6 shadow"
    >
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Buscar</label>
        <input
          type="text"
          placeholder="Título ou descrição"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-40"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Dificuldade</label>
        <input
          type="number"
          min={1}
          max={10}
          placeholder="1-10"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-20"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Tempo máx. (min)</label>
        <input
          type="number"
          min={1}
          placeholder="Ex: 30"
          value={maxPrepTime}
          onChange={(e) => setMaxPrepTime(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-20"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Ingrediente</label>
        <input
          type="text"
          placeholder="Ex: Frango"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="p-2 border rounded w-32"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Gerada por IA?</label>
        <select
          value={isGeneratedByAI === null ? "" : isGeneratedByAI ? "sim" : "nao"}
          onChange={(e) =>
            setIsGeneratedByAI(
              e.target.value === "" ? null : e.target.value === "sim"
            )
          }
          className="p-2 border rounded w-24"
        >
          <option value="">Todas</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Filtrar
      </button>
    </form>
  );
};

export default RecipeFilterNavbar;