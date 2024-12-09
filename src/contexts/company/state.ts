import { CommonActions, CommonState } from "@/common/types/commonStateAction";
import { CompanyEntity, CompanyRequestEntity } from "./type";

export interface CompanyState extends CommonState<CompanyEntity> {
  singleData: CompanyEntity;
}
export interface CompanyActions extends CommonActions<CompanyEntity> {
  setSingleData: (data: CompanyEntity) => void;
  fetchSingleData: (id: string) => void;
  createData: (data: CompanyRequestEntity) => void;
  updateData: (data: CompanyRequestEntity) => void;
}
