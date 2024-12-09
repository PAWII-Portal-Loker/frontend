import {
  CommonActions,
  CommonState,
  initialCommonState,
} from "@/common/types/commonStateAction";
import {
  CompanyEntity,
  CompanyRequestEntity,
  defaultCompanyEntity,
} from "./type";
import { create } from "zustand";
import { createData, fetchData, fetchSingleData, updateData } from "./reducer";

interface CompanyState extends CommonState<CompanyEntity> {
  singleData: CompanyEntity;
}
interface CompanyActions extends CommonActions<CompanyEntity> {
  setSingleData: (data: CompanyEntity) => void;
  fetchSingleData: (id: string) => void;
  createData: (data: CompanyRequestEntity) => void;
  updateData: (data: CompanyRequestEntity) => void;
}

const initialCompanyState: CompanyState = {
  ...initialCommonState,
  singleData: defaultCompanyEntity,
};

export const useCompanyStore = create<CompanyState & CompanyActions>((set) => ({
  ...initialCompanyState,

  setData: (data) => set({ data }),
  setSingleData: (singleData) => set({ singleData }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => fetchData(),
  fetchSingleData: (id) => fetchSingleData(id),
  createData: (request) => createData(request),
  updateData: (request) => updateData(request),
}));
