import { CommonStoreState } from "@/common/types/commonStoreState";

export interface ConstEntity {
  company_types: string[];
  income_types: string[];
  job_types: string[];
  roles: string[];
}

export const defaultConstEntity: ConstEntity = {
  company_types: [],
  income_types: [],
  job_types: [],
  roles: [],
};

export type IncomeTypeStoreState = CommonStoreState<string>;
export type CompanyTypeStoreState = CommonStoreState<string>;
export type JobTypeStoreState = CommonStoreState<string>;
export type RoleStoreState = CommonStoreState<string>;
export type LastEducationTypeStoreState = CommonStoreState<string>;

export type ConstStoreState = {
  data: ConstEntity;
  isLoading: boolean;

  setData: (data: ConstEntity) => void;
  setIsLoading: (loading: boolean) => void;
  fetchData: () => void;
};
