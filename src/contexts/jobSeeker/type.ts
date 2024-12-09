import { CommonStoreState } from "@/common/types/commonStoreState";
import { defaultUserDto, UserDto } from "../(auth)/type";

export interface JobSeekerReqDto {
  name: string;
  last_education: string;
  major: string;
  gpa: number;
}

export interface JobSeekerDto extends JobSeekerReqDto {
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
  createData: (data: JobSeekerReqDto) => void;
  updateData: (data: JobSeekerReqDto) => void;
}
