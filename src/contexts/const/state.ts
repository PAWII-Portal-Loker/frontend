import { CommonActions, CommonState } from "@/common/types/commonStateAction";
import { ConstEntity } from "./type";

export type IncomeTypeState = CommonState<string>;
export type IncomeTypeActions = CommonActions<string>;
export type CompanyTypeActions = CommonActions<string>;
export type CompanyTypeState = CommonState<string>;
export type JobTypeActions = CommonActions<string>;
export type JobTypeState = CommonState<string>;
export type RoleState = CommonState<string>;
export type RoleActions = CommonActions<string>;

export interface ConstState {
  consts: ConstEntity;
  isConstsLoading: boolean;
}

export interface ConstActions {
  setConsts: (consts: ConstEntity) => void;
  setIsConstsLoading: (loading: boolean) => void;
  fetchConsts: () => void;
}
