import {
  CommonActions,
  CommonState,
  initialCommonState,
} from "@/common/types/commonStateAction";
import { ConstEntity, defaultConstEntity } from "./type";
import { create } from "zustand";
import {
  fetchCompanyTypesData,
  fetchConsts,
  fetchIncomeTypesData,
  fetchJobTypesData,
  fetchRolesData,
} from "./reducer";

type IncomeTypeState = CommonState<string>;
type IncomeTypeActions = CommonActions<string>;
type CompanyTypeActions = CommonActions<string>;
type CompanyTypeState = CommonState<string>;
type JobTypeActions = CommonActions<string>;
type JobTypeState = CommonState<string>;
type RoleState = CommonState<string>;
type RoleActions = CommonActions<string>;

type ConstState = {
  consts: ConstEntity;
  isConstsLoading: boolean;
};

type ConstActions = {
  setConsts: (consts: ConstEntity) => void;
  setIsConstsLoading: (loading: boolean) => void;
  fetchConsts: () => void;
};

const initialConstState: ConstState = {
  consts: defaultConstEntity,
  isConstsLoading: false,
};

export const useConstStore = create<ConstState & ConstActions>((set) => ({
  ...initialConstState,

  setConsts: (consts) => set({ consts }),
  setIsConstsLoading: (isConstsLoading) => set({ isConstsLoading }),
  fetchConsts: () => fetchConsts(),
}));

export const useCompanyTypeStore = create<
  CompanyTypeState & CompanyTypeActions
>((set) => ({
  ...initialCommonState,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => fetchCompanyTypesData(),
}));

export const useIncomeTypeStore = create<IncomeTypeState & IncomeTypeActions>(
  (set) => ({
    ...initialCommonState,

    setData: (data) => set({ data }),
    setIsLoading: (isLoading) => set({ isLoading }),

    fetchData: () => fetchIncomeTypesData(),
  }),
);

export const useJobTypeStore = create<JobTypeState & JobTypeActions>((set) => ({
  ...initialCommonState,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => fetchJobTypesData(),
}));

export const useRoleStore = create<RoleState & RoleActions>((set) => ({
  ...initialCommonState,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => fetchRolesData(),
}));
