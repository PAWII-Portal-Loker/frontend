import { CommonActions, CommonState } from "@/common/types/commonStateAction";
import { ConstEntity } from "./type";

export type IncomeTypeState = CommonState;
export type IncomeTypeActions = CommonActions;
export type CompanyTypeActions = CommonActions;
export type CompanyTypeState = CommonState;
export type JobTypeActions = CommonActions;
export type JobTypeState = CommonState;
export type RoleState = CommonState;
export type RoleActions = CommonActions;

export interface ConstState {
  consts: ConstEntity;
  isConstsLoading: boolean;
}

export interface ConstActions {
  setConsts: (consts: ConstEntity) => void;
  setIsConstsLoading: (loading: boolean) => void;
  fetchConsts: () => void;
}
