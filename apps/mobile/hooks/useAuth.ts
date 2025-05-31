import { useState, useEffect } from 'react';

export function useAuth() {
  // Simulación: reemplaza esto por la lógica real de Supabase en la fase 4
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí iría la comprobación real de sesión
    setTimeout(() => {
      setUser(null); // null = no autenticado, objeto = autenticado
      setLoading(false);
    }, 500); // Simula carga
  }, []);

  return { user, loading };
} 