import { create } from "zustand";

type Role = {
  id: number;
  name: string;
  rank: number; // 1 = admin, 2 = moderator
};

type User = {
  id: number;
  email: string;
  username: string;
  bio: string;
  avatar: string | null;
  isEmailVerified: boolean;
  registrationDate: string;
  updateDate: string;
  roleId: number;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isModerator: () => boolean;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  initialized: false,

  initialize: async () => {
    const storedToken = localStorage.getItem("auth_token");

    if (!storedToken) {
      set({ token: null, user: null, initialized: true });
      return;
    }

    try {
      const res = await fetch("http://localhost:8081/api/user", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!res.ok) throw new Error("Token invalide ou expiré");

      const user = await res.json();

      set({
        token: storedToken,
        user,
        initialized: true,
      });
    } catch (err) {
      console.error("Erreur lors de l'initialisation :", err);
      localStorage.removeItem("auth_token");
      set({ token: null, user: null, initialized: true });
    }
  },

  login: async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const json = await res.json();

      localStorage.setItem("auth_token", json.access_token);

      set({
        token: json.access_token,
        user: json.user,
      });

      return true;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    set({ user: null, token: null });
  },

  isAdmin: () => get().user?.roleId === 1,
  isModerator: () => get().user?.roleId === 2,
}));
