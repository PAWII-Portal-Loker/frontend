export interface UserEntity {
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

export const defaultUserEntity: UserEntity = {
  id: "",
  role: "",
  email: "",
  wa_number: "",
  image_url: "",
  bio: "",
  country: "",
  province: "",
  city: "",
  subdistrict: "",
  address: "",
  created_at: new Date(),
  updated_at: new Date(),
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = SignInRequest & {
  wa_number: string;
};

export type IsLoginResponse = {
  is_login: boolean;
  role: "JOB_SEEKER" | "COMPANY";
};
