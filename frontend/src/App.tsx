// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AuthCallback from './pages/auth/AuthCallback';
import AuthError from './pages/errors/AuthError';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute'; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      
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

      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/auth-error" element={<AuthError />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
