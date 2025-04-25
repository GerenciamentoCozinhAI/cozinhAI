import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Importando o contexto de autenticação
import { useEffect, useState } from "react";
import Loading from "../loading/loading"; // Importando o componente de loading
import { supabase } from "../../services/supabase"; // Importando o cliente do Supabase

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error.message);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
        //setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return  <Loading/> ;

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth-error" />;
}
