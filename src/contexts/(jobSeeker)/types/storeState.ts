import { JobSeekerDto } from ".";
import { CreateJobSeekerDto } from "./create";
import { UpdateJobSeekerDto } from "./update";

export interface JobSeekerStoreState {
  jobSeekers: JobSeekerDto[];
  isJobSeekersLoading: boolean;
  jobSeeker: JobSeekerDto;
  isJobSeekerLoading: boolean;

  setJobSeekers: (jobSeekers: JobSeekerDto[]) => void;
  setJobSeekersLoading: (isJobSeekersLoading: boolean) => void;
  setJobSeeker: (jobSeeker: JobSeekerDto) => void;
  setJobSeekerLoading: (isJobSeekerLoading: boolean) => void;
  getJobSeekers: () => void;
  getJobSeeker: (id: string) => void;
  createJobSeeker: (request: CreateJobSeekerDto) => void;
  updateJobSeeker: (request: UpdateJobSeekerDto) => void;
}
