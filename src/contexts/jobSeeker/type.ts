import { UserEntity } from "../(auth)/type";

export interface JobSeekerRequestEntity {
  name: string;
  last_education: string;
  major: string;
  gpa: number;
}

export interface JobSeekerEntity extends JobSeekerRequestEntity {
  id: string;
  user: UserEntity;
  created_at: Date;
  updated_at: Date;
}
