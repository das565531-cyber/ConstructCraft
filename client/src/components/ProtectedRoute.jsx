import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../services/supabase";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-slate-950 text-white">
        Checking login...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;