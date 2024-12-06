import { ConstEntity } from "./type";

interface CommonConstState {
  data: string[];
  isLoading: boolean;
}

interface CommonConstActions {
  setData: (data: string[]) => void;
  setIsLoading: (loading: boolean) => void;
  fetchData: () => void;
}

export type IncomeTypeState = CommonConstState;
export type IncomeTypeActions = CommonConstActions;
export type CompanyTypeActions = CommonConstActions;
export type CompanyTypeState = CommonConstState;
export type JobTypeActions = CommonConstActions;
export type JobTypeState = CommonConstState;
export type RoleState = CommonConstState;
export type RoleActions = CommonConstActions;

export interface ConstState {
  consts: ConstEntity;
  isConstsLoading: boolean;
}

export interface ConstActions {
  setConsts: (consts: ConstEntity) => void;
  setIsConstsLoading: (loading: boolean) => void;
  fetchConsts: () => void;
}
