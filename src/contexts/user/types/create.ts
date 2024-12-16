import { UserDto } from ".";

export type CreateUserDto = {
  wa_number: UserDto["wa_number"];
  email: UserDto["email"];
  password: string;
};
