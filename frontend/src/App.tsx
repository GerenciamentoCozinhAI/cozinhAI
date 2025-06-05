// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AuthCallback from "./pages/auth/AuthCallback";
import AuthError from "./pages/errors/AuthError";
import NotFound from "./pages/errors/NotFound";
import Home from "./pages/home/Home";
import HomeMain from "./components/home/HomeMain";
import LandingPage from "./pages/landing/LandingPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import UserProfile from "./components/home/userProfile/UserProfile";
import MyRecipeList from "./pages/home/recipes/MyRecipes/MyRecipeList";
import RecipeList from "./pages/home/recipes/AllRecipes/RecipeList";
import RecipePage from "./pages/home/recipes/AllRecipes/RecipePage";
import CreateRecipe from "./pages/home/recipes/AllRecipes/CreateRecipe";
import CreateIARecipe from "./pages/home/recipes/AllRecipes/CreateIARecipe";
import EditRecipe from "./pages/home/recipes/AllRecipes/EditRecipe";
import FavoriteList from "./pages/home/recipes/FavoriteRecipes/FavoriteList";
import About from "./pages/landing/About";

export default function App() {
  return (
    <Routes>
      {/* LandingPage pública, fora do layout Home */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />

      <Route
        path="/about"
        element={
            <About />  
        }
      />

      {/* Register e Login também públicas */}
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      {/* Página 404 - Not Found GERAL*/}
      <Route path="*" element={<NotFound />} />

      {/* Callback de auth e erro */}
      <Route path="auth/callback" element={<AuthCallback />} />

      {/* HOME é o layout MÃE para tudo que não for LandingPage */}
      <Route path="/home" element={<Home />}>
        {/* Aqui dentro vão as rotas FILHAS, renderizadas no <Outlet /> do Home */}

        {/* Exemplo de uma página inicial ao acessar /home */}
        <Route index element={<HomeMain />} />

        <Route
          path="auth-error"
          element={
            <PublicRoute>
              <AuthError />
            </PublicRoute>
          }
        />

        {/*Página 404 - Not Found de Home*/}
        <Route path="*" element={<NotFound />} />

        <Route path="recipes" element={<RecipeList />} />

        <Route path="recipe/:id" element={<RecipePage />} />

        {/* Exemplo de rota interna */}
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        {/* Outras rotas específicas */}
        <Route
          path="my-recipes"
          element={
            <PrivateRoute>
              <MyRecipeList />
            </PrivateRoute>
          }
        />

        <Route
          path="favorites"
          element={
            <PrivateRoute>
              <FavoriteList />
            </PrivateRoute>
          }
        />

        <Route
          path="create-recipe"
          element={
            <PrivateRoute>
              <CreateRecipe />
            </PrivateRoute>
          }
        />

        <Route
          path="edit-recipe/:id"
          element={
            <PrivateRoute>
              <EditRecipe />
            </PrivateRoute>
          }
        />

        <Route
          path="Chef-IA"
          element={
            <PrivateRoute>
              <CreateIARecipe />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}
