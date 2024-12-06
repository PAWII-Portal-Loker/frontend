export interface UserEntity {
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

export interface JobSeekerEntity {
  id: string;
  user: UserEntity;
  name: string;
  lastEducation: string;
  major: string;
  gpa: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyEntity {
  id: string;
  user: UserEntity;
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
