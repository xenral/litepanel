import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  email: string;
  name?: string;
  avatar?: string;
}

export interface AuthStore {
  // State
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (token: string, user?: AuthUser) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
  updateToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      token: null,
      user: null,
      isAuthenticated: false,

      // Actions
      setAuth: (token, user) =>
        set({
          token,
          user: user || null,
          isAuthenticated: true,
        }),

      setUser: (user) => set({ user }),

      updateToken: (token) => set({ token, isAuthenticated: true }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'litecontrol-auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
