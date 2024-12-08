import AuthService from "./service";
import { AuthActions, AuthState } from "./state";
import { create } from "zustand";
import { toaster } from "@/components/ui/toaster";
import useMainStore from "@/hooks/main/reducer";
import useRoleDialogStore from "@/hooks/(roleDialog)/reducer";

const authService = new AuthService();

type StoreState = AuthState & AuthActions;
const useAuthStore = create<StoreState>((set) => ({
  isAuthenticated: false,
  role: null,
  isLoading: false,

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setRole: (role) => set({ role }),
  setIsLoading: (isLoading) => set({ isLoading }),

  signIn: async (email, password) => {
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
          set({ isAuthenticated: true });
          useMainStore.getState().setIsLoginDialogOpen(false);
          useAuthStore.getState().checkLogin();
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

  signUp: async (email, wa_number, password) => {
    set({ isLoading: true });

    authService.signUp(
      { email, password, wa_number },
      {
        onSuccess: () => {
          toaster.create({
            title: "Registration successful",
            type: "success",
            duration: 3000,
          });
          useMainStore.getState().setIsRegisterDialogOpen(false);
          useMainStore.getState().setIsLoginDialogOpen(true);
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
      onSuccess: (data) => {
        set({ isAuthenticated: data.is_login });
        set({ role: data.role });
        useRoleDialogStore.getState().setSelectedRole(data.role);

        if (
          useAuthStore.getState().isAuthenticated &&
          !useAuthStore.getState().role
        ) {
          useRoleDialogStore.getState().setIsRoleDialogOpen(true);
        }
      },
      onError: () => {
        set({ isAuthenticated: false });
        set({ role: null });
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
        set({ isAuthenticated: false });
        set({ role: null });
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

export default useAuthStore;
