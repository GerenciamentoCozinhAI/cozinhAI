import { useState, useEffect } from "react"

interface LoadingProps {
  type?: "spinner" | "dots" | "bar"
  message?: string
  showTips?: boolean
}

export default function Loading({
  type = "spinner",
  message = "Carregando, por favor aguarde...",
  showTips = true,
}: LoadingProps) {
  const [tipIndex, setTipIndex] = useState(0)

  const tips = [
    "Sabia que você pode salvar suas receitas favoritas?",
    "Experimente especificar restrições alimentares nas suas buscas.",
    "Você pode compartilhar receitas com amigos e família.",
    "Temos receitas para todos os níveis de habilidade culinária.",
    "Use ingredientes da estação para receitas mais saborosas e econômicas.",
  ]

  useEffect(() => {
    if (!showTips) return

    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % tips.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [showTips, tips.length])

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      {type === "spinner" && (
        <div className="relative">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <div
            className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-green-400 rounded-full animate-spin"
            style={{ animationDuration: "1.5s" }}
          ></div>
        </div>
      )}

      {type === "dots" && (
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-green-600 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.8s",
              }}
            ></div>
          ))}
        </div>
      )}

      {type === "bar" && (
        <div className="w-64 h-2 bg-green-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 rounded-full animate-progress"></div>
        </div>
      )}

      <p className="text-center text-gray-700 font-medium mt-6 mb-2">{message}</p>

      {showTips && (
        <div className="mt-8 max-w-md">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-green-800 italic">
              <span className="font-semibold">Dica:</span> {tips[tipIndex]}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes progress {
          0% { width: 0; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 0; transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}