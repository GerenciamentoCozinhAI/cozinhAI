// components/ui/Toast.tsx
import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle, Info, X } from "lucide-react"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  duration?: number
  onClose: () => void
}

export default function Toast({ message, type = "info", duration = 3000, onClose }: ToastProps) {
  const [progress, setProgress] = useState(100)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const startTime = Date.now()
    const endTime = startTime + duration

    const progressInterval = setInterval(() => {
      const now = Date.now()
      const remaining = endTime - now
      const newProgress = (remaining / duration) * 100
      setProgress(Math.max(newProgress, 0))

      if (now >= endTime) {
        clearInterval(progressInterval)
      }
    }, 10)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for fade out animation
    }, duration)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [duration, onClose])

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      textColor: "text-green-800",
      progressColor: "bg-green-500",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      textColor: "text-red-800",
      progressColor: "bg-red-500",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      textColor: "text-blue-800",
      progressColor: "bg-blue-500",
    },
  }[type]

  const Icon = config.icon

  const toastClasses = `fixed top-5 right-5 w-80 rounded-lg shadow-lg overflow-hidden transition-all duration-300 z-50 ${
    config.bgColor
  } ${config.borderColor} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"}`

  const iconClasses = `shrink-0 mr-3 ${config.textColor}`
  const textClasses = `text-sm font-medium ${config.textColor}`
  const buttonClasses = `shrink-0 rounded-full p-1 hover:bg-white/20 ${config.textColor}`
  const progressClasses = `h-1 transition-all ${config.progressColor}`

  return (
    <div className={toastClasses} style={{ borderWidth: "1px", borderLeftWidth: "4px" }}>
      <div className="flex items-start p-4">
        <div className={iconClasses}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 mr-2">
          <p className={textClasses}>{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className={buttonClasses}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className={progressClasses} style={{ width: `${progress}%` }} />
    </div>
  )
}
