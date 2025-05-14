// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AuthCallback from "./pages/auth/AuthCallback";
import AuthError from "./pages/errors/AuthError";
import Home from "./pages/home/Home";
import HomeMain from "./components/home/HomeMain";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import UserProfile from "./components/home/userProfile/UserProfile";
import MyRecipeList from "./pages/home/recipes/MyRecipeList";
import RecipeList from "./pages/home/recipes/RecipeList";
import RecipePage from "./pages/home/recipes/RecipePage";
import CreateRecipe from "./pages/home/recipes/CreateRecipe";
import EditRecipe from "./pages/home/recipes/EditRecipe";

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
              <div>Conteúdo Protegido</div>
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
          path="ChefIA"
          element={
            <PrivateRoute>
              <div>Conteúdo Protegido</div>
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}
