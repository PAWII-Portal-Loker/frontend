import { CommonStoreState } from "@/common/types/commonStoreState";
import { defaultUserEntity, UserEntity } from "../(auth)/type";

export interface CompanyRequestEntity {
  company_type: string;
  company_name: string;
  founding_date: Date;
  employee_total: number;
  early_working_hour: string;
  end_working_hour: string;
}

export interface CompanyEntity extends CompanyRequestEntity {
  id: string;
  user: UserEntity;
  created_at: Date;
  updated_at: Date;
}

export const defaultCompanyEntity: CompanyEntity = {
  id: "",
  user: defaultUserEntity,
  company_type: "",
  company_name: "",
  founding_date: new Date(),
  employee_total: 0,
  early_working_hour: "",
  end_working_hour: "",
  created_at: new Date(),
  updated_at: new Date(),
};

export interface CompanyStoreState extends CommonStoreState<CompanyEntity> {
  singleData: CompanyEntity;

  setSingleData: (data: CompanyEntity) => void;
  fetchSingleData: (id: string) => void;
  createData: (data: CompanyRequestEntity) => void;
  updateData: (data: CompanyRequestEntity) => void;
}
