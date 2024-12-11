import { UserDto } from "@/contexts/user/types";

export interface JobSeekerDto {
  id: string;
  user: UserDto;
  name: string;
  last_education: string;
  major: string;
  gpa: number;
  created_at: Date;
  updated_at: Date;
}
