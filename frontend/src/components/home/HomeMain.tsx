// src/pages/home/HomeMain.tsx
export default function HomeMain() {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#1f5f3d]">
          Bem-vindo!
        </h1>
        <img
          src="/logos/Logo CozinhAI.png"
          alt="Logo"
          className="mx-auto w-1/3 h-auto"
        />
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Aqui você pode compartilhar e descobrir receitas incríveis! Explore, crie e inspire-se na cozinha.
        </p>
      </div>
    );
  }
  