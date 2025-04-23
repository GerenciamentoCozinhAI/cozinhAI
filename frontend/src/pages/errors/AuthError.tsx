// src/pages/errors/AuthError.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ErrorAuth from "../../components/error/ErrorAuth";

const AuthError = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return <ErrorAuth />;
};

export default AuthError;
