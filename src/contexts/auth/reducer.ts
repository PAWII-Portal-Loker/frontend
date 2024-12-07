import AuthService from "./service";
import { AuthActions, AuthState } from "./state";
import { create } from "zustand";
import { toaster } from "@/components/ui/toaster";

const authService = new AuthService();

type StoreState = AuthState & AuthActions;
const useStore = create<StoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),

  signIn: async (email, password, router) => {
    set({ isLoading: true });

    authService.signIn(
      { email, password },
      {
        onSuccess: () => {
          toaster.create({
            title: "Login successful",
            type: "success",
            duration: 3000,
          });
          router.push("/");
        },
        onError: (message: string) => {
          toaster.create({
            title: "Login failed",
            description: message || "Failed to login",
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          set({ isLoading: false });
        },
      },
    );
  },

  signUp: async (email, waNumber, password, router) => {
    set({ isLoading: true });

    authService.signUp(
      { email, password, waNumber },
      {
        onSuccess: () => {
          toaster.create({
            title: "Registration successful",
            type: "success",
            duration: 3000,
          });
          router.push("/auth/login");
        },
        onError: (message: string) => {
          toaster.create({
            title: "Registration failed",
            description: message || "Failed to register",
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          set({ isLoading: false });
        },
      },
    );
  },

  checkLogin: async () => {
    authService.isLogin({
      onSuccess: () => {
        set({ isAuthenticated: true });
      },
      onError: () => {
        set({ isAuthenticated: false });
      },
    });
  },

  signOut: async () => {
    authService.signOut({
      onSuccess: () => {
        toaster.create({
          title: "Logout successful",
          type: "success",
          duration: 3000,
        });
        set({ user: null });
        set({ isAuthenticated: false });
      },
      onError: () => {
        toaster.create({
          title: "Logout failed",
          type: "error",
          duration: 3000,
        });
      },
    });
  },
}));

export default useStore;
