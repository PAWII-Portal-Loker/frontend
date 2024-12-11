import { JobSeekerDto } from ".";

export interface CreateJobSeekerDto {
  name: JobSeekerDto["name"];
  last_education: JobSeekerDto["last_education"];
  major: JobSeekerDto["major"];
  gpa: JobSeekerDto["gpa"];
}
