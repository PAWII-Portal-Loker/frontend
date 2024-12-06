import { UserEntity } from "./type";

export interface AuthState {
  user: UserEntity | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setUser: (user: UserEntity) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;

  signIn: (
    email: string,
    password: string,
    router: { push: (path: string) => void },
  ) => void;
  signUp: (
    email: string,
    waNumber: string,
    password: string,
    router: { push: (path: string) => void },
  ) => void;
  checkLogin: () => void;
  signOut: () => void;
}
