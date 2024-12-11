import { JobSeekerDto } from ".";

export interface UpdateJobSeekerDto {
  name: JobSeekerDto["name"];
  last_education: JobSeekerDto["last_education"];
  major: JobSeekerDto["major"];
  gpa: JobSeekerDto["gpa"];
}
