import { create } from "zustand";
import AuthService from "./service";
import { AuthStoreState } from "./types/storeState";
import { AuthDto } from "./types";
import useMainStore from "@hooks/main/store";
import useRoleDialogStore from "@hooks/roleDialog/store";
import { toaster } from "@components/ui/toaster";

const DefaultAuthDto: AuthDto = {
  id: null,
  role: null,
};

const authService = new AuthService();

const { setIsLoginDialogOpen } = useMainStore.getState();
const { setIsRoleDialogOpen } = useRoleDialogStore.getState();

const useAuthStore = create<AuthStoreState>((set, get) => ({
  isLogin: false,
  auth: DefaultAuthDto,
  isLoading: false,

  setIsLogin: (isLogin) => set({ isLogin }),
  setAuth: (auth) => set({ auth }),
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
    authService.checkLogin({
      onSuccess: (data) => {
        get().setIsLogin(data.is_login);
        get().setAuth({
          id: localStorage.getItem("user_id"),
          role: data.role,
        });

        if (get().isLogin && !get().auth.role) {
          setIsRoleDialogOpen(true);
        }

        if (!useAuthStore.getState().isLogin) {
          setIsRoleDialogOpen(false);
          setIsLoginDialogOpen(true);
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
