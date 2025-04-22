// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AuthError from './pages/errors/AuthError';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
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
