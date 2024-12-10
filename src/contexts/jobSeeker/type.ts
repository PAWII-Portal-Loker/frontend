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

export interface JobSeekerStoreState {
  jobSeekers: JobSeekerDto[];
  isJobSeekersLoading: boolean;
  jobSeeker: JobSeekerDto;
  isJobSeekerLoading: boolean;

  setJobSeekers: (jobSeekers: JobSeekerDto[]) => void;
  setIsJobSeekersLoading: (isJobSeekersLoading: boolean) => void;
  setJobSeeker: (jobSeeker: JobSeekerDto) => void;
  setIsJobSeekerLoading: (isJobSeekerLoading: boolean) => void;
  getJobSeekers: () => void;
  getJobSeeker: (id: string) => void;
  createJobSeeker: (request: JobSeekerCreateDto) => void;
  updateJobSeeker: (request: JobSeekerUpdateDto) => void;
}
