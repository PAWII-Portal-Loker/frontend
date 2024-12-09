import { create } from "zustand";
import { AuthStoreState } from "./type";
import AuthService from "./service";
import useMainStore from "@/hooks/main/store";
import { toaster } from "@/components/ui/toaster";
import useRoleDialogStore from "@/hooks/roleDialog/store";

const authService = new AuthService();

const { setIsLoginDialogOpen, setIsRegisterDialogOpen } =
  useMainStore.getState();
const { setSelectedRole, setIsRoleDialogOpen } = useRoleDialogStore.getState();

const useAuthStore = create<AuthStoreState>((set, get) => ({
  isAuthenticated: false,
  role: null,
  isLoading: false,

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setRole: (role) => set({ role }),
  setIsLoading: (isLoading) => set({ isLoading }),

  signIn: (request) => {
    const { email, password } = request;

    authService.signIn(
      { email, password },
      {
        onSuccess: () => {
          toaster.create({
            title: "Login successful",
            type: "success",
            duration: 3000,
          });
          get().setIsAuthenticated(true);
          setIsLoginDialogOpen(false);
          get().checkLogin();
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
          get().setIsLoading(false);
        },
      },
    );
  },

  signUp: (request) => {
    const { email, wa_number, password } = request;
    get().setIsLoading(true);

    authService.signUp(
      { email, password, wa_number },
      {
        onSuccess: () => {
          toaster.create({
            title: "Registration successful",
            type: "success",
            duration: 3000,
          });
          setIsRegisterDialogOpen(false);
          setIsLoginDialogOpen(true);
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
          get().setIsLoading(false);
        },
      },
    );
  },

  checkLogin: () => {
    authService.isLogin({
      onSuccess: (data) => {
        get().setIsAuthenticated(data.is_login);
        get().setRole(data.role);
        setSelectedRole(data.role);

        if (get().isAuthenticated && !get().role) {
          setIsRoleDialogOpen(true);
        }

        if (!useAuthStore.getState().isAuthenticated) {
          setIsRoleDialogOpen(false);
          setIsLoginDialogOpen(true);
        }
      },
      onError: () => {
        get().setIsAuthenticated(false);
        get().setRole(null);
      },
    });
  },

  signOut: () => {
    authService.signOut({
      onSuccess: () => {
        toaster.create({
          title: "Logout successful",
          type: "success",
          duration: 3000,
        });
        get().setIsAuthenticated(false);
        get().setRole(null);
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
