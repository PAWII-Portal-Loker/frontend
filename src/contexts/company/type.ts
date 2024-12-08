import { UserEntity } from "../(auth)/type";

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
