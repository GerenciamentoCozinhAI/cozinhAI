// components/ui/Modal.tsx
import type React from "react"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen && !isAnimating) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsAnimating(false)
      setTimeout(onClose, 300)
    }
  }

  const handleCloseClick = () => {
    setIsAnimating(false)
    setTimeout(onClose, 300)
  }

  const backdropClasses = `fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${
    isOpen ? "opacity-100" : "opacity-0"
  }`

  const modalClasses = `bg-white rounded-lg shadow-xl w-full max-w-md relative transition-all duration-300 ${
    isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
  }`

  return (
    <div className={backdropClasses} onClick={handleBackdropClick} aria-modal="true" role="dialog">
      <div className={modalClasses}>
        {title && (
          <div className="px-6 py-4 border-b border-green-100 bg-green-50">
            <h2 className="text-xl font-semibold text-green-800">{title}</h2>
          </div>
        )}
        <button
          onClick={handleCloseClick}
          className="absolute top-4 right-4 text-green-500 hover:text-green-700 rounded-full p-1 hover:bg-green-50 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-green-100 bg-green-50 rounded-b-lg">{footer}</div>}
      </div>
    </div>
  )
}
