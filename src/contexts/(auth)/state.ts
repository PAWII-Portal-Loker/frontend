import { create } from "zustand";
import { defaultAuthState, SignInRequest, SignUpRequest } from "./type";
import { checkLogin, signIn, signOut, signUp } from "./reducer";

export interface AuthState {
  isAuthenticated: boolean;
  role: "JOB_SEEKER" | "COMPANY" | null;
  isLoading: boolean;
}

interface AuthActions {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRole: (role: "JOB_SEEKER" | "COMPANY" | null) => void;
  setIsLoading: (isLoading: boolean) => void;

  signIn: (request: SignInRequest) => void;
  signUp: (request: SignUpRequest) => void;
  checkLogin: () => void;
  signOut: () => void;
}

type StoreState = AuthState & AuthActions;
const useAuthStore = create<StoreState>((set) => ({
  ...defaultAuthState,

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setRole: (role) => set({ role }),
  setIsLoading: (isLoading) => set({ isLoading }),

  signIn: (request) => signIn(request),
  signUp: (request) => signUp(request),
  checkLogin: () => checkLogin(),
  signOut: () => signOut(),
}));

export default useAuthStore;
