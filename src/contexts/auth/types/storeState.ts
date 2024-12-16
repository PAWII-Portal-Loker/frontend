import { AuthDto } from ".";
import { SignInDto } from "./signIn";

export interface AuthStoreState {
  isLogin: boolean;
  auth: AuthDto;
  isAuthLoading: boolean;

  setIsLogin: (isLogin: boolean) => void;
  setAuth: (auth: AuthDto) => void;
  setAuthLoading: (isAuthLoading: boolean) => void;

  signIn: (request: SignInDto) => void;
  checkLogin: () => void;
  signOut: () => void;
}
