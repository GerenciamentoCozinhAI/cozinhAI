// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AuthCallback from "./pages/auth/AuthCallback";
import AuthError from "./pages/errors/AuthError";
import Home from "./pages/home/Home";
import HomeMain from "./pages/home/HomeMain";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";

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

        <Route path="recipes" element={<div>Receitas</div>} />

        {/* Exemplo de rota interna */}
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <div>meu perfil</div>
            </PrivateRoute>
          }
        />

        {/* Outras rotas específicas */}
        <Route
          path="my-recipes"
          element={
            <PrivateRoute>
              <div>Conteúdo Protegido</div>
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
