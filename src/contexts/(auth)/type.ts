export interface UserDto {
  id: string;
  role: string;
  email: string;
  wa_number: string;
  image_url: string;
  bio: string;
  country: string;
  province: string;
  city: string;
  subdistrict: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}

export type SignInDto = {
  email: string;
  password: string;
};

export type SignUpDto = {
  wa_number: string;
  email: string;
  password: string;
};

export type IsLoginDto = {
  is_login: boolean;
  role: "JOB_SEEKER" | "COMPANY";
};

export interface AuthStoreState {
  isLogin: boolean;
  role: "JOB_SEEKER" | "COMPANY" | null;
  isLoading: boolean;

  setIsLogin: (isLogin: boolean) => void;
  setRole: (role: "JOB_SEEKER" | "COMPANY" | null) => void;
  setIsLoading: (isLoading: boolean) => void;

  signIn: (request: SignInDto) => void;
  signUp: (request: SignUpDto) => void;
  checkLogin: () => void;
  signOut: () => void;
}
