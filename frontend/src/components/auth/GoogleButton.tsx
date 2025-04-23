import React from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc"; // Ícone do Google

const GoogleButton: React.FC = () => {
    const { loginWithGoogle } = useAuth();

    const handleLogin = async () => {
        try {
            await loginWithGoogle();

        } catch (error) {
            console.error("Erro ao fazer login com o Google:", error);
        }
    };

    return (
        <button
            onClick={handleLogin}
            className="flex items-center justify-center px-4 py-2 rounded bg-gray-100 text-gray-700 text-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
        >
            <FcGoogle className="w-5 h-5 mr-2" /> {/* Ícone confiável do Google */}
            Entrar com o Google
        </button>
    );
};

export default GoogleButton;