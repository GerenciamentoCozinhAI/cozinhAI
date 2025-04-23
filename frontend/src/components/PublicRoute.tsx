import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function PublicRoute({
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
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
