export interface AuthState {
  isAuthenticated: boolean;
  role: "JOB_SEEKER" | "COMPANY" | null;
  isLoading: boolean;
}

export interface AuthActions {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRole: (role: "JOB_SEEKER" | "COMPANY") => void;
  setIsLoading: (isLoading: boolean) => void;

  signIn: (email: string, password: string) => void;
  signUp: (email: string, waNumber: string, password: string) => void;
  checkLogin: () => void;
  signOut: () => void;
}
