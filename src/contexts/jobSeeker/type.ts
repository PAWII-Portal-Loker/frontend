import { CommonStoreState } from "@/common/types/commonStoreState";
import { UserDto } from "../(auth)/type";

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
export interface JobSeekerCreateDto {
  name: JobSeekerDto["name"];
  last_education: JobSeekerDto["last_education"];
  major: JobSeekerDto["major"];
  gpa: JobSeekerDto["gpa"];
}

export interface JobSeekerUpdateDto {
  name: JobSeekerDto["name"];
  last_education: JobSeekerDto["last_education"];
  major: JobSeekerDto["major"];
  gpa: JobSeekerDto["gpa"];
}

export interface JobSeekerStoreState extends CommonStoreState<JobSeekerDto> {
  singleData: JobSeekerDto;

  setSingleData: (data: JobSeekerDto) => void;
  fetchSingleData: (id: string) => void;
  createData: (data: JobSeekerCreateDto) => void;
  updateData: (data: JobSeekerUpdateDto) => void;
}
