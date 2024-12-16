import { UserDto } from ".";
import { CreateUserDto } from "./create";

export interface UserStoreState {
  users: UserDto[];
  isUsersLoading: boolean;
  user: UserDto;
  isUserLoading: boolean;

  setUsers: (users: UserDto[]) => void;
  setUsersLoading: (isUsersLoading: boolean) => void;
  setUser: (user: UserDto) => void;
  setUserLoading: (isUserLoading: boolean) => void;
  getUsers: () => void;
  getUser: (id: string) => void;
  createUser: (request: CreateUserDto) => void;
}
