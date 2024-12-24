import { create } from "zustand";
import AuthService from "./service";
import { AuthStoreState } from "./types/storeState";
import { AuthDto } from "./types";
import useMainStore from "@hooks/main/store";
import useRoleDialogStore from "@hooks/roleDialog/store";
import { toaster } from "src/common/ui/toaster";

const DefaultAuthDto: AuthDto = {
  id: null,
  role: null,
};

const authService = new AuthService();

const { setLoginDialogOpen } = useMainStore.getState();
const { setRoleDialogOpen } = useRoleDialogStore.getState();

const useAuthStore = create<AuthStoreState>((set, get) => ({
  isLogin: false,
  auth: DefaultAuthDto,
  isAuthLoading: false,

  setIsLogin: (isLogin) => set({ isLogin }),
  setAuth: (auth) => set({ auth }),
  setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),

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
          setLoginDialogOpen(false);
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
          get().setAuthLoading(false);
        },
      }
    );
  },

  checkLogin: () => {
    authService.checkLogin({
      onSuccess: (data) => {
        get().setIsLogin(data.is_login);
        get().setAuth({
          id: localStorage.getItem("user_id"),
          role: data.role,
        });

        if (get().isLogin && !get().auth.role) {
          setRoleDialogOpen(true);
        }

        if (!useAuthStore.getState().isLogin) {
          setRoleDialogOpen(false);
          setLoginDialogOpen(true);
          get().setAuth(DefaultAuthDto);
        }
      },
      onError: () => {
        get().setIsLogin(false);
        get().setAuth(DefaultAuthDto);
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
        get().setAuth(DefaultAuthDto);
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
