import { CommonStoreState } from "@/common/types/commonStoreState";
import { defaultUserDto, UserDto } from "../(auth)/type";

export interface JobSeekerRequestDto {
  name: string;
  last_education: string;
  major: string;
  gpa: number;
}

export interface JobSeekerDto extends JobSeekerRequestDto {
  id: string;
  user: UserDto;
  created_at: Date;
  updated_at: Date;
}

export const defaultJobSeekerDto: JobSeekerDto = {
  id: "",
  user: defaultUserDto,
  name: "",
  last_education: "",
  major: "",
  gpa: 0,
  created_at: new Date(),
  updated_at: new Date(),
};

export interface JobSeekerStoreState extends CommonStoreState<JobSeekerDto> {
  singleData: JobSeekerDto;

  setSingleData: (data: JobSeekerDto) => void;
  fetchSingleData: (id: string) => void;
  createData: (data: JobSeekerRequestDto) => void;
  updateData: (data: JobSeekerRequestDto) => void;
}
