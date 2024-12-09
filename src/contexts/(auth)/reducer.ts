import AuthService from "./service";
import useAuthStore from "./state";
import { toaster } from "@/components/ui/toaster";
import useMainStore from "@/hooks/main/reducer";
import useRoleDialogStore from "@/hooks/(roleDialog)/reducer";
import { SignInRequest, SignUpRequest } from "./type";

const authService = new AuthService();

export const signIn = (request: SignInRequest) => {
  const { setIsLoading, setIsAuthenticated, checkLogin } =
    useAuthStore.getState();
  const { setIsLoginDialogOpen } = useMainStore.getState();
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
        setIsAuthenticated(true);
        setIsLoginDialogOpen(false);
        checkLogin();
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
        setIsLoading(false);
      },
    },
  );
};

export const signUp = (request: SignUpRequest) => {
  const { setIsLoading } = useAuthStore.getState();
  const { setIsRegisterDialogOpen, setIsLoginDialogOpen } =
    useMainStore.getState();
  const { email, wa_number, password } = request;
  setIsLoading(true);

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
        setIsLoading(false);
      },
    },
  );
};

export const checkLogin = () => {
  const { setIsAuthenticated, setRole } = useAuthStore.getState();
  authService.isLogin({
    onSuccess: (data) => {
      setIsAuthenticated(data.is_login);
      setRole(data.role);
      useRoleDialogStore.getState().setSelectedRole(data.role);

      if (
        useAuthStore.getState().isAuthenticated &&
        !useAuthStore.getState().role
      ) {
        useRoleDialogStore.getState().setIsRoleDialogOpen(true);
      }

      if (!useAuthStore.getState().isAuthenticated) {
        useRoleDialogStore.getState().setIsRoleDialogOpen(false);
        useMainStore.getState().setIsLoginDialogOpen(true);
      }
    },
    onError: () => {
      setIsAuthenticated(false);
      setRole(null);
    },
  });
};

export const signOut = () => {
  const { setIsAuthenticated, setRole } = useAuthStore.getState();
  authService.signOut({
    onSuccess: () => {
      toaster.create({
        title: "Logout successful",
        type: "success",
        duration: 3000,
      });
      setIsAuthenticated(false);
      setRole(null);
    },
    onError: () => {
      toaster.create({
        title: "Logout failed",
        type: "error",
        duration: 3000,
      });
    },
  });
};
