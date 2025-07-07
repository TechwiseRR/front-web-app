import React, { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialized = useAuthStore((state) => state.initialized);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  if (!initialized) {
    return <div>Chargement...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
