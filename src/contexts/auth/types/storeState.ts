import { AuthDto } from ".";
import { SignInDto } from "./signIn";

export interface AuthStoreState {
  isLogin: boolean;
  auth: AuthDto;
  isLoading: boolean;

  setIsLogin: (isLogin: boolean) => void;
  setAuth: (auth: AuthDto) => void;
  setIsLoading: (isLoading: boolean) => void;

  signIn: (request: SignInDto) => void;
  checkLogin: () => void;
  signOut: () => void;
}
