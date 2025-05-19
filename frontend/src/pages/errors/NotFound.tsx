import { Link } from "react-router-dom";
import { ChefHat, Home, UtensilsCrossed } from "lucide-react";
import gif404 from "../../assets/404-icon.gif";

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white text-center">
          <ChefHat className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">404</h1>
          <p className="text-xl md:text-2xl font-medium mt-2">
            Receita não encontrada
          </p>
        </div>

        <div className="p-8 text-center">
          {/* Lordicon GIF */}
          <img
            src={gif404}
            alt="404"
            className="mx-auto w-48 h-48 mb-8"
          />

          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Ops! Esta página não está no nosso menu
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Parece que você está procurando uma receita que ainda não
            preparamos. Que tal voltar para nossa cozinha principal?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/home"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="h-4 w-4" />
              Voltar para o início
            </Link>
            <Link
              to="/home/recipes"
              className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <UtensilsCrossed className="h-4 w-4" />
              Explorar receitas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
