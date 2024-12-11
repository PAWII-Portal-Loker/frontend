import { SignInDto } from "./signIn";

export interface AuthStoreState {
  isLogin: boolean;
  role: "JOB_SEEKER" | "COMPANY" | null;
  isLoading: boolean;

  setIsLogin: (isLogin: boolean) => void;
  setRole: (role: "JOB_SEEKER" | "COMPANY" | null) => void;
  setIsLoading: (isLoading: boolean) => void;

  signIn: (request: SignInDto) => void;
  checkLogin: () => void;
  signOut: () => void;
}
