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

export type CreateUserDto = {
  wa_number: string;
  email: string;
  password: string;
};

export interface UserStoreState {
  users: UserDto[];
  isUsersLoading: boolean;
  user: UserDto;
  isUserLoading: boolean;

  setUsers: (users: UserDto[]) => void;
  setIsUsersLoading: (isUsersLoading: boolean) => void;
  setUser: (user: UserDto) => void;
  setIsUserLoading: (isUserLoading: boolean) => void;
  getUsers: () => void;
  getUser: (id: string) => void;
  createUser: (request: CreateUserDto) => void;
}
