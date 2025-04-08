import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
        Bem-vindo ao CozinhAI! 👨‍🍳
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-md">
        Aqui você pode compartilhar e descobrir receitas incríveis! Explore, crie e inspire-se na cozinha.
      </p>
      <button
        className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600 transition duration-200"
        onClick={logout}
      >
        Sair
      </button>
    </div>
  );
}
