import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "../components/ui/Toast";

type ToastType = "success" | "error" | "info";

interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast deve ser usado dentro do ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type?: ToastType;
    duration?: number;
  } | null>(null);

  const showToast = (message: string, type: ToastType = "info", duration = 3000) => {
    setToast({ message, type, duration });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}