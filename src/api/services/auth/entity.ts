export interface UserResponse {
  id: string;
  role: string;
  email: string;
  waNumber: string;
  imageUrl: string;
  bio: string;
  country: string;
  province: string;
  city: string;
  subdistrict: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobSeekerResponse {
  id: string;
  user: UserResponse;
  name: string;
  lastEducation: string;
  major: string;
  gpa: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyResponse {
  id: string;
  user: UserResponse;
  companyType: string;
  companyName: string;
  foundingDate: Date;
  employeeTotal: number;
  earlyWorkingHour: string;
  endWorkingHour: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = SignInRequest & {
  waNumber: string;
};

export type IsLoginRequest = {
  user_id: string;
};
