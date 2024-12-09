import { UserDto } from "./type";

export const DefaultUserDto: UserDto = {
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
