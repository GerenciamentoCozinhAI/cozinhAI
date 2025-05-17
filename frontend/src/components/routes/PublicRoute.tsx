import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Loading from "../loading/Loading"; // Importando o componente de loading

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
        setTimeout(() => setLoading(false), 500);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <Loading />;

  return !isAuthenticated ? <>{children}</> : <Navigate to="/home" />;
}
