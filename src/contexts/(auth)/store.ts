import { create } from "zustand";
import { AuthStoreState } from "./type";
import AuthService from "./service";
import useMainStore from "@/hooks/main/store";
import { toaster } from "@/components/ui/toaster";
import useRoleDialogStore from "@/hooks/roleDialog/store";

const authService = new AuthService();

const { setIsLoginDialogOpen } = useMainStore.getState();
const { setSelectedRole, setIsRoleDialogOpen } = useRoleDialogStore.getState();

const useAuthStore = create<AuthStoreState>((set, get) => ({
  isLogin: false,
  role: null,
  isLoading: false,

  setIsLogin: (isLogin) => set({ isLogin }),
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
          get().setIsLogin(true);
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

  checkLogin: () => {
    authService.isLogin({
      onSuccess: (data) => {
        get().setIsLogin(data.is_login);
        get().setRole(data.role);
        setSelectedRole(data.role);

        if (get().isLogin && !get().role) {
          setIsRoleDialogOpen(true);
        }

        if (!useAuthStore.getState().isLogin) {
          setIsRoleDialogOpen(false);
          setIsLoginDialogOpen(true);
        }
      },
      onError: () => {
        get().setIsLogin(false);
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
        get().setIsLogin(false);
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
