import { CommonStoreState } from "@/common/types/commonStoreState";
import { defaultUserEntity, UserEntity } from "../(auth)/type";

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

export const defaultJobSeekerEntity: JobSeekerEntity = {
  id: "",
  user: defaultUserEntity,
  name: "",
  last_education: "",
  major: "",
  gpa: 0,
  created_at: new Date(),
  updated_at: new Date(),
};

export interface JobSeekerStoreState extends CommonStoreState<JobSeekerEntity> {
  singleData: JobSeekerEntity;

  setSingleData: (data: JobSeekerEntity) => void;
  fetchSingleData: (id: string) => void;
  createData: (data: JobSeekerRequestEntity) => void;
  updateData: (data: JobSeekerRequestEntity) => void;
}
