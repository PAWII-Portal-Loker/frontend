import {
  CommonActions,
  CommonState,
  initialCommonState,
} from "@/common/types/commonStateAction";
import {
  defaultJobSeekerEntity,
  JobSeekerEntity,
  JobSeekerRequestEntity,
} from "./type";
import { create } from "zustand";
import { createData, fetchData, fetchSingleData, updateData } from "./reducer";

interface JobSeekerState extends CommonState<JobSeekerEntity> {
  singleData: JobSeekerEntity;
}
interface JobSeekerActions extends CommonActions<JobSeekerEntity> {
  setSingleData: (data: JobSeekerEntity) => void;
  fetchSingleData: (id: string) => void;
  createData: (data: JobSeekerRequestEntity) => void;
  updateData: (data: JobSeekerRequestEntity) => void;
}

export const initialJobSeekerState: JobSeekerState = {
  ...initialCommonState,
  singleData: defaultJobSeekerEntity,
};

type JobSeekerStoreState = JobSeekerState & JobSeekerActions;
export const useJobSeekerStore = create<JobSeekerStoreState>((set) => ({
  ...initialJobSeekerState,

  setData: (data) => set({ data }),
  setSingleData: (singleData) => set({ singleData }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => fetchData(),
  fetchSingleData: (id) => fetchSingleData(id),
  createData: (request) => createData(request),
  updateData: (request) => updateData(request),
}));
