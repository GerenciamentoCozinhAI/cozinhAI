import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorAuth: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 text-gray-800">
            <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
            <p className="text-lg mb-6">Você deveria estar logado para acessar essa funcionalidade.</p>
            <button
                className="px-6 py-3 text-white bg-green-500 rounded hover:bg-green-600 transition"
                onClick={handleGoBack}
            >
                Ir para a página de login
            </button>
        </div>
    );
};

export default ErrorAuth;
