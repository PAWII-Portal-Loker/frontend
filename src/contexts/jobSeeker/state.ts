import { CommonActions, CommonState } from "@/common/types/commonStateAction";
import { JobSeekerEntity, JobSeekerRequestEntity } from "./type";

export interface JobSeekerState extends CommonState<JobSeekerEntity> {
  singleData: JobSeekerEntity;
}
export interface JobSeekerActions extends CommonActions<JobSeekerEntity> {
  setSingleData: (data: JobSeekerEntity) => void;
  fetchSingleData: (id: string) => void;
  createData: (data: JobSeekerRequestEntity) => void;
  updateData: (data: JobSeekerRequestEntity) => void;
}
